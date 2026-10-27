import type { BrowserSessionRecord, BrowserTokenReply } from "./session";

export class BrowserStorageError extends Error {
  constructor(public readonly code: "unsupported_browser" | "storage_unavailable") {
    super(
      code === "unsupported_browser"
        ? "Browser session storage is unsupported"
        : "Browser session storage is unavailable",
    );
    this.name = "BrowserStorageError";
  }
}

export interface BrowserLockProvider {
  request<T>(name: string, callback: () => T | PromiseLike<T>): Promise<T>;
}

const recordFields = new Set([
  "schemaVersion",
  "epoch",
  "revision",
  "phase",
  "sessionId",
  "userId",
  "accountId",
  "refreshToken",
  "generation",
  "absoluteExpiresAt",
  "pendingRefresh",
  "authorization",
]);

function validateRecord(value: unknown): BrowserSessionRecord | undefined {
  if (value === undefined) return undefined;
  const record = value as BrowserSessionRecord;
  if (
    !record ||
    typeof record !== "object" ||
    Object.keys(record).some((key) => !recordFields.has(key)) ||
    record.schemaVersion !== 1 ||
    typeof record.epoch !== "string" ||
    !record.epoch ||
    !Number.isSafeInteger(record.revision) ||
    record.revision < 0 ||
    !["empty", "authorizing", "active", "logging_out", "login_required"].includes(record.phase)
  )
    throw new BrowserStorageError("storage_unavailable");
  const invalid = () => {
    throw new BrowserStorageError("storage_unavailable");
  };
  for (const field of ["sessionId", "userId", "accountId", "refreshToken", "absoluteExpiresAt"] as const)
    if (record[field] !== undefined && (typeof record[field] !== "string" || !record[field])) invalid();
  if (record.generation !== undefined && (!Number.isSafeInteger(record.generation) || record.generation < 0)) invalid();
  if (
    (["active", "logging_out"].includes(record.phase) ||
      (record.phase === "login_required" && record.refreshToken !== undefined)) &&
    (!record.sessionId ||
      !record.refreshToken ||
      record.generation === undefined ||
      !record.absoluteExpiresAt ||
      !Number.isFinite(Date.parse(record.absoluteExpiresAt)))
  )
    invalid();
  if (record.pendingRefresh !== undefined) {
    const pending = record.pendingRefresh;
    if (
      !pending ||
      typeof pending !== "object" ||
      Object.keys(pending).some((key) => !["attemptId", "refreshToken"].includes(key)) ||
      typeof pending.attemptId !== "string" ||
      !pending.attemptId ||
      pending.refreshToken !== record.refreshToken
    )
      invalid();
  }
  if (record.authorization !== undefined) {
    const authorization = record.authorization;
    if (
      !authorization ||
      typeof authorization !== "object" ||
      Object.keys(authorization).some((key) => !["attemptId", "expiresAt"].includes(key)) ||
      typeof authorization.attemptId !== "string" ||
      !authorization.attemptId ||
      !Number.isFinite(authorization.expiresAt)
    )
      invalid();
  }
  if (
    (record.phase === "empty" || (record.phase === "login_required" && record.refreshToken === undefined)) &&
    Object.keys(record).some((key) => !["schemaVersion", "epoch", "revision", "phase"].includes(key))
  )
    invalid();
  if (record.phase === "authorizing" && (!record.authorization || record.refreshToken || record.pendingRefresh))
    invalid();
  return record;
}

export class BrowserSessionStorage {
  private closed = false;
  private constructor(
    private readonly database: IDBDatabase,
    private readonly locks: BrowserLockProvider,
    private readonly namespace: string,
  ) {
    database.onversionchange = () => this.close();
    database.onclose = () => {
      this.closed = true;
    };
  }

  static async open(
    indexedDB: IDBFactory,
    locks: BrowserLockProvider,
    namespace: string,
  ): Promise<BrowserSessionStorage> {
    let storage: BrowserSessionStorage | undefined;
    try {
      if (!indexedDB?.open || !locks?.request) throw new Error("Missing browser API");
      const database = await new Promise<IDBDatabase>((resolve, reject) => {
        let settled = false;
        const request = indexedDB.open(namespace, 1);
        const timer = setTimeout(() => {
          settled = true;
          reject(new Error("Storage timeout"));
        }, 5000);
        request.onupgradeneeded = () => {
          request.result.createObjectStore("session");
          request.result.createObjectStore("probe");
        };
        request.onsuccess = () => {
          clearTimeout(timer);
          if (settled) request.result.close();
          else {
            settled = true;
            resolve(request.result);
          }
        };
        request.onerror = request.onblocked = () => {
          clearTimeout(timer);
          settled = true;
          reject(new Error("Storage open failed"));
        };
      });
      storage = new BrowserSessionStorage(database, locks, namespace);
      await locks.request(`${namespace}:state`, () =>
        storage!.transaction("probe", "readwrite", (store) => {
          store.put("available", "probe");
          store.delete("probe");
        }),
      );
      return storage;
    } catch {
      storage?.close();
      throw new BrowserStorageError("unsupported_browser");
    }
  }

  close(): void {
    this.closed = true;
    this.database.close();
  }

  async commitAuthorization(
    epoch: string,
    attemptId: string,
    reply: BrowserTokenReply,
    now: () => number,
  ): Promise<boolean> {
    return this.locks.request(`${this.namespace}:state`, () =>
      this.transaction<boolean>("session", "readwrite", (store, publish, fail) => {
        const request = store.get("current");
        request.onsuccess = () => {
          try {
            const current = validateRecord(request.result);
            if (
              current?.phase !== "authorizing" ||
              current.epoch !== epoch ||
              current.authorization?.attemptId !== attemptId ||
              current.authorization.expiresAt <= now()
            ) {
              store.put(reply.refresh_token, `revoke:${reply.session_id}`);
              publish(false);
              return;
            }
            const next = validateRecord({
              schemaVersion: 1,
              epoch,
              revision: current.revision + 1,
              phase: "active",
              sessionId: reply.session_id,
              userId: reply.user_id,
              accountId: reply.account_id,
              generation: reply.generation,
              refreshToken: reply.refresh_token,
              absoluteExpiresAt: reply.refresh_expires_at,
            });
            store.put(next, "current");
            publish(true);
          } catch {
            fail();
          }
        };
      }),
    );
  }

  async listPendingRevocations(): Promise<Array<{ sessionId: string; token: string }>> {
    return this.transaction("session", "readonly", (store, publish, fail) => {
      const pending: Array<{ sessionId: string; token: string }> = [];
      const cursor = store.openCursor();
      cursor.onsuccess = () => {
        const row = cursor.result;
        if (!row) {
          publish(pending);
          return;
        }
        if (typeof row.key === "string" && row.key.startsWith("revoke:")) {
          if (typeof row.value !== "string") {
            fail();
            return;
          }
          pending.push({ sessionId: row.key.slice(7), token: row.value });
        }
        row.continue();
      };
    });
  }

  async acknowledgeRevocation(sessionId: string, token: string): Promise<void> {
    return this.locks.request(`${this.namespace}:state`, () =>
      this.transaction("session", "readwrite", (store) => {
        const key = `revoke:${sessionId}`;
        const request = store.get(key);
        request.onsuccess = () => {
          if (request.result === token) store.delete(key);
        };
      }),
    );
  }

  withOperation<T>(operation: () => Promise<T>): Promise<T> {
    return this.locks.request(`${this.namespace}:operation`, operation);
  }

  async read(): Promise<BrowserSessionRecord | undefined> {
    return this.transaction("session", "readonly", (store, publish, fail) => {
      const request = store.get("current");
      request.onsuccess = () => {
        try {
          publish(validateRecord(request.result));
        } catch {
          fail();
        }
      };
    });
  }

  async update(
    change: (current: BrowserSessionRecord | undefined) => BrowserSessionRecord,
  ): Promise<BrowserSessionRecord> {
    return this.locks.request(`${this.namespace}:state`, () =>
      this.transaction<BrowserSessionRecord>("session", "readwrite", (store, publish, fail) => {
        const request = store.get("current");
        request.onsuccess = () => {
          try {
            const current = validateRecord(request.result);
            const next = validateRecord(change(current));
            if (!next || (current && next !== current && next.revision <= current.revision))
              throw new Error("Invalid revision");
            store.put(next, "current");
            publish(next);
          } catch {
            fail();
          }
        };
      }),
    );
  }

  private transaction<T = void>(
    name: string,
    mode: IDBTransactionMode,
    start: (store: IDBObjectStore, publish: (value: T) => void, fail: () => void) => void,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (this.closed) {
        reject(new BrowserStorageError("storage_unavailable"));
        return;
      }
      let transaction: IDBTransaction;
      try {
        transaction = this.database.transaction(name, mode);
      } catch {
        this.close();
        reject(new BrowserStorageError("storage_unavailable"));
        return;
      }
      let result: T;
      const fail = () => {
        clearTimeout(timer);
        try {
          transaction.abort();
        } catch {
          /* The transaction may already have aborted. */
        }
        this.close();
        reject(new BrowserStorageError("storage_unavailable"));
      };
      const timer = setTimeout(fail, 5000);
      transaction.onabort = transaction.onerror = fail;
      transaction.oncomplete = () => {
        clearTimeout(timer);
        resolve(result);
      };
      try {
        start(
          transaction.objectStore(name),
          (value) => {
            result = value;
          },
          fail,
        );
      } catch {
        fail();
      }
    });
  }
}
