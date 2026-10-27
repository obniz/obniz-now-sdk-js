import { browserSessionNamespace, normalizeBrowserBaseUrl } from "./environment";
import { createBrowserPkce, createBrowserRandomId } from "./pkce";
import { emptyBrowserSession } from "./session";
import { BrowserSessionStorage, BrowserStorageError } from "./storage";

export interface BrowserLoginAttempt {
  epoch: string;
  attemptId: string;
  state: string;
  verifier: string;
  redirectUri: string;
  baseUrl: string;
  expiresAt: number;
}

export class BrowserSessionConflictError extends Error {
  readonly code = "session_conflict";
  constructor() {
    super("Finish the current browser session before starting login");
    this.name = "BrowserSessionConflictError";
  }
}

export function browserLoginAttemptKey(baseUrl: string): string {
  return `${browserSessionNamespace(baseUrl)}:login`;
}

export function normalizeBrowserCallbackUri(value: string, origin: string): string {
  try {
    if (
      typeof value !== "string" ||
      value.length > 2048 ||
      // eslint-disable-next-line no-control-regex -- Reject controls before the URL parser can normalize them.
      /[\u0000-\u0020\u007f\s\\#]/u.test(value) ||
      !/^https?:\/\//iu.test(value) ||
      /^https?:\/\/[^/?]*@/iu.test(value)
    )
      throw new Error();
    const url = new URL(value);
    if (
      url.origin !== origin ||
      normalizeBrowserBaseUrl(url.origin) !== origin ||
      url.href.length > 2048 ||
      ["code", "state", "error", "error_description", "error_uri"].some((key) => url.searchParams.has(key))
    )
      throw new Error();
    return url.href;
  } catch {
    throw new Error("Invalid browser callback URL");
  }
}

export async function startBrowserLogin(input: {
  storage: BrowserSessionStorage;
  sessionStorage: Pick<Storage, "setItem" | "getItem" | "removeItem">;
  crypto: Crypto;
  baseUrl: string;
  origin: string;
  redirectUri: string;
  navigate: (url: string) => void;
  now?: () => number;
  purpose?: "login" | "signup";
}): Promise<void> {
  const baseUrl = normalizeBrowserBaseUrl(input.baseUrl);
  const redirectUri = normalizeBrowserCallbackUri(input.redirectUri, input.origin);
  const now = input.now ?? Date.now;
  const pkce = await createBrowserPkce(input.crypto);
  const epoch = createBrowserRandomId(input.crypto);
  const attemptId = createBrowserRandomId(input.crypto);
  const attempt: BrowserLoginAttempt = {
    epoch,
    attemptId,
    state: pkce.state,
    verifier: pkce.verifier,
    redirectUri,
    baseUrl,
    expiresAt: now() + 600000,
  };
  const key = browserLoginAttemptKey(baseUrl);
  let sessionStorageFailed = false;
  let wroteAttempt = false;
  try {
    const claimed = await input.storage.update((current) => {
      if (
        current &&
        current.phase !== "empty" &&
        !(current.phase === "authorizing" && current.authorization!.expiresAt <= now())
      )
        return current;
      try {
        input.sessionStorage.setItem(key, JSON.stringify(attempt));
        wroteAttempt = true;
      } catch {
        sessionStorageFailed = true;
        return current ?? emptyBrowserSession(epoch);
      }
      return {
        schemaVersion: 1,
        epoch,
        revision: (current?.revision ?? -1) + 1,
        phase: "authorizing",
        authorization: { attemptId, expiresAt: attempt.expiresAt },
      };
    });
    if (sessionStorageFailed) throw new BrowserStorageError("storage_unavailable");
    if (claimed.epoch !== epoch || claimed.phase !== "authorizing") throw new BrowserSessionConflictError();
    const url = new URL(`${baseUrl}/oauth/authorize`);
    url.search = new URLSearchParams({
      response_type: "code",
      client_origin: input.origin,
      redirect_uri: redirectUri,
      code_challenge: pkce.challenge,
      code_challenge_method: "S256",
      state: pkce.state,
    }).toString();
    if (input.purpose === "signup") url.searchParams.set("purpose", "signup");
    input.navigate(url.href);
  } catch (error) {
    if (wroteAttempt) {
      try {
        if (JSON.parse(input.sessionStorage.getItem(key) ?? "null")?.epoch === epoch)
          input.sessionStorage.removeItem(key);
      } catch {
        /* Storage failure must not expose attempt contents through the thrown error. */
      }
      try {
        await input.storage.update((current) =>
          current?.phase === "authorizing" && current.epoch === epoch
            ? emptyBrowserSession(epoch, current.revision + 1)
            : (current ?? emptyBrowserSession(epoch)),
        );
      } catch {
        /* The caller receives the original failure; an unavailable database cannot be repaired here. */
      }
    }
    throw error;
  }
}
