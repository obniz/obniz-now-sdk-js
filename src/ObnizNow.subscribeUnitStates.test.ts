import { afterEach, describe, expect, it, vi } from "vitest";
import { ObnizNow } from "./ObnizNow";

type UnitStateSubscriptionEvent =
  | {
      readonly type: "change";
      readonly unitId: string;
      readonly key: string;
      readonly value: string | number | null;
      readonly operation: "upsert" | "delete";
      readonly revision: string;
    }
  | {
      readonly type: "snapshot";
      readonly mode: "replace";
      readonly scope: { readonly unitId: string; readonly keys?: ReadonlyArray<string> };
      readonly items: ReadonlyArray<{
        readonly key: string;
        readonly value: string | number;
        readonly revision: string;
        readonly stateTs: string;
      }>;
    }
  | { readonly type: "unit_deleted"; readonly unitId: string; readonly resetRevision: string };

interface UnitStateSubscriptionError extends Error {
  readonly kind: "http" | "transport" | "protocol" | "callback";
  readonly retryable: boolean;
  readonly status?: number;
}

interface UnitStateSubscriptionHandle {
  close(): void;
}

interface FutureObnizNow {
  subscribeUnitStates(
    filter: {
      readonly unitId: string;
      readonly keys?: ReadonlyArray<string>;
      readonly includeCurrent?: boolean;
      readonly lastEventId?: string;
    },
    callback: (event: UnitStateSubscriptionEvent) => void,
    options?: { readonly onError?: (error: UnitStateSubscriptionError) => void },
  ): UnitStateSubscriptionHandle;
}

interface ControlledResponse {
  readonly response: Response;
  enqueue(text: string): void;
  close(): void;
}

const HTTP_ERROR_MESSAGE = "Unit State subscription HTTP request failed";
const TRANSPORT_ERROR_MESSAGE = "Unit State subscription transport failed";
const PROTOCOL_ERROR_MESSAGE = "Unit State subscription protocol error";
const CALLBACK_ERROR_MESSAGE = "Unit State subscription callback failed";
const INVALID_FILTER_MESSAGE = "Invalid Unit State subscription filter";
const textEncoder = new TextEncoder();

function subscribe(
  client: ObnizNow,
  filter: Parameters<FutureObnizNow["subscribeUnitStates"]>[0],
  callback: Parameters<FutureObnizNow["subscribeUnitStates"]>[1],
  options?: Parameters<FutureObnizNow["subscribeUnitStates"]>[2],
): UnitStateSubscriptionHandle {
  const method = (client as unknown as Partial<FutureObnizNow>).subscribeUnitStates;
  if (typeof method !== "function") throw new Error("subscribeUnitStates is not implemented");
  return method.call(client, filter, callback, options);
}

function frame(options: {
  readonly event: string;
  readonly data: unknown;
  readonly id?: string;
  readonly newline?: "\n" | "\r\n";
  readonly splitDataAt?: number;
}): string {
  const newline = options.newline ?? "\n";
  const json = typeof options.data === "string" ? options.data : JSON.stringify(options.data);
  const dataLines =
    options.splitDataAt === undefined
      ? [`data: ${json}`]
      : [`data: ${json.slice(0, options.splitDataAt)}`, `data: ${json.slice(options.splitDataAt)}`];
  return [
    ...(options.id === undefined ? [] : [`id: ${options.id}`]),
    `event: ${options.event}`,
    ...dataLines,
    "",
    "",
  ].join(newline);
}

function byteChunks(text: string, widths: ReadonlyArray<number> = [1, 2, 5, 3, 8]): Uint8Array[] {
  const bytes = textEncoder.encode(text);
  const chunks: Uint8Array[] = [];
  let offset = 0;
  let index = 0;
  while (offset < bytes.length) {
    const width = widths[index % widths.length];
    chunks.push(bytes.slice(offset, Math.min(bytes.length, offset + width)));
    offset += width;
    index++;
  }
  return chunks;
}

function responseFromChunks(chunks: ReadonlyArray<Uint8Array>, status = 200): Response {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
  return new Response(body, {
    status,
    headers: { "Content-Type": status === 200 ? "text/event-stream" : "application/json" },
  });
}

function closedResponse(text: string, status = 200): Response {
  return responseFromChunks([textEncoder.encode(text)], status);
}

function controlledResponse(initialText = ""): ControlledResponse {
  let streamController!: ReadableStreamDefaultController<Uint8Array>;
  let closed = false;
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        streamController = controller;
        if (initialText.length > 0) controller.enqueue(textEncoder.encode(initialText));
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } },
  );
  return {
    response,
    enqueue(text: string): void {
      if (closed) return;
      try {
        streamController.enqueue(textEncoder.encode(text));
      } catch {
        closed = true;
      }
    },
    close(): void {
      if (closed) return;
      closed = true;
      try {
        streamController.close();
      } catch {
        // The subscription may already have cancelled the reader.
      }
    },
  };
}

function batch(options: {
  readonly unitId: string;
  readonly changes: ReadonlyArray<{
    readonly key: string;
    readonly value: string | number;
    readonly operation: "upsert" | "delete";
    readonly revision: string;
  }>;
  readonly version?: number;
}) {
  return {
    version: options.version ?? 1,
    mutation_id: "mutation-sdk-test",
    chunk_index: 0,
    chunk_count: 1,
    account_id: "account-sdk-test",
    unit_id: options.unitId,
    changes: options.changes.map((change) => ({
      ...change,
      state_ts: "2026-08-07T00:00:00.000Z",
    })),
    published_at: "2026-08-07T00:00:00.010Z",
  };
}

function requestHeaders(mockFetch: ReturnType<typeof vi.fn<typeof fetch>>, index = 0): Headers {
  return new Headers(mockFetch.mock.calls[index]?.[1]?.headers);
}

function requestedUrl(mockFetch: ReturnType<typeof vi.fn<typeof fetch>>, index = 0): URL {
  const input = mockFetch.mock.calls[index]?.[0];
  if (typeof input === "string") return new URL(input);
  if (input instanceof URL) return input;
  if (input instanceof Request) return new URL(input.url);
  throw new Error("Subscription fetch URL was not captured");
}

async function flushMicrotasks(turns = 30): Promise<void> {
  for (let index = 0; index < turns; index++) await Promise.resolve();
}

async function eventually(assertion: () => void, turns = 200): Promise<void> {
  let lastError: unknown;
  for (let index = 0; index < turns; index++) {
    try {
      assertion();
      return;
    } catch (error) {
      lastError = error;
    }
    await Promise.resolve();
  }
  throw lastError;
}

function callbackError(value: unknown): UnitStateSubscriptionError {
  expect(value).toBeInstanceOf(Error);
  return value as UnitStateSubscriptionError;
}

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("ObnizNow.subscribeUnitStates", () => {
  it("validates and normalizes one-unit filters and returns an idempotent close handle", async () => {
    const stream = controlledResponse();
    const mockFetch = vi.fn<typeof fetch>(() => Promise.resolve(stream.response));
    const client = new ObnizNow({ token: "sdk-token", baseUrl: "https://now.example/", fetch: mockFetch });
    const callback = vi.fn();

    for (const invalidFilter of [
      {},
      { unitId: "" },
      { unitId: "machine-a", keys: [] },
      { unitId: "machine-a", keys: Array.from({ length: 33 }, (_value, index) => `key-${index}`) },
      { unitId: "machine-a", lastEventId: "01-0" },
      { unitId: "machine-a", lastEventId: "not-a-redis-id" },
    ]) {
      expect(() => subscribe(client, invalidFilter as { unitId: string }, callback)).toThrow(INVALID_FILTER_MESSAGE);
    }
    expect(mockFetch).not.toHaveBeenCalled();

    const handle = subscribe(
      client,
      {
        unitId: "machine/a b",
        keys: ["temperature", "temperature", "humidity"],
        lastEventId: "123-4",
      },
      callback,
    );
    await eventually(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    const requestUrl = requestedUrl(mockFetch);
    expect(requestUrl.pathname).toBe("/api/1/units/machine%2Fa%20b/states/stream");
    expect(requestUrl.searchParams.get("keys")).toBe("temperature,humidity");
    expect(requestUrl.searchParams.has("include_current")).toBe(false);
    expect(requestHeaders(mockFetch).get("Last-Event-ID")).toBe("123-4");
    const signal = mockFetch.mock.calls[0][1]?.signal;

    expect(() => handle.close()).not.toThrow();
    expect(() => handle.close()).not.toThrow();
    expect(signal?.aborted).toBe(true);
    stream.close();
  });

  it("uses protected token auth and the existing browser or Node cookie wrapper", async () => {
    const tokenStream = controlledResponse();
    const tokenFetch = vi.fn<typeof fetch>(() => Promise.resolve(tokenStream.response));
    const tokenClient = new ObnizNow({ token: "explicit-token", fetch: tokenFetch });
    const tokenHandle = subscribe(tokenClient, { unitId: "machine-token" }, vi.fn());
    await eventually(() => expect(tokenFetch).toHaveBeenCalledTimes(1));
    expect(requestHeaders(tokenFetch).get("Authorization")).toBe("Bearer explicit-token");

    const nodeStream = controlledResponse();
    const nodeFetch = vi.fn<typeof fetch>(() => Promise.resolve(nodeStream.response));
    const nodeClient = new ObnizNow({
      cookies: { token: "node-session", accountId: "node-account" },
      fetch: nodeFetch,
    });
    const nodeHandle = subscribe(nodeClient, { unitId: "machine-node" }, vi.fn());
    await eventually(() => expect(nodeFetch).toHaveBeenCalledTimes(1));
    expect(requestHeaders(nodeFetch).get("Cookie")).toBe("token=node-session; account_id=node-account");
    expect(nodeFetch.mock.calls[0][1]?.credentials).toBe("include");
    expect(requestHeaders(nodeFetch).get("Authorization")).toBeNull();

    vi.stubGlobal("window", {});
    vi.stubGlobal("document", {});
    const browserStream = controlledResponse();
    const browserFetch = vi.fn<typeof fetch>(() => Promise.resolve(browserStream.response));
    const browserClient = new ObnizNow({
      cookies: { token: "browser-session", accountId: "browser-account" },
      fetch: browserFetch,
    });
    const browserHandle = subscribe(browserClient, { unitId: "machine-browser" }, vi.fn());
    await eventually(() => expect(browserFetch).toHaveBeenCalledTimes(1));
    expect(requestHeaders(browserFetch).get("Cookie")).toBeNull();
    expect(requestHeaders(browserFetch).get("Authorization")).toBeNull();
    expect(browserFetch.mock.calls[0][1]?.credentials).toBe("include");

    vi.stubEnv("NOW_API_URL", "https://run.example");
    vi.stubEnv("NOW_API_TOKEN", "run-token");
    const runStream = controlledResponse();
    const runFetch = vi.fn<typeof fetch>(() => Promise.resolve(runStream.response));
    vi.stubGlobal("fetch", runFetch);
    const runClient = new ObnizNow();
    const runHandle = subscribe(runClient, { unitId: "machine-run" }, vi.fn(), {
      headers: { Authorization: "Bearer caller-token" },
    } as never);
    await eventually(() => expect(runFetch).toHaveBeenCalledTimes(1));
    expect(requestHeaders(runFetch).get("Authorization")).toBe("Bearer run-token");

    tokenHandle.close();
    nodeHandle.close();
    browserHandle.close();
    runHandle.close();
    tokenStream.close();
    nodeStream.close();
    browserStream.close();
    runStream.close();
  });

  it("parses fragmented CRLF and LF SSE, ignores heartbeat, filters batches, and compares decimal revisions", async () => {
    const unitId = "machine-fragmented";
    const wrongUnit = frame({
      id: "100-0",
      event: "unit_state.batch",
      data: batch({
        unitId: "machine-other",
        changes: [{ key: "temperature", value: 1, operation: "upsert", revision: "1" }],
      }),
      newline: "\r\n",
    });
    const payload = batch({
      unitId,
      changes: [
        { key: "temperature", value: 20, operation: "upsert", revision: "9007199254740993" },
        { key: "humidity", value: "値🌡️", operation: "upsert", revision: "1" },
        { key: "temperature", value: 19, operation: "upsert", revision: "9007199254740992" },
        { key: "temperature", value: 21, operation: "upsert", revision: "9007199254740994" },
        { key: "temperature", value: 999, operation: "delete", revision: "9007199254740994" },
      ],
    });
    const payloadJson = JSON.stringify(payload);
    const target = frame({
      id: "101-0",
      event: "unit_state.batch",
      data: payloadJson,
      splitDataAt: payloadJson.indexOf(",") + 1,
    });
    const body = `: heartbeat\r\n\r\n${wrongUnit}: another heartbeat\n\n${target}`;
    const mockFetch = vi.fn<typeof fetch>(() => Promise.resolve(responseFromChunks(byteChunks(body))));
    const callback = vi.fn<(event: UnitStateSubscriptionEvent) => void>();
    const handle = subscribe(
      new ObnizNow({ token: "sdk-token", fetch: mockFetch }),
      { unitId, keys: ["temperature"] },
      callback,
    );

    await eventually(() => expect(callback).toHaveBeenCalledTimes(2));
    expect(callback.mock.calls.map(([event]) => event)).toEqual([
      {
        type: "change",
        unitId,
        key: "temperature",
        value: 20,
        operation: "upsert",
        revision: "9007199254740993",
      },
      {
        type: "change",
        unitId,
        key: "temperature",
        value: 21,
        operation: "upsert",
        revision: "9007199254740994",
      },
    ]);
    handle.close();
  });

  it("does not callback reset and replaces scoped revision state with the following snapshot", async () => {
    const unitId = "machine-reset";
    const before = frame({
      id: "200-0",
      event: "unit_state.batch",
      data: batch({
        unitId,
        changes: [{ key: "temperature", value: 50, operation: "upsert", revision: "50" }],
      }),
    });
    const reset = frame({ event: "unit_state.reset", data: { version: 1, reason: "cursor_expired" } });
    const snapshot = frame({
      id: "201-0",
      event: "unit_state.snapshot",
      data: {
        version: 1,
        mode: "replace",
        scope: { unit_id: unitId, keys: ["temperature"] },
        items: [
          {
            key: "temperature",
            value: 10,
            revision: "10",
            state_ts: "2026-08-07T00:00:00.000Z",
          },
        ],
      },
    });
    const after = frame({
      id: "202-0",
      event: "unit_state.batch",
      data: batch({
        unitId,
        changes: [{ key: "temperature", value: 11, operation: "upsert", revision: "11" }],
      }),
    });
    const mockFetch = vi.fn<typeof fetch>(() => Promise.resolve(closedResponse(before + reset + snapshot + after)));
    const callback = vi.fn<(event: UnitStateSubscriptionEvent) => void>();
    const handle = subscribe(
      new ObnizNow({ token: "sdk-token", fetch: mockFetch }),
      { unitId, keys: ["temperature"] },
      callback,
    );

    await eventually(() => expect(callback).toHaveBeenCalledTimes(3));
    expect(callback.mock.calls.map(([event]) => event.type)).toEqual(["change", "snapshot", "change"]);
    expect(callback.mock.calls[1][0]).toEqual({
      type: "snapshot",
      mode: "replace",
      scope: { unitId, keys: ["temperature"] },
      items: [
        {
          key: "temperature",
          value: 10,
          revision: "10",
          stateTs: "2026-08-07T00:00:00.000Z",
        },
      ],
    });
    expect(callback.mock.calls[2][0]).toMatchObject({ type: "change", revision: "11", value: 11 });
    handle.close();
  });

  it("emits unit_deleted once as terminal and never reconnects", async () => {
    vi.useFakeTimers();
    const unitId = "machine-deleted";
    const stream = controlledResponse(
      frame({
        id: "300-0",
        event: "unit_state.unit_deleted",
        data: {
          version: 1,
          account_id: "account-sdk-test",
          unit_id: unitId,
          reset_revision: "300",
          published_at: "2026-08-07T00:00:00.000Z",
        },
      }),
    );
    const mockFetch = vi.fn<typeof fetch>(() => Promise.resolve(stream.response));
    const callback = vi.fn<(event: UnitStateSubscriptionEvent) => void>();
    const handle = subscribe(new ObnizNow({ token: "sdk-token", fetch: mockFetch }), { unitId }, callback);

    await eventually(() => expect(callback).toHaveBeenCalledTimes(1));
    expect(callback).toHaveBeenCalledWith({ type: "unit_deleted", unitId, resetRevision: "300" });
    await vi.advanceTimersByTimeAsync(120_000);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    stream.enqueue(
      frame({
        id: "301-0",
        event: "unit_state.batch",
        data: batch({
          unitId,
          changes: [{ key: "temperature", value: 99, operation: "upsert", revision: "301" }],
        }),
      }),
    );
    await flushMicrotasks();
    expect(callback).toHaveBeenCalledTimes(1);
    handle.close();
    stream.close();
  });

  it("retries network, 5xx, and EOF with capped exponential jitter while carrying the cursor", async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const retryErrors: UnitStateSubscriptionError[] = [];
    const retryOpen = controlledResponse();
    const retryFetch = vi.fn<typeof fetch>();
    retryFetch.mockImplementation((_input, _init) => {
      const index = retryFetch.mock.calls.length - 1;
      if (index === 0) return Promise.reject(new Error("network-secret"));
      if (index <= 7) return Promise.resolve(new Response("http-secret", { status: 503 }));
      return Promise.resolve(retryOpen.response);
    });
    const retryHandle = subscribe(
      new ObnizNow({ token: "sdk-token", fetch: retryFetch }),
      { unitId: "machine-retry" },
      vi.fn(),
      { onError: (error) => retryErrors.push(error) },
    );
    await eventually(() => expect(retryFetch).toHaveBeenCalledTimes(1));

    for (const [index, delay] of [1_000, 2_000, 4_000, 8_000, 16_000, 30_000, 30_000, 30_000].entries()) {
      await vi.advanceTimersByTimeAsync(delay - 1);
      expect(retryFetch).toHaveBeenCalledTimes(index + 1);
      await vi.advanceTimersByTimeAsync(1);
      await eventually(() => expect(retryFetch).toHaveBeenCalledTimes(index + 2));
    }
    expect(retryErrors).toHaveLength(8);
    expect(retryErrors[0]).toMatchObject({
      kind: "transport",
      message: TRANSPORT_ERROR_MESSAGE,
      retryable: true,
    });
    for (const error of retryErrors.slice(1)) {
      expect(error).toMatchObject({ kind: "http", message: HTTP_ERROR_MESSAGE, retryable: true, status: 503 });
    }
    expect(JSON.stringify(retryErrors)).not.toMatch(/network-secret|http-secret/u);

    const cursorId = "400-9";
    const cursorOpen = controlledResponse();
    const cursorFetch = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        closedResponse(
          frame({
            id: cursorId,
            event: "unit_state.batch",
            data: batch({
              unitId: "machine-cursor",
              changes: [{ key: "temperature", value: 1, operation: "upsert", revision: "1" }],
            }),
          }),
        ),
      )
      .mockResolvedValueOnce(cursorOpen.response);
    const cursorCallback = vi.fn();
    const cursorHandle = subscribe(
      new ObnizNow({ token: "sdk-token", fetch: cursorFetch }),
      { unitId: "machine-cursor" },
      cursorCallback,
    );
    await eventually(() => expect(cursorCallback).toHaveBeenCalledTimes(1));
    await vi.advanceTimersByTimeAsync(999);
    expect(cursorFetch).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    await eventually(() => expect(cursorFetch).toHaveBeenCalledTimes(2));
    expect(requestHeaders(cursorFetch, 1).get("Last-Event-ID")).toBe(cursorId);

    retryHandle.close();
    cursorHandle.close();
    retryOpen.close();
    cursorOpen.close();
  });

  it("reports 4xx as terminal HTTP errors without credentials, payloads, or retry", async () => {
    vi.useFakeTimers();
    const secret = "Bearer private-token and private-response";
    const mockFetch = vi.fn<typeof fetch>(() => Promise.resolve(new Response(secret, { status: 401 })));
    const errors: UnitStateSubscriptionError[] = [];
    const handle = subscribe(
      new ObnizNow({ token: "private-token", fetch: mockFetch }),
      { unitId: "machine-unauthorized" },
      vi.fn(),
      { onError: (error) => errors.push(error) },
    );

    await eventually(() => expect(errors).toHaveLength(1));
    expect(errors[0]).toMatchObject({
      kind: "http",
      message: HTTP_ERROR_MESSAGE,
      retryable: false,
      status: 401,
    });
    expect(JSON.stringify(errors)).not.toContain(secret);
    expect(errors[0].message).not.toContain("private-token");
    await vi.advanceTimersByTimeAsync(120_000);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    handle.close();
  });

  it("isolates callback and onError exceptions, advances the cursor, and continues delivery", async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const unitId = "machine-callback";
    const firstId = "500-0";
    const secondId = "501-0";
    const firstResponse = closedResponse(
      frame({
        id: firstId,
        event: "unit_state.batch",
        data: batch({
          unitId,
          changes: [{ key: "temperature", value: 1, operation: "upsert", revision: "1" }],
        }),
      }) +
        frame({
          id: secondId,
          event: "unit_state.batch",
          data: batch({
            unitId,
            changes: [{ key: "temperature", value: 2, operation: "upsert", revision: "2" }],
          }),
        }),
    );
    const reconnected = controlledResponse();
    const mockFetch = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(firstResponse)
      .mockResolvedValueOnce(reconnected.response);
    const delivered: UnitStateSubscriptionEvent[] = [];
    const onError = vi.fn((_error: UnitStateSubscriptionError) => {
      throw new Error("on-error-secret");
    });
    const callback = vi.fn((event: UnitStateSubscriptionEvent) => {
      delivered.push(event);
      if (delivered.length === 1) throw new Error("callback-secret");
    });
    const handle = subscribe(new ObnizNow({ token: "sdk-token", fetch: mockFetch }), { unitId }, callback, { onError });

    await eventually(() => expect(callback).toHaveBeenCalledTimes(2));
    expect(onError).toHaveBeenCalledTimes(1);
    const reported = callbackError(onError.mock.calls[0][0]);
    expect(reported).toMatchObject({ kind: "callback", message: CALLBACK_ERROR_MESSAGE, retryable: false });
    expect(reported.message).not.toContain("callback-secret");
    await vi.advanceTimersByTimeAsync(1_000);
    await eventually(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    expect(requestHeaders(mockFetch, 1).get("Last-Event-ID")).toBe(secondId);
    expect(delivered).toHaveLength(2);

    handle.close();
    reconnected.close();
  });

  it("close aborts active work and fences late fetch, read, callback, and retry settlements", async () => {
    vi.useFakeTimers();
    let resolveFetch!: (response: Response) => void;
    const delayedFetch = vi.fn<typeof fetch>(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        }),
    );
    const delayedCallback = vi.fn();
    const delayedHandle = subscribe(
      new ObnizNow({ token: "sdk-token", fetch: delayedFetch }),
      { unitId: "machine-delayed-fetch" },
      delayedCallback,
    );
    await eventually(() => expect(delayedFetch).toHaveBeenCalledTimes(1));
    const delayedSignal = delayedFetch.mock.calls[0][1]?.signal;
    delayedHandle.close();
    delayedHandle.close();
    expect(delayedSignal?.aborted).toBe(true);
    resolveFetch(
      closedResponse(
        frame({
          id: "600-0",
          event: "unit_state.batch",
          data: batch({
            unitId: "machine-delayed-fetch",
            changes: [{ key: "temperature", value: 1, operation: "upsert", revision: "1" }],
          }),
        }),
      ),
    );
    await flushMicrotasks();
    await vi.advanceTimersByTimeAsync(120_000);
    expect(delayedCallback).not.toHaveBeenCalled();
    expect(delayedFetch).toHaveBeenCalledTimes(1);

    const activeStream = controlledResponse();
    const activeFetch = vi.fn<typeof fetch>(() => Promise.resolve(activeStream.response));
    const activeCallback = vi.fn();
    const activeHandle = subscribe(
      new ObnizNow({ token: "sdk-token", fetch: activeFetch }),
      { unitId: "machine-delayed-read" },
      activeCallback,
    );
    await eventually(() => expect(activeFetch).toHaveBeenCalledTimes(1));
    activeHandle.close();
    activeStream.enqueue(
      frame({
        id: "601-0",
        event: "unit_state.batch",
        data: batch({
          unitId: "machine-delayed-read",
          changes: [{ key: "temperature", value: 2, operation: "upsert", revision: "2" }],
        }),
      }),
    );
    activeStream.close();
    await flushMicrotasks();
    await vi.advanceTimersByTimeAsync(120_000);
    expect(activeCallback).not.toHaveBeenCalled();
    expect(activeFetch).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("reports malformed, oversized, and unknown frames as fixed secret-free protocol errors", async () => {
    const unitId = "machine-protocol";
    const secret = "raw-protocol-secret";
    const malformed = frame({ event: "unit_state.batch", data: `{"secret":"${secret}"` });
    const unknownEvent = frame({ event: "unit_state.future", data: { version: 1, secret } });
    const unknownVersion = frame({
      id: "700-0",
      event: "unit_state.batch",
      data: batch({
        unitId,
        version: 2,
        changes: [{ key: "temperature", value: 1, operation: "upsert", revision: "1" }],
      }),
    });
    const invalidRevisions = ["0", "01", "9223372036854775808"]
      .map((revision, index) =>
        frame({
          id: `700-${index + 1}`,
          event: "unit_state.batch",
          data: batch({
            unitId,
            changes: [{ key: "temperature", value: index, operation: "upsert", revision }],
          }),
        }),
      )
      .join("");
    const oversized = frame({
      event: "unit_state.batch",
      data: `{"version":1,"secret":"${"x".repeat(2 * 1024 * 1024)}${secret}"}`,
    });
    const valid = frame({
      id: "701-0",
      event: "unit_state.batch",
      data: batch({
        unitId,
        changes: [{ key: "temperature", value: 2, operation: "upsert", revision: "2" }],
      }),
    });
    const mockFetch = vi.fn<typeof fetch>(() =>
      Promise.resolve(closedResponse(malformed + unknownEvent + unknownVersion + invalidRevisions + oversized + valid)),
    );
    const errors: UnitStateSubscriptionError[] = [];
    const callback = vi.fn();
    const handle = subscribe(new ObnizNow({ token: "credential-secret", fetch: mockFetch }), { unitId }, callback, {
      onError: (error) => errors.push(error),
    });

    await eventually(() => {
      expect(errors).toHaveLength(7);
      expect(callback).toHaveBeenCalledTimes(1);
    }, 500);
    for (const error of errors) {
      expect(error).toMatchObject({ kind: "protocol", message: PROTOCOL_ERROR_MESSAGE, retryable: false });
    }
    expect(JSON.stringify(errors)).not.toContain(secret);
    expect(JSON.stringify(errors)).not.toContain("credential-secret");
    handle.close();
  });
});
