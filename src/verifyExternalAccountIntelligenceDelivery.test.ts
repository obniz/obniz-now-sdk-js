import { createHash } from "node:crypto";
import { inspect } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { verifyExternalAccountIntelligenceDelivery } from "./verifyExternalAccountIntelligenceDelivery";

const RUN_ID = "11111111-1111-4111-8111-111111111111";
const INTELLIGENCE_ID = "22222222-2222-4222-8222-222222222222";
const CREDENTIAL = `nowir_v1_${RUN_ID}_${"A".repeat(43)}`;
const AUTHORIZATION = `Bearer ${CREDENTIAL}`;

function bytes(): Buffer {
  return Buffer.from(
    JSON.stringify({
      run_id: RUN_ID,
      intelligence: { id: INTELLIGENCE_ID, name: "daily_report" },
      account_id: "account-1",
      trigger: { type: "cron" },
      config: {},
    }),
  );
}

function context(overrides: Record<string, unknown> = {}) {
  return {
    verified: true,
    runId: RUN_ID,
    accountId: "account-1",
    intelligenceId: INTELLIGENCE_ID,
    intelligenceName: "daily_report",
    leaseExpiresAt: "2026-07-23T01:02:34.123456Z",
    ...overrides,
  };
}

function response(value: unknown, ok = true): Response {
  return { ok, json: vi.fn(async () => value) } as unknown as Response;
}

describe("verifyExternalAccountIntelligenceDelivery", () => {
  it("hashes the exact ordered bytes and verifies every returned identity field", async () => {
    const body = bytes();
    const fetchApi = vi.fn(async () => response(context()));
    async function* chunks() {
      yield body.subarray(0, 17);
      yield body.subarray(17);
    }
    await expect(
      verifyExternalAccountIntelligenceDelivery({
        authorization: AUTHORIZATION,
        rawBody: chunks(),
        baseUrl: "https://api.example/root",
        fetch: fetchApi as typeof fetch,
      }),
    ).resolves.toEqual(context());
    expect(fetchApi).toHaveBeenCalledOnce();
    expect(fetchApi.mock.calls[0][0]).toBe(
      "https://api.example/api/1/account-intelligence/runs/verify-external-delivery",
    );
    const init = fetchApi.mock.calls[0][1] as RequestInit;
    expect(new Headers(init.headers).get("Authorization")).toBe(AUTHORIZATION);
    expect(JSON.parse(String(init.body))).toEqual({
      runId: RUN_ID,
      payloadHash: `sha256:jcs-v1:${createHash("sha256").update(body).digest("hex")}`,
    });
  });

  it.each([null, "", `bearer ${CREDENTIAL}`, `Bearer  ${CREDENTIAL}`, "Bearer ordinary-token"])(
    "rejects malformed or non-run authorization before fetch: %j",
    async (authorization) => {
      const fetchApi = vi.fn();
      await expect(
        verifyExternalAccountIntelligenceDelivery({
          authorization,
          rawBody: bytes(),
          baseUrl: "https://api.example",
          fetch: fetchApi as typeof fetch,
        }),
      ).rejects.toThrow("External Account Intelligence delivery verification failed");
      expect(fetchApi).not.toHaveBeenCalled();
    },
  );

  it("fails closed for a response identity mismatch", async () => {
    await expect(
      verifyExternalAccountIntelligenceDelivery({
        authorization: AUTHORIZATION,
        rawBody: bytes(),
        baseUrl: "https://api.example",
        fetch: vi.fn(async () => response(context({ accountId: "another-account" }))) as typeof fetch,
      }),
    ).rejects.toThrow("External Account Intelligence delivery verification failed");
  });

  it("rejects more than 1 MiB of raw body before fetch", async () => {
    const fetchApi = vi.fn();
    await expect(
      verifyExternalAccountIntelligenceDelivery({
        authorization: AUTHORIZATION,
        rawBody: Buffer.alloc(1024 * 1024 + 1),
        baseUrl: "https://api.example",
        fetch: fetchApi as typeof fetch,
      }),
    ).rejects.toThrow("External Account Intelligence delivery verification failed");
    expect(fetchApi).not.toHaveBeenCalled();
  });

  it("collapses network and body-bearing failures to one cause-free secret-free error", async () => {
    const sentinel = `${CREDENTIAL}:raw-body-sentinel`;
    let thrown: unknown;
    try {
      await verifyExternalAccountIntelligenceDelivery({
        authorization: AUTHORIZATION,
        rawBody: bytes(),
        baseUrl: "https://api.example",
        fetch: vi.fn(async () => Promise.reject(new Error(sentinel))) as typeof fetch,
      });
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).cause).toBeUndefined();
    expect(inspect(thrown)).not.toContain(CREDENTIAL);
    expect(inspect(thrown)).not.toContain(sentinel);
  });
});
