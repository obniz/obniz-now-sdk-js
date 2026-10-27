import { allowsBrowserApiRequest } from "./api-policy";
import { BrowserLoginRequiredError, type BrowserAccessLease } from "./session-operations";
import type { BrowserSessionRecord } from "./session";

export class BrowserApiError extends Error {
  constructor(
    public readonly kind: "unsupported_api" | "result_unknown" | "http_error" | "response_interrupted",
    public readonly status?: number,
    public readonly serverCode?: string,
    public readonly requestId?: string,
  ) {
    super(kind === "unsupported_api" ? "API is unavailable for this browser client" : "Browser API request failed");
    this.name = "BrowserApiError";
  }
}

export class BrowserAuthenticatedFetch {
  private readonly controllers = new Set<AbortController>();
  constructor(
    private readonly options: {
      baseUrl: string;
      fetch: typeof fetch;
      acquireAccess: () => Promise<BrowserAccessLease>;
      readSession: () => Promise<BrowserSessionRecord | undefined>;
      monotonicNow?: () => number;
    },
  ) {}

  abortActive(): void {
    for (const controller of this.controllers) controller.abort();
    this.controllers.clear();
  }

  readonly fetch: typeof fetch = async (input, init) => {
    let request: Request;
    try {
      request = new Request(input, init);
    } catch {
      throw new BrowserApiError("unsupported_api");
    }
    if (!allowsBrowserApiRequest(this.options.baseUrl, request.url, request.method))
      throw new BrowserApiError("unsupported_api");
    const access = await this.options.acquireAccess();
    const current = await this.options.readSession();
    if (
      current?.phase !== "active" ||
      current.epoch !== access.epoch ||
      current.sessionId !== access.sessionId ||
      current.generation !== access.generation ||
      access.expiresAtMonotonic <= (this.options.monotonicNow ?? (() => performance.now()))()
    )
      throw new BrowserLoginRequiredError();
    const controller = new AbortController();
    const cancel = () => controller.abort();
    request.signal.addEventListener("abort", cancel, { once: true });
    if (request.signal.aborted) controller.abort();
    this.controllers.add(controller);
    const lifetime = request.headers.get("Accept")?.includes("text/event-stream")
      ? setTimeout(
          () => controller.abort(),
          Math.max(
            0,
            Math.min(900000, access.expiresAtMonotonic - (this.options.monotonicNow ?? (() => performance.now()))()),
          ),
        )
      : undefined;
    const release = () => {
      clearTimeout(lifetime);
      this.controllers.delete(controller);
      request.signal.removeEventListener("abort", cancel);
    };
    const headers = new Headers(request.headers);
    headers.delete("Cookie");
    headers.set("Authorization", `Bearer ${access.token}`);
    let response: Response;
    try {
      response = await this.options.fetch(
        new Request(request, { headers, credentials: "omit", redirect: "error", signal: controller.signal }),
      );
    } catch {
      release();
      throw new BrowserApiError("result_unknown");
    }
    if (!response.ok) {
      let code: string | undefined;
      const header = response.headers.get("X-Request-ID");
      const requestId = header && /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu.test(header) ? header : undefined;
      try {
        const body = await response.json();
        const candidate = body?.error?.code ?? body?.code;
        if (
          typeof candidate === "string" &&
          /^[a-z][a-z_]{0,63}$/u.test(candidate) &&
          !/^(uat|urt|uac|uar)_/u.test(candidate)
        )
          code = candidate;
      } catch {
        /* HTTP status remains available even when its error body cannot be read. */
      }
      release();
      throw new BrowserApiError("http_error", response.status, code, requestId);
    }
    if (!response.body) {
      release();
      return response;
    }
    const reader = response.body.getReader();
    const body = new ReadableStream<Uint8Array>({
      async pull(stream) {
        try {
          const chunk = await reader.read();
          if (chunk.done) {
            release();
            stream.close();
          } else stream.enqueue(chunk.value);
        } catch {
          release();
          stream.error(new BrowserApiError("response_interrupted", response.status));
        }
      },
      async cancel() {
        try {
          await reader.cancel();
        } finally {
          release();
        }
      },
    });
    return new Response(body, { status: response.status, statusText: response.statusText, headers: response.headers });
  };
}
