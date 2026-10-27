export interface BrowserSessionRecord {
  schemaVersion: 1;
  epoch: string;
  revision: number;
  phase: "empty" | "authorizing" | "active" | "logging_out" | "login_required";
  sessionId?: string;
  userId?: string;
  accountId?: string;
  refreshToken?: string;
  generation?: number;
  absoluteExpiresAt?: string;
  pendingRefresh?: { attemptId: string; refreshToken: string };
  authorization?: { attemptId: string; expiresAt: number };
}

export interface BrowserTokenReply {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  refresh_token: string;
  refresh_expires_at: string;
  scope: "now:user";
  session_id: string;
  user_id: string;
  account_id: string;
  generation: number;
}

export function emptyBrowserSession(epoch: string, revision = 0): BrowserSessionRecord {
  return { schemaVersion: 1, epoch, revision, phase: "empty" };
}

export function beginBrowserSessionLogout(current: BrowserSessionRecord, cancelledEpoch: string): BrowserSessionRecord {
  if (current.phase === "empty" || current.phase === "logging_out") return current;
  if (!current.refreshToken) return emptyBrowserSession(cancelledEpoch, current.revision + 1);
  return { ...current, revision: current.revision + 1, phase: "logging_out", authorization: undefined };
}

export function prepareBrowserSessionRefresh(current: BrowserSessionRecord, attemptId: string): BrowserSessionRecord {
  if (current.phase !== "active" || !current.refreshToken) throw new Error("Browser login required");
  if (current.pendingRefresh) return current;
  return {
    ...current,
    revision: current.revision + 1,
    pendingRefresh: { attemptId, refreshToken: current.refreshToken },
  };
}

export function matchesBrowserRefreshAttempt(current: BrowserSessionRecord, sent: BrowserSessionRecord): boolean {
  return (
    current.phase === "active" &&
    current.epoch === sent.epoch &&
    current.sessionId === sent.sessionId &&
    current.generation === sent.generation &&
    current.pendingRefresh !== undefined &&
    sent.pendingRefresh !== undefined &&
    current.pendingRefresh.attemptId === sent.pendingRefresh.attemptId &&
    current.pendingRefresh.refreshToken === sent.pendingRefresh.refreshToken
  );
}

export function applyBrowserSessionRefresh(
  current: BrowserSessionRecord,
  sent: BrowserSessionRecord,
  reply: BrowserTokenReply,
): BrowserSessionRecord {
  if (!matchesBrowserRefreshAttempt(current, sent)) return current;
  if (
    reply.session_id !== current.sessionId ||
    (current.userId !== undefined && reply.user_id !== current.userId) ||
    (current.accountId !== undefined && reply.account_id !== current.accountId) ||
    reply.generation !== (current.generation ?? -1) + 1 ||
    reply.refresh_expires_at !== current.absoluteExpiresAt
  )
    throw new Error("Invalid browser token response");
  return {
    ...current,
    revision: current.revision + 1,
    refreshToken: reply.refresh_token,
    userId: reply.user_id,
    accountId: reply.account_id,
    generation: reply.generation,
    pendingRefresh: undefined,
  };
}

export function requireBrowserSessionLogin(
  current: BrowserSessionRecord,
  sent: BrowserSessionRecord,
): BrowserSessionRecord {
  if (!matchesBrowserRefreshAttempt(current, sent)) return current;
  return { ...current, revision: current.revision + 1, phase: "login_required", pendingRefresh: undefined };
}

export function finishBrowserSessionLogout(
  current: BrowserSessionRecord,
  revoked: BrowserSessionRecord,
): BrowserSessionRecord {
  if (
    current.phase !== "logging_out" ||
    current.epoch !== revoked.epoch ||
    current.sessionId !== revoked.sessionId ||
    current.refreshToken !== revoked.refreshToken
  )
    return current;
  return emptyBrowserSession(current.epoch, current.revision + 1);
}
