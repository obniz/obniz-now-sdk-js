import { browserLoginAttemptKey, type BrowserLoginAttempt } from "./login";
import { normalizeBrowserBaseUrl } from "./environment";
import { consumeBrowserCallbackUrl } from "./pkce";
import { emptyBrowserSession } from "./session";
import { BrowserSessionStorage, BrowserStorageError } from "./storage";
import type { BrowserTokenTransport } from "./token-transport";
import { BrowserLoginRequiredError, type BrowserAccessLease } from "./session-operations";

export class BrowserAuthorizationDeniedError extends Error {
  readonly code = "access_denied";
  constructor(readonly reason: "signup_cancelled" | "no_available_account" | "unspecified" = "unspecified") {
    super("Browser authorization was denied");
    this.name = "BrowserAuthorizationDeniedError";
  }
}

export async function drainBrowserRevocations(
  storage: BrowserSessionStorage,
  transport: Pick<BrowserTokenTransport, "revoke">,
): Promise<void> {
  for (const pending of await storage.listPendingRevocations()) {
    await transport.revoke(pending.token);
    await storage.acknowledgeRevocation(pending.sessionId, pending.token);
  }
}

export async function completeBrowserCallback(input: {
  storage: BrowserSessionStorage;
  transport: Pick<BrowserTokenTransport, "exchange" | "revoke">;
  sessionStorage: Pick<Storage, "getItem" | "removeItem">;
  location: Pick<Location, "href">;
  history: Pick<History, "state" | "replaceState">;
  baseUrl: string;
  now?: () => number;
  monotonicNow?: () => number;
}): Promise<BrowserAccessLease> {
  const baseUrl = normalizeBrowserBaseUrl(input.baseUrl);
  const key = browserLoginAttemptKey(baseUrl);
  let attempt: BrowserLoginAttempt | undefined;
  let completed = false;
  let exchangeStarted = false;
  const now = input.now ?? Date.now;
  const monotonicNow = input.monotonicNow ?? (() => performance.now());
  try {
    let callback: ReturnType<typeof consumeBrowserCallbackUrl>;
    try {
      callback = consumeBrowserCallbackUrl(input.location, input.history);
    } catch {
      throw new BrowserStorageError("storage_unavailable");
    }
    try {
      attempt = JSON.parse(input.sessionStorage.getItem(key) ?? "null") ?? undefined;
    } catch {
      throw new BrowserStorageError("storage_unavailable");
    }
    if (
      !attempt ||
      attempt.baseUrl !== baseUrl ||
      typeof attempt.epoch !== "string" ||
      typeof attempt.attemptId !== "string" ||
      typeof attempt.verifier !== "string" ||
      !/^[A-Za-z0-9_-]{43}$/u.test(attempt.verifier) ||
      !Number.isFinite(attempt.expiresAt) ||
      attempt.expiresAt <= now() ||
      callback.duplicate ||
      (callback.error !== null ? callback.error !== "access_denied" || callback.code !== null : !callback.code || callback.description !== null || callback.errorUri !== null) ||
      callback.state !== attempt.state
    )
      throw new BrowserLoginRequiredError();
    const cleaned = new URL(input.location.href);
    for (const key of ["code", "state", "error", "error_description", "error_uri"]) cleaned.searchParams.delete(key);
    if (cleaned.href !== attempt.redirectUri) throw new BrowserLoginRequiredError();
    const expected = attempt;
    return await input.storage.withOperation(async () => {
      const current = await input.storage.read();
      if (
        current?.phase !== "authorizing" ||
        current.epoch !== expected.epoch ||
        current.authorization?.attemptId !== expected.attemptId ||
        current.authorization.expiresAt <= now()
      )
        throw new BrowserLoginRequiredError();
      if (callback.error === "access_denied") throw new BrowserAuthorizationDeniedError(
        callback.description === "signup_cancelled" || callback.description === "no_available_account" ? callback.description : "unspecified",
      );
      const started = monotonicNow();
      exchangeStarted = true;
      const reply = await input.transport.exchange(callback.code!, expected.redirectUri, expected.verifier);
      let accepted: boolean;
      try {
        accepted = await input.storage.commitAuthorization(expected.epoch, expected.attemptId, reply, now);
      } catch (error) {
        try {
          await input.transport.revoke(reply.refresh_token);
        } catch {
          /* Storage failure leaves only this in-memory proof available for best-effort revocation. */
        }
        throw error;
      }
      if (!accepted) {
        try {
          await drainBrowserRevocations(input.storage, input.transport);
        } catch {
          /* The durable queue is retried by the browser lifecycle. */
        }
        throw new BrowserLoginRequiredError();
      }
      completed = true;
      return {
        token: reply.access_token,
        epoch: expected.epoch,
        sessionId: reply.session_id,
        generation: reply.generation,
        expiresAtMonotonic: started + reply.expires_in * 1000,
      };
    });
  } finally {
    if (!attempt) {
      try {
        attempt = JSON.parse(input.sessionStorage.getItem(key) ?? "null") ?? undefined;
      } catch {
        /* URL cleanup can fail before the attempt is read; malformed storage cannot identify a claim to cancel. */
      }
    }
    let cleanupFailed = false;
    try {
      input.sessionStorage.removeItem(key);
    } catch {
      cleanupFailed = true;
    }
    try {
      if (!completed && typeof attempt?.epoch === "string" && attempt.epoch) {
        await input.storage.update((current) =>
          current?.phase === "authorizing" &&
          current.epoch === attempt!.epoch &&
          current.authorization?.attemptId === attempt!.attemptId
            ? {
                ...emptyBrowserSession(current.epoch, current.revision + 1),
                phase: exchangeStarted ? "login_required" : "empty",
              }
            : (current ?? emptyBrowserSession(attempt!.epoch)),
        );
      }
    } finally {
      // An uncleared credential must surface as a storage failure even when authorization was denied.
      // eslint-disable-next-line no-unsafe-finally
      if (cleanupFailed) throw new BrowserStorageError("storage_unavailable");
    }
  }
}
