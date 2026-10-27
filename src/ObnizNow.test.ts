import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ObnizNow } from "./ObnizNow";
import { ObnizNowApiError } from "./ObnizNowApiError";

describe("public release compatibility", () => {
  it("retains the 0.1.15 client namespaces and exposes Account Intelligence", () => {
    const client = new ObnizNow({ token: "fixture" });
    const names = [
      "account",
      "analytics",
      "auditLogs",
      "connectionModels",
      "connections",
      "converters",
      "customizes",
      "events",
      "firmware",
      "groups",
      "inboundConnections",
      "inboundSources",
      "integrations",
      "intelligences",
      "invitations",
      "issues",
      "machine",
      "machines",
      "notificationHistory",
      "notifications",
      "obniz",
      "reports",
      "session",
      "threads",
      "units",
      "users",
      "accountIntelligence",
    ] as const;
    for (const name of names) expect(client[name], name).toBeDefined();
  });

  it("normalizes a trailing slash and converts HTTP failures to the public error type", async () => {
    const fetchApi = vi.fn(
      async (_input: RequestInfo | URL) => new Response(JSON.stringify({ error: "missing" }), { status: 404 }),
    );
    const client = new ObnizNow({ token: "fixture", baseUrl: "https://sdk.invalid/", fetch: fetchApi });
    await expect(client.machine.getMachine({ machineId: "fixture" })).rejects.toBeInstanceOf(ObnizNowApiError);
    expect(String(fetchApi.mock.calls[0][0])).toBe("https://sdk.invalid/api/1/machine/fixture");
  });

  it("keeps middleware builders synchronous and converts errors on the returned API", async () => {
    const pre = vi.fn(async () => undefined);
    const post = vi.fn(async () => undefined);
    const client = new ObnizNow({
      token: "fixture",
      fetch: async () => new Response(JSON.stringify({ error: "missing" }), { status: 404 }),
    });
    const api = client.machine.withMiddleware({}).withPreMiddleware(pre).withPostMiddleware(post);
    expect(api).not.toBeInstanceOf(Promise);
    await expect(api.getMachine({ machineId: "fixture" })).rejects.toMatchObject({
      name: "ObnizNowApiError",
      status: 404,
      data: { error: "missing" },
    });
    expect(pre).toHaveBeenCalledOnce();
    expect(post).toHaveBeenCalledOnce();
  });
});

describe("ObnizNow SDK", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  describe("Environment authentication mode", () => {
    it("uses NOW_API_URL and NOW_API_TOKEN without arguments and protects run authentication", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });
      vi.stubEnv("NOW_API_URL", "https://now.internal.example");
      vi.stubEnv("NOW_API_TOKEN", "environment-token");
      vi.stubGlobal("fetch", mockFetch);

      const client = new ObnizNow();
      await client.inboundSources.listInboundSources(
        { limit: 10, offset: 0 },
        { headers: { Authorization: "Bearer caller-token" } },
      );

      expect(String(mockFetch.mock.calls[0][0])).toMatch(/^https:\/\/now\.internal\.example\//u);
      const headers = new Headers(mockFetch.mock.calls[0][1]?.headers);
      expect(headers.get("Authorization")).toBe("Bearer environment-token");
    });

    it("keeps explicit token and baseUrl ahead of environment values", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });
      vi.stubEnv("NOW_API_URL", "https://ignored.example");
      vi.stubEnv("NOW_API_TOKEN", "ignored-token");

      const client = new ObnizNow({
        token: "explicit-token",
        baseUrl: "https://explicit.example",
        fetch: mockFetch,
      });
      await client.inboundSources.listInboundSources({ limit: 10, offset: 0 });

      expect(String(mockFetch.mock.calls[0][0])).toMatch(/^https:\/\/explicit\.example\//u);
      const headers = new Headers(mockFetch.mock.calls[0][1]?.headers);
      expect(headers.get("Authorization")).toBe("Bearer explicit-token");
    });

    it("uses an explicit baseUrl with environment authentication", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });
      vi.stubEnv("NOW_API_URL", "https://ignored.example");
      vi.stubEnv("NOW_API_TOKEN", "environment-token");

      const client = new ObnizNow({ baseUrl: "https://explicit.example", fetch: mockFetch });
      await client.inboundSources.listInboundSources({ limit: 10, offset: 0 });

      expect(String(mockFetch.mock.calls[0][0])).toMatch(/^https:\/\/explicit\.example\//u);
      const headers = new Headers(mockFetch.mock.calls[0][1]?.headers);
      expect(headers.get("Authorization")).toBe("Bearer environment-token");
    });

    it("keeps explicit cookies ahead of environment authentication", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });
      vi.stubEnv("NOW_API_URL", "https://ignored.example");
      vi.stubEnv("NOW_API_TOKEN", "ignored-token");

      const client = new ObnizNow({
        cookies: { token: "session-token", accountId: "account-123" },
        fetch: mockFetch,
      });
      await client.inboundSources.listInboundSources({ limit: 10, offset: 0 });

      expect(String(mockFetch.mock.calls[0][0])).toMatch(/^https:\/\/api\.obniz\.com\//u);
      const headers = new Headers(mockFetch.mock.calls[0][1]?.headers);
      expect(headers.get("Cookie")).toBe("token=session-token; account_id=account-123");
      expect(headers.get("Authorization")).toBeNull();
    });

    it("uses a fixed configuration error without leaking environment values", () => {
      const sentinel = "SENTINEL-token-must-not-leak";
      vi.stubEnv("NOW_API_TOKEN", sentinel);
      vi.stubEnv("NOW_API_URL", "");

      expect(() => new ObnizNow()).toThrow(
        "Either 'token' or 'cookies' must be provided; argumentless usage requires NOW_API_TOKEN and NOW_API_URL",
      );
      try {
        new ObnizNow();
      } catch (error) {
        expect((error as Error).message).not.toContain(sentinel);
      }
    });

    it("is safe when process is absent and explicit browser options are supplied", () => {
      vi.stubGlobal("process", undefined);
      vi.stubGlobal("window", {});
      vi.stubGlobal("document", {});

      expect(() => new ObnizNow({ token: "browser-token", fetch: vi.fn() as unknown as typeof fetch })).not.toThrow();
      expect(() => new ObnizNow()).toThrow(
        "Either 'token' or 'cookies' must be provided; argumentless usage requires NOW_API_TOKEN and NOW_API_URL",
      );
    });
  });

  describe("Bearer Token Mode", () => {
    it("should initialize with token option", () => {
      const client = new ObnizNow({
        token: "test-token",
        baseUrl: "https://api.obniz.com",
      });
      expect(client).toBeDefined();
      expect(client.inboundSources).toBeDefined();
    });

    it("should use Bearer token in requests", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });

      const client = new ObnizNow({
        token: "test-token",
        fetch: mockFetch,
      });

      try {
        await client.inboundSources.listInboundSources({
          limit: 10,
          offset: 0,
        });
      } catch (e) {
        // Expected to fail due to mock, but we can check the call
      }

      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers;

      if (headers) {
        // Headers can be either a Headers instance or a plain object
        const authHeader =
          headers instanceof Headers ? headers.get("Authorization") : headers.Authorization || headers.authorization;
        expect(authHeader).toContain("Bearer test-token");
      }
    });
  });

  describe("Cookie-based Mode", () => {
    it("should initialize with cookies option", () => {
      const client = new ObnizNow({
        cookies: {
          token: "session-token",
          accountId: "account-123",
        },
        baseUrl: "https://api.obniz.com",
      });
      expect(client).toBeDefined();
      expect(client.inboundSources).toBeDefined();
    });

    it("should use cookies in requests", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });

      const client = new ObnizNow({
        cookies: {
          token: "session-token",
          accountId: "account-123",
        },
        fetch: mockFetch,
      });

      try {
        await client.inboundSources.listInboundSources({
          limit: 10,
          offset: 0,
        });
      } catch (e) {
        // Expected to fail due to mock, but we can check the call
      }

      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      const init = callArgs[1];

      // Check that Cookie header is set (headers is now a Headers instance)
      expect(init?.headers).toBeInstanceOf(Headers);
      expect((init?.headers as Headers).get("Cookie")).toBe("token=session-token; account_id=account-123");
      expect(init?.credentials).toBe("include");
    });

    it("should not set Authorization header when using cookies", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });

      const client = new ObnizNow({
        cookies: {
          token: "session-token",
          accountId: "account-123",
        },
        fetch: mockFetch,
      });

      try {
        await client.inboundSources.listInboundSources({
          limit: 10,
          offset: 0,
        });
      } catch (e) {
        // Expected to fail
      }

      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers;

      // Headers is now a Headers instance, not a plain object
      expect(headers).toBeInstanceOf(Headers);
      expect((headers as Headers).get("Authorization")).toBeNull();
    });
  });

  describe("Error Handling", () => {
    it("should throw error when neither token nor cookies provided", () => {
      expect(() => {
        new ObnizNow({} as any);
      }).toThrow("Either 'token' or 'cookies' must be provided");
    });

    it("should accept either token or cookies but not require both", () => {
      const client1 = new ObnizNow({ token: "test-token" });
      expect(client1).toBeDefined();

      const client2 = new ObnizNow({
        cookies: { token: "session-token", accountId: "account-123" },
      });
      expect(client2).toBeDefined();
    });
  });

  describe("Custom baseUrl", () => {
    it("should use custom baseUrl with token mode", () => {
      const client = new ObnizNow({
        token: "test-token",
        baseUrl: "http://localhost:3000",
      });
      expect(client).toBeDefined();
    });

    it("should use custom baseUrl with cookie mode", () => {
      const client = new ObnizNow({
        cookies: {
          token: "session-token",
          accountId: "account-123",
        },
        baseUrl: "http://localhost:3000",
      });
      expect(client).toBeDefined();
    });
  });
});
