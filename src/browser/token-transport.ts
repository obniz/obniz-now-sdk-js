import { normalizeBrowserBaseUrl } from "./environment";
import type { BrowserTokenReply } from "./session";

export class BrowserAuthTransportError extends Error {
  constructor(
    public readonly kind: "result_unknown" | "http_error" | "invalid_response",
    public readonly status?: number,
    public readonly serverCode?: string,
    public readonly requestId?: string,
  ) {
    super(kind === "result_unknown" ? "No authentication response received" : "Authentication request failed");
    this.name = "BrowserAuthTransportError";
  }
}

const serverCodes = new Set([
  "invalid_request",
  "invalid_grant",
  "unsupported_grant_type",
  "server_error",
  "refresh_recovery_expired",
  "refresh_recovery_superseded",
]);

function parseTokenReply(value: unknown): BrowserTokenReply {
  const reply = value as BrowserTokenReply;
  if (
    !reply ||
    typeof reply !== "object" ||
    reply.token_type !== "Bearer" ||
    reply.scope !== "now:user" ||
    typeof reply.access_token !== "string" ||
    !/^uat_[A-Za-z0-9_-]{42}[AEIMQUYcgkosw048]$/u.test(reply.access_token) ||
    typeof reply.refresh_token !== "string" ||
    !/^urt_[A-Za-z0-9_-]{42}[AEIMQUYcgkosw048]$/u.test(reply.refresh_token) ||
    !Number.isInteger(reply.expires_in) ||
    reply.expires_in < 0 ||
    reply.expires_in > 900 ||
    !Number.isSafeInteger(reply.generation) ||
    reply.generation < 0 ||
    typeof reply.session_id !== "string" ||
    !/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu.test(reply.session_id) ||
    typeof reply.user_id !== "string" ||
    reply.user_id.length === 0 ||
    reply.user_id.length > 256 ||
    // eslint-disable-next-line no-control-regex -- Reject control characters in server-provided identities.
    /[\u0000-\u0020\u007f]/u.test(reply.user_id) ||
    typeof reply.account_id !== "string" ||
    reply.account_id.length === 0 ||
    reply.account_id.length > 256 ||
    // eslint-disable-next-line no-control-regex -- Apply the same identity validation to Account IDs.
    /[\u0000-\u0020\u007f]/u.test(reply.account_id) ||
    typeof reply.refresh_expires_at !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(reply.refresh_expires_at) ||
    !Number.isFinite(Date.parse(reply.refresh_expires_at))
  )
    throw new BrowserAuthTransportError("invalid_response", 200);
  return {
    access_token: reply.access_token,
    token_type: "Bearer",
    expires_in: reply.expires_in,
    refresh_token: reply.refresh_token,
    refresh_expires_at: reply.refresh_expires_at,
    scope: "now:user",
    session_id: reply.session_id,
    user_id: reply.user_id,
    account_id: reply.account_id,
    generation: reply.generation,
  };
}

export class BrowserTokenTransport {
  private readonly baseUrl: string;
  constructor(
    baseUrl: string,
    private readonly fetchApi: typeof fetch,
  ) {
    this.baseUrl = normalizeBrowserBaseUrl(baseUrl);
  }

  async exchange(code: string, redirectUri: string, verifier: string): Promise<BrowserTokenReply> {
    return parseTokenReply(
      await this.post("token", {
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      }),
    );
  }

  async refresh(refreshToken: string, attemptId: string): Promise<BrowserTokenReply> {
    return parseTokenReply(
      await this.post("token", {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        refresh_attempt_id: attemptId,
      }),
    );
  }

  async revoke(token: string): Promise<void> {
    await this.post("revoke", { token, token_type_hint: "refresh_token" });
  }

  private async post(endpoint: "token" | "revoke", fields: Record<string, string>): Promise<unknown> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let response: Response | undefined;
    try {
      response = await this.fetchApi(`${this.baseUrl}/oauth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fields),
        credentials: "omit",
        redirect: "error",
        cache: "no-store",
        signal: controller.signal,
      });
      const header = response.headers.get("X-Request-ID");
      const requestId = header && /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu.test(header) ? header : undefined;
      if (response.status !== 200) {
        let code: string | undefined;
        try {
          const payload = await response.json();
          const candidate = payload?.error_code ?? payload?.error;
          if (typeof candidate === "string" && serverCodes.has(candidate)) code = candidate;
        } catch {
          /* An unreadable error body does not erase a received HTTP status. */
        }
        throw new BrowserAuthTransportError("http_error", response.status, code, requestId);
      }
      if (endpoint === "revoke") return undefined;
      return await response.json();
    } catch (error) {
      if (error instanceof BrowserAuthTransportError) throw error;
      throw new BrowserAuthTransportError(response ? "invalid_response" : "result_unknown", response?.status);
    } finally {
      clearTimeout(timeout);
    }
  }
}
