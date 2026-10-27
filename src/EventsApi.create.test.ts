import { describe, expect, it, vi } from "vitest";
import { ObnizNow } from "./ObnizNow";

const EVENT = {
  id: "event-1",
  type: "api",
  ts: "2026-07-23T00:00:00.000Z",
  serial: 42,
  name: "temperature_threshold",
  level: "warning",
  value: { temperature: 81 },
};
const REQUEST_BODY = {
  name: EVENT.name,
  level: EVENT.level,
  value: EVENT.value,
} as const;

describe("EventsApi.createEvent", () => {
  it.each([201, 200] as const)("forwards the idempotency contract and parses HTTP %s JSON", async (status) => {
    const responseBody = { event: EVENT };
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

    const result = await client.events.createEvent({
      idempotencyKey: "event-20260723-0001",
      createEventRequest: REQUEST_BODY,
    });

    expect(result).toEqual(responseBody);
    expect(fetchApi).toHaveBeenCalledOnce();
    const [url, init] = fetchApi.mock.calls[0];
    expect(url).toBe("https://api.example.test/api/1/events");
    expect(init?.method).toBe("POST");
    const headers = new Headers(init?.headers);
    expect(headers.get("Authorization")).toBe("Bearer sdk-token");
    expect(headers.get("Idempotency-Key")).toBe("event-20260723-0001");
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(JSON.parse(String(init?.body))).toEqual(REQUEST_BODY);
  });
});
