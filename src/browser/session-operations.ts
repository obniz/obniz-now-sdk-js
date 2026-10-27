import { BrowserSessionStorage } from "./storage";
import { BrowserAuthTransportError, BrowserTokenTransport } from "./token-transport";
import {
  applyBrowserSessionRefresh,
  beginBrowserSessionLogout,
  emptyBrowserSession,
  finishBrowserSessionLogout,
  matchesBrowserRefreshAttempt,
  prepareBrowserSessionRefresh,
  requireBrowserSessionLogin,
} from "./session";

export class BrowserLoginRequiredError extends Error {
  readonly code = "login_required";
  constructor() {
    super("Browser login required");
    this.name = "BrowserLoginRequiredError";
  }
}

export interface BrowserAccessLease {
  token: string;
  epoch: string;
  sessionId: string;
  generation: number;
  expiresAtMonotonic: number;
}

export async function refreshBrowserSession(
  storage: BrowserSessionStorage,
  transport: Pick<BrowserTokenTransport, "refresh">,
  randomId: () => string,
  monotonicNow: () => number = () => performance.now(),
): Promise<BrowserAccessLease> {
  return storage.withOperation(async () => {
    for (;;) {
      const attemptId = randomId();
      const sent = await storage.update((current) =>
        current?.phase === "active"
          ? prepareBrowserSessionRefresh(current, attemptId)
          : (current ?? emptyBrowserSession(randomId())),
      );
      if (sent.phase !== "active" || !sent.pendingRefresh) throw new BrowserLoginRequiredError();
      const started = monotonicNow();
      let reply;
      try {
        reply = await transport.refresh(sent.pendingRefresh.refreshToken, sent.pendingRefresh.attemptId);
      } catch (error) {
        let stillPending = false;
        const current = await storage.update((current) => {
          stillPending = !!current && matchesBrowserRefreshAttempt(current, sent);
          if (
            stillPending &&
            error instanceof BrowserAuthTransportError &&
            (error.status === 400 || error.status === 403)
          )
            return requireBrowserSessionLogin(current!, sent);
          return current ?? emptyBrowserSession(randomId());
        });
        if (!stillPending) {
          if (current.phase === "active") continue;
          throw new BrowserLoginRequiredError();
        }
        throw error;
      }
      const committed = await storage.update((current) =>
        current ? applyBrowserSessionRefresh(current, sent, reply) : emptyBrowserSession(randomId()),
      );
      const expiresAtMonotonic = started + reply.expires_in * 1000;
      if (
        committed.phase !== "active" ||
        committed.epoch !== sent.epoch ||
        committed.sessionId !== reply.session_id ||
        committed.generation !== reply.generation ||
        committed.refreshToken !== reply.refresh_token ||
        expiresAtMonotonic <= monotonicNow()
      )
        throw new BrowserLoginRequiredError();
      return {
        token: reply.access_token,
        epoch: committed.epoch,
        sessionId: reply.session_id,
        generation: reply.generation,
        expiresAtMonotonic,
      };
    }
  });
}

export async function stopBrowserSession(storage: BrowserSessionStorage, randomId: () => string): Promise<void> {
  await storage.update((current) =>
    current ? beginBrowserSessionLogout(current, randomId()) : emptyBrowserSession(randomId()),
  );
}

export async function revokeStoppedBrowserSession(
  storage: BrowserSessionStorage,
  transport: Pick<BrowserTokenTransport, "revoke">,
  randomId: () => string,
): Promise<"signed_out" | "logging_out"> {
  const stopped = await storage.read();
  if (!stopped || stopped.phase === "empty") return "signed_out";
  if (stopped.phase !== "logging_out" || !stopped.refreshToken) throw new BrowserLoginRequiredError();
  await transport.revoke(stopped.refreshToken);
  const committed = await storage.update((current) =>
    current ? finishBrowserSessionLogout(current, stopped) : emptyBrowserSession(randomId()),
  );
  return committed.phase === "empty" ? "signed_out" : "logging_out";
}
