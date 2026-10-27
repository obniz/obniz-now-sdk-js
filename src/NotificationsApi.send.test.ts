import { describe, expect, it, vi } from "vitest";
import { ObnizNow } from "./ObnizNow";
import { ObnizNowApiError } from "./ObnizNowApiError";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const REQUEST_BODY = { name: "temperature_alerts", message: "Temperature exceeded 80 degrees." };

describe("NotificationsApi.sendNotification", () => {
  it.each([
    {
      status: 202,
      responseBody: { request_id: REQUEST_ID, status: "pending", replayed: false },
    },
    {
      status: 200,
      responseBody: { request_id: REQUEST_ID, status: "pending", replayed: true },
    },
    {
      status: 200,
      responseBody: {
        request_id: REQUEST_ID,
        sent: false,
        status: "skipped",
        replayed: false,
        warnings: [{ type: "missing_notification", name: REQUEST_BODY.name }],
      },
    },
  ] as const)("sends the output contract and parses HTTP $status JSON", async ({ status, responseBody }) => {
    const fetchApi = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) =>
      Promise.resolve(
        new Response(JSON.stringify(responseBody), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const client = new ObnizNow({
      token: "sdk-token",
      baseUrl: "https://api.example.test",
      fetch: fetchApi as typeof fetch,
    });

    const result = await client.notifications.sendNotification({
      idempotencyKey: "alert-20260721-0001",
      sendNotificationRequest: REQUEST_BODY,
    });

    expect(result).toEqual(responseBody);
    expect(fetchApi).toHaveBeenCalledOnce();
    const [url, init] = fetchApi.mock.calls[0];
    expect(url).toBe("https://api.example.test/api/1/notifications/send");
    expect(init?.method).toBe("POST");
    const headers = new Headers(init?.headers);
    expect(headers.get("Authorization")).toBe("Bearer sdk-token");
    expect(headers.get("Idempotency-Key")).toBe("alert-20260721-0001");
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(JSON.parse(String(init?.body))).toEqual(REQUEST_BODY);
  });

  it("preserves the 409 idempotency conflict status and JSON error", async () => {
    const responseBody = { error: "Idempotency-Key conflicts with an existing request" };
    const fetchApi = vi.fn(async () =>
      Promise.resolve(
        new Response(JSON.stringify(responseBody), {
          status: 409,
          statusText: "Conflict",
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const client = new ObnizNow({
      token: "sdk-token",
      baseUrl: "https://api.example.test",
      fetch: fetchApi as typeof fetch,
    });

    const error = await client.notifications
      .sendNotification({
        idempotencyKey: "alert-20260721-0001",
        sendNotificationRequest: REQUEST_BODY,
      })
      .catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(ObnizNowApiError);
    expect(error).toMatchObject({
      name: "ObnizNowApiError",
      status: 409,
      statusText: "Conflict",
      data: responseBody,
    });
  });
});
