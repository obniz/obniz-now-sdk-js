import { BrowserApiError, BrowserAuthenticatedFetch } from "./authenticated-fetch";
import {
  createUnitStateSubscription,
  type UnitStateSubscriptionFilter,
  type UnitStateSubscriptionEvent,
  type UnitStateSubscriptionHandle,
  type UnitStateSubscriptionOptions,
} from "../unitStateSubscription";
import { createBrowserApis } from "./apis";
import { BrowserAuthorizationDeniedError, completeBrowserCallback, drainBrowserRevocations } from "./callback";
import { browserSessionNamespace, normalizeBrowserBaseUrl } from "./environment";
import { browserLoginAttemptKey, BrowserSessionConflictError, startBrowserLogin } from "./login";
import { createBrowserRandomId } from "./pkce";
import {
  BrowserLoginRequiredError,
  refreshBrowserSession,
  revokeStoppedBrowserSession,
  stopBrowserSession,
  type BrowserAccessLease,
} from "./session-operations";
import { emptyBrowserSession, type BrowserSessionRecord } from "./session";
import { BrowserSessionStorage, BrowserStorageError } from "./storage";
import { BrowserTokenTransport } from "./token-transport";

export type BrowserAuthState = "signed_out" | "authorizing" | "active" | "logging_out" | "login_required";
export interface BrowserClientOptions {
  baseUrl: string;
  onAuthStateChanged?: (state: BrowserAuthState) => void;
  onError?: (error: Error) => void;
}

export class BrowserSessionClient {
  readonly api: ReturnType<typeof createBrowserApis>;
  private access?: BrowserAccessLease;
  private refreshing?: Promise<BrowserAccessLease>;
  private revoking?: Promise<void>;
  private stopping?: Promise<void>;
  private retryTimer?: ReturnType<typeof setTimeout>;
  private authorizationTimer?: ReturnType<typeof setTimeout>;
  private retryDelay = 1000;
  private disposed = false;
  private failed = false;
  private state?: BrowserAuthState;
  private snapshot?: Pick<BrowserSessionRecord, "phase" | "revision" | "sessionId">;
  private channel?: BroadcastChannel;
  private readonly transport: BrowserTokenTransport;
  private readonly requests: BrowserAuthenticatedFetch;
  private readonly subscriptions = new Set<UnitStateSubscriptionHandle>();
  private readonly reportedErrors = new WeakSet<Error>();
  private constructor(
    private readonly options: BrowserClientOptions,
    private readonly storage: BrowserSessionStorage,
    private readonly environment: Window & typeof globalThis,
  ) {
    this.transport = new BrowserTokenTransport(options.baseUrl, environment.fetch.bind(environment));
    this.api = createBrowserApis(options.baseUrl, this.fetch);
    this.requests = new BrowserAuthenticatedFetch({
      baseUrl: options.baseUrl,
      fetch: environment.fetch.bind(environment),
      acquireAccess: () => this.acquireAccess(),
      readSession: async () => {
        const current = await this.synchronize();
        if (this.stopping) throw new BrowserLoginRequiredError();
        return current;
      },
    });
    if (typeof environment.BroadcastChannel === "function") {
      this.channel = new environment.BroadcastChannel(browserSessionNamespace(options.baseUrl));
      this.channel.onmessage = () => {
        void this.resume(false).catch((error) => this.report(error));
      };
    }
    environment.addEventListener("online", this.onResume);
    environment.addEventListener("pageshow", this.onResume);
    environment.document.addEventListener("visibilitychange", this.onResume);
  }

  static async create(options: BrowserClientOptions): Promise<BrowserSessionClient> {
    if (
      typeof window === "undefined" ||
      !window.isSecureContext ||
      !window.indexedDB ||
      !window.navigator.locks ||
      !window.crypto?.subtle ||
      !window.fetch ||
      !window.ReadableStream
    )
      throw new BrowserStorageError("unsupported_browser");
    const baseUrl = normalizeBrowserBaseUrl(options.baseUrl);
    const storage = await BrowserSessionStorage.open(
      window.indexedDB,
      window.navigator.locks,
      browserSessionNamespace(baseUrl),
    );
    const client = new BrowserSessionClient({ ...options, baseUrl }, storage, window);
    try {
      const query = new URL(window.location.href).searchParams;
      if (["code", "state", "error"].some((key) => query.has(key))) await client.completeCallback();
      else await client.resume();
      return client;
    } catch (error) {
      client.dispose();
      throw error;
    }
  }

  readonly fetch: typeof fetch = async (input, init) => {
    this.assertAvailable();
    try {
      return await this.requests.fetch(input, init);
    } catch (error) {
      this.report(error);
      throw error;
    }
  };

  subscribeUnitStates(
    filter: UnitStateSubscriptionFilter,
    callback: (event: UnitStateSubscriptionEvent) => void,
    options?: UnitStateSubscriptionOptions,
  ): UnitStateSubscriptionHandle {
    this.assertAvailable();
    const subscription = createUnitStateSubscription(
      {
        baseUrl: this.options.baseUrl,
        fetchApi: this.fetch,
        classifyFetchError: (error) =>
          Object.assign(new Error("Browser subscription request failed"), {
            kind:
              error instanceof BrowserApiError && error.kind === "http_error"
                ? ("http" as const)
                : ("transport" as const),
            retryable: error instanceof BrowserApiError && error.kind === "result_unknown",
            ...(error instanceof BrowserApiError && error.status !== undefined ? { status: error.status } : {}),
          }),
        shouldRetry: (error) => error.kind === "transport" && error.retryable,
      },
      filter,
      callback,
      options,
    );
    const handle = {
      close: () => {
        subscription.close();
        this.subscriptions.delete(handle);
      },
    };
    this.subscriptions.add(handle);
    return handle;
  }

  private stopSubscriptions(): void {
    for (const subscription of this.subscriptions) subscription.close();
    this.subscriptions.clear();
  }

  async startLogin(redirectUri: string): Promise<void> {
    return this.startAuthorization(redirectUri, "login");
  }

  async startSignup(redirectUri: string): Promise<void> {
    return this.startAuthorization(redirectUri, "signup");
  }

  private async startAuthorization(redirectUri: string, purpose: "login" | "signup"): Promise<void> {
    try {
      this.assertAvailable();
      const current = await this.synchronize();
      if (this.stopping) throw new BrowserSessionConflictError();
      if (current?.phase === "login_required") {
        const stopped = await this.logout();
        if (stopped !== "signed_out") throw new BrowserLoginRequiredError();
      }
      await startBrowserLogin({
        storage: this.storage,
        sessionStorage: this.environment.sessionStorage,
        crypto: this.environment.crypto,
        baseUrl: this.options.baseUrl,
        origin: this.environment.location.origin,
        redirectUri,
        purpose,
        navigate: (url) => {
          this.broadcast();
          this.environment.location.assign(url);
        },
      });
    } catch (error) {
      this.report(error);
      throw error;
    }
  }

  async completeCallback(): Promise<void> {
    this.assertAvailable();
    try {
      this.access = await completeBrowserCallback({
        storage: this.storage,
        transport: this.transport,
        sessionStorage: this.environment.sessionStorage,
        location: this.environment.location,
        history: this.environment.history,
        baseUrl: this.options.baseUrl,
      });
      await this.synchronize();
    } catch (error) {
      if (error instanceof BrowserAuthorizationDeniedError) {
        await this.synchronize();
        this.report(error);
        return;
      }
      this.report(error);
      throw error;
    } finally {
      this.broadcast();
    }
  }

  async logout(): Promise<"signed_out" | "logging_out"> {
    try {
      this.assertAvailable();
      if (!this.stopping) {
        this.stopSubscriptions();
        this.access = undefined;
        this.requests.abortActive();
        // The call deadline must include storage/lock waits; the queued logout intent still runs after it returns.
        this.stopping = (async () => {
          await stopBrowserSession(this.storage, this.randomId);
          this.broadcast();
          await this.synchronize();
          await this.runRevocations();
        })()
          .catch((error) => {
            this.report(error);
            throw error;
          })
          .finally(() => {
            this.stopping = undefined;
          });
      }
      let timer: ReturnType<typeof setTimeout> | undefined;
      try {
        return await Promise.race([
          this.stopping.then(() => (this.state === "signed_out" ? ("signed_out" as const) : ("logging_out" as const))),
          new Promise<"logging_out">((resolve) => {
            timer = setTimeout(() => resolve("logging_out"), 10000);
          }),
        ]);
      } finally {
        clearTimeout(timer);
      }
    } catch (error) {
      this.report(error);
      throw error;
    }
  }

  dispose(): void {
    this.stopSubscriptions();
    this.disposed = true;
    this.access = undefined;
    clearTimeout(this.retryTimer);
    clearTimeout(this.authorizationTimer);
    this.requests.abortActive();
    this.channel?.close();
    this.environment.removeEventListener("online", this.onResume);
    this.environment.removeEventListener("pageshow", this.onResume);
    this.environment.document.removeEventListener("visibilitychange", this.onResume);
    this.storage.close();
  }

  private readonly randomId = () => createBrowserRandomId(this.environment.crypto);
  private readonly onResume = () => {
    if (!this.environment.document.hidden) void this.resume().catch((error) => this.report(error));
  };
  private assertAvailable(): void {
    if (this.disposed || this.failed) throw new BrowserStorageError("storage_unavailable");
  }
  private report(error: unknown): void {
    if (error instanceof BrowserStorageError) {
      this.stopSubscriptions();
      this.failed = true;
      this.access = undefined;
      this.requests.abortActive();
      clearTimeout(this.retryTimer);
      clearTimeout(this.authorizationTimer);
    }
    if (error instanceof Error) {
      if (this.reportedErrors.has(error)) return;
      this.reportedErrors.add(error);
    }
    try {
      this.options.onError?.(error instanceof Error ? error : new Error("Browser session failed"));
    } catch {
      /* Observer failures must not alter authentication state. */
    }
  }
  private broadcast(): void {
    if (this.disposed) return;
    this.channel?.postMessage(this.snapshot ?? { phase: "empty", revision: 0 });
  }
  private async synchronize(): Promise<BrowserSessionRecord | undefined> {
    this.assertAvailable();
    let current: BrowserSessionRecord | undefined;
    let expiredAttempt: string | undefined;
    try {
      current = await this.storage.read();
      if (current?.phase === "authorizing" && current.authorization!.expiresAt <= Date.now()) {
        current = await this.storage.update((latest) => {
          if (latest?.phase !== "authorizing" || latest.authorization!.expiresAt > Date.now())
            return latest ?? emptyBrowserSession(this.randomId());
          expiredAttempt = latest.authorization!.attemptId;
          return { ...emptyBrowserSession(this.randomId(), latest.revision + 1), phase: "login_required" };
        });
        if (expiredAttempt) {
          const key = browserLoginAttemptKey(this.options.baseUrl);
          try {
            const saved = this.environment.sessionStorage.getItem(key);
            if (saved && JSON.parse(saved).attemptId === expiredAttempt) this.environment.sessionStorage.removeItem(key);
          } catch { throw new BrowserStorageError("storage_unavailable"); }
        }
      }
    } catch (error) {
      this.report(error);
      throw error;
    }
    clearTimeout(this.authorizationTimer);
    if (current?.phase === "authorizing") {
      this.authorizationTimer = setTimeout(() => {
        void this.resume(false).catch((error) => this.report(error));
      }, Math.max(0, Math.min(2147483647, current.authorization!.expiresAt - Date.now())));
    }
    if (
      this.stopping ||
      current?.phase !== "active" ||
      current.epoch !== this.access?.epoch ||
      current.sessionId !== this.access?.sessionId ||
      current.generation !== this.access?.generation
    )
      this.access = undefined;
    if (current?.phase !== "active") {
      this.stopSubscriptions();
      this.requests.abortActive();
    }
    this.snapshot = current
      ? { phase: current.phase, revision: current.revision, sessionId: current.sessionId }
      : undefined;
    const state = current?.phase === "empty" || !current ? "signed_out" : current.phase;
    if (this.state !== state) {
      this.state = state;
      try {
        this.options.onAuthStateChanged?.(state);
      } catch {
        /* Observers cannot prevent state adoption. */
      }
    }
    if (expiredAttempt) {
      this.broadcast();
      this.report(new BrowserLoginRequiredError());
    }
    return current;
  }
  private async acquireAccess(): Promise<BrowserAccessLease> {
    if (this.stopping) throw new BrowserLoginRequiredError();
    const current = await this.synchronize();
    if (this.stopping || current?.phase !== "active") throw new BrowserLoginRequiredError();
    if (this.access && this.access.expiresAtMonotonic > performance.now() + 30000) return this.access;
    if (!this.refreshing) {
      this.refreshing = refreshBrowserSession(this.storage, this.transport, this.randomId)
        .then(async (access) => {
          this.access = access;
          await this.synchronize();
          if (!this.access) throw new BrowserLoginRequiredError();
          return this.access;
        })
        .catch(async (error) => {
          await this.synchronize();
          throw error;
        })
        .finally(() => {
          this.refreshing = undefined;
          this.broadcast();
        });
    }
    return this.refreshing;
  }
  private async resume(restoreAccess = true): Promise<void> {
    if (this.disposed || this.failed || this.stopping) return;
    const current = await this.synchronize();
    if (current?.phase === "logging_out" || (await this.storage.listPendingRevocations()).length)
      void this.runRevocations();
    else if (restoreAccess && current?.phase === "active" && this.environment.navigator.onLine)
      await this.acquireAccess();
  }
  private runRevocations(): Promise<void> {
    if (this.revoking) return this.revoking;
    if (this.disposed || this.failed || !this.environment.navigator.onLine) return Promise.resolve();
    clearTimeout(this.retryTimer);
    this.revoking = this.storage
      .withOperation(async () => {
        const current = await this.storage.read();
        if (current?.phase === "logging_out")
          await revokeStoppedBrowserSession(this.storage, this.transport, this.randomId);
        await drainBrowserRevocations(this.storage, this.transport);
        this.retryDelay = 1000;
        await this.synchronize();
        this.broadcast();
      })
      .catch((error) => {
        this.report(error);
        if (!this.failed && !this.disposed) {
          const delay = this.retryDelay * (0.8 + Math.random() * 0.2);
          this.retryDelay = Math.min(30000, this.retryDelay * 2);
          this.retryTimer = setTimeout(() => {
            void this.runRevocations();
          }, delay);
        }
      })
      .finally(() => {
        this.revoking = undefined;
      });
    return this.revoking;
  }
}
