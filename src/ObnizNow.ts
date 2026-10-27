import {
  Configuration,
  AccountApi,
  AccountIntelligenceApi,
  AnalyticsApi,
  AuditLogsApi,
  ConnectionModelsApi,
  ConnectionsApi,
  ConvertersApi,
  CustomizesApi,
  EventsApi,
  FirmwareApi,
  GroupsApi,
  InboundConnectionsApi,
  InboundSourcesApi,
  IntegrationsApi,
  IntelligencesApi,
  InvitationsApi,
  IssuesApi,
  MachineApi,
  MachinesApi,
  NotificationHistoryApi,
  NotificationsApi,
  ObnizApi,
  ReportsApi,
  SessionApi,
  ThreadsApi,
  UnitsApi,
  UsersApi,
} from "./sdk-core";
import { wrapApiWithErrorHandling } from "./ObnizNowApiError";
import {
  createUnitStateSubscription,
  type UnitStateSubscriptionError,
  type UnitStateSubscriptionEvent,
  type UnitStateSubscriptionFilter,
  type UnitStateSubscriptionHandle,
  type UnitStateSubscriptionOptions,
} from "./unitStateSubscription";

// Internal use only
export interface CookieAuthOptions {
  token: string;
  accountId: string;
}

type BaseOptions = {
  baseUrl?: string;
  fetch?: typeof fetch;
};

type WithoutCookies = {
  token: string;
  cookies?: never;
};

type WithCookies = {
  cookies: CookieAuthOptions;
  token?: never;
};

type WithoutAuthentication = {
  token?: never;
  cookies?: never;
};

export type ObnizNowTokenOptions = BaseOptions & WithoutCookies;
export type ObnizNowCookiesOptions = BaseOptions & WithCookies;

export type ObnizNowOptions =
  (BaseOptions & WithoutCookies) | (BaseOptions & WithCookies) | (BaseOptions & WithoutAuthentication);

const ENVIRONMENT_CONFIGURATION_ERROR =
  "Either 'token' or 'cookies' must be provided; argumentless usage requires NOW_API_TOKEN and NOW_API_URL";

function nodeEnvironment(name: "NOW_API_TOKEN" | "NOW_API_URL"): string | undefined {
  const value = (
    globalThis as typeof globalThis & {
      process?: { env?: Partial<Record<"NOW_API_TOKEN" | "NOW_API_URL", string | undefined>> };
    }
  ).process?.env?.[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/**
 * ObnizNow SDK main class
 *
 * Provides access to all Obniz Now API endpoints.
 *
 * @example
 * ```typescript
 * import { ObnizNow } from '@obniz/obniz-now-sdk';
 *
 * // In a hosted Account Intelligence process, NOW_API_URL and
 * // the run-scoped NOW_API_TOKEN are read automatically.
 * const hostedClient = new ObnizNow();
 *
 * // Initialize with your API token
 * const client = new ObnizNow({
 *   token: 'your-api-token'
 * });
 *
 * // List machines
 * const machines = await client.machines.listMachines({ limit: 10 });
 *
 * // Get analytics results
 * const analytics = await client.analytics.getAnalyticsResults(
 *   'basic_statistics',
 *   'machine-123'
 * );
 * ```
 *
 * @example
 * ```typescript
 * // Custom base URL for local development
 * const devClient = new ObnizNow({
 *   token: 'your-token',
 *   baseUrl: 'http://localhost:8080'
 * });
 * ```
 */
export class ObnizNow {
  private readonly unitStateSubscriptionBaseUrl: string;
  private readonly unitStateSubscriptionFetch: typeof fetch | undefined;

  public readonly account: AccountApi;
  public readonly accountIntelligence: AccountIntelligenceApi;
  public readonly auditLogs: AuditLogsApi;
  public readonly customizes: CustomizesApi;
  public readonly firmware: FirmwareApi;
  public readonly invitations: InvitationsApi;
  public readonly notificationHistory: NotificationHistoryApi;
  public readonly obniz: ObnizApi;
  public readonly session: SessionApi;
  public readonly users: UsersApi;

  /** Analytics API - Execute and retrieve analytics results */
  public readonly analytics: AnalyticsApi;

  /** Connection Models API - Manage connection model configurations */
  public readonly connectionModels: ConnectionModelsApi;

  /** Connections API - Manage machine connections */
  public readonly connections: ConnectionsApi;

  /** Converters API - Data format conversions */
  public readonly converters: ConvertersApi;

  /** Events API - Access event data and history */
  public readonly events: EventsApi;

  /** Groups API - Organize machines into groups */
  public readonly groups: GroupsApi;

  /** Inbound Connections API - Manage inbound data connections */
  public readonly inboundConnections: InboundConnectionsApi;

  /** Inbound Sources API - Configure data sources */
  public readonly inboundSources: InboundSourcesApi;

  /** Integrations API - Manage third-party integrations */
  public readonly integrations: IntegrationsApi;

  /** Intelligences API - AI and intelligence features */
  public readonly intelligences: IntelligencesApi;

  /** Issues API - Track and manage issues */
  public readonly issues: IssuesApi;

  /** Machine API - Single machine operations */
  public readonly machine: MachineApi;

  /** Machines API - Machine management and operations */
  public readonly machines: MachinesApi;

  /** Notifications API - Manage notification settings */
  public readonly notifications: NotificationsApi;

  /** Reports API - Generate and retrieve reports */
  public readonly reports: ReportsApi;

  /** Threads API - Discussion threads and communications */
  public readonly threads: ThreadsApi;

  /** Units API - Unit data and state management */
  public readonly units: UnitsApi;

  public subscribeUnitStates(
    filter: UnitStateSubscriptionFilter,
    callback: (event: UnitStateSubscriptionEvent) => void,
    options?: UnitStateSubscriptionOptions,
  ): UnitStateSubscriptionHandle {
    return createUnitStateSubscription(
      { baseUrl: this.unitStateSubscriptionBaseUrl, fetchApi: this.unitStateSubscriptionFetch },
      filter,
      callback,
      options,
    );
  }

  /**
   * Creates a new ObnizNow SDK client instance
   *
   * @param options - Configuration options. When authentication is omitted, NOW_API_URL and NOW_API_TOKEN are used.
   * @param options.token - API authentication token (required unless cookies or environment authentication is used)
   * @param options.baseUrl - Base URL for API requests (optional, defaults to 'https://api.obniz.com')
   * @param options.fetch - Custom fetch implementation (optional, for Node.js < 18 or custom scenarios)
   *
   * @throws {Error} When neither explicit authentication nor the required environment values are available
   *
   * @example
   * ```typescript
   * const hostedClient = new ObnizNow();
   * const client = new ObnizNow({ token: 'your-api-token' });
   * ```
   */
  constructor(options: ObnizNowOptions = {}) {
    const hasExplicitToken = Object.prototype.hasOwnProperty.call(options, "token");
    const hasExplicitCookies = Object.prototype.hasOwnProperty.call(options, "cookies");
    const usesEnvironmentAuthentication = !hasExplicitToken && !hasExplicitCookies;
    const token = hasExplicitToken
      ? (options as ObnizNowTokenOptions).token
      : usesEnvironmentAuthentication
        ? nodeEnvironment("NOW_API_TOKEN")
        : undefined;
    const cookies = hasExplicitCookies ? (options as ObnizNowCookiesOptions).cookies : undefined;
    const environmentBaseUrl = usesEnvironmentAuthentication ? nodeEnvironment("NOW_API_URL") : undefined;
    const baseUrl = (options.baseUrl ?? environmentBaseUrl ?? "https://api.obniz.com").replace(/\/+$/u, "");
    const fetchApi = options.fetch || (typeof fetch !== "undefined" ? fetch : undefined);

    if (!token && !cookies) {
      throw new Error(ENVIRONMENT_CONFIGURATION_ERROR);
    }

    if (usesEnvironmentAuthentication && environmentBaseUrl === undefined && options.baseUrl === undefined) {
      throw new Error(ENVIRONMENT_CONFIGURATION_ERROR);
    }

    if (token && cookies) {
      throw new Error("Only one of 'token' or 'cookies' can be provided, not both");
    }

    let customFetch: typeof fetch | undefined;
    if (cookies) {
      const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

      customFetch = async (url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const headers = new Headers(init?.headers);

        if (!isBrowser) {
          const cookieString = [
            cookies.token ? `token=${cookies.token}` : "",
            cookies.accountId ? `account_id=${cookies.accountId}` : "",
          ]
            .filter(Boolean)
            .join("; ");

          if (cookieString) {
            headers.set("Cookie", cookieString);
          }
        }

        return (fetchApi || fetch)(url, {
          ...init,
          headers,
          credentials: "include",
        });
      };
    } else if (usesEnvironmentAuthentication && token) {
      const runAuthorization = `Bearer ${token}`;
      customFetch = async (url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const headers = new Headers(init?.headers);
        headers.set("Authorization", runAuthorization);
        return (fetchApi || fetch)(url, { ...init, headers });
      };
    }

    this.unitStateSubscriptionBaseUrl = baseUrl.replace(/\/+$/u, "");
    if (fetchApi === undefined) {
      this.unitStateSubscriptionFetch = undefined;
    } else {
      const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
      const authorization = token === undefined ? undefined : `Bearer ${token}`;
      this.unitStateSubscriptionFetch = async (url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const headers = new Headers(init?.headers);
        if (authorization !== undefined) headers.set("Authorization", authorization);
        if (cookies !== undefined && !isBrowser) {
          const cookie = [`token=${cookies.token}`, `account_id=${cookies.accountId}`].join("; ");
          headers.set("Cookie", cookie);
        }
        return fetchApi(url, {
          ...init,
          headers,
          ...(cookies === undefined ? {} : { credentials: "include" }),
        });
      };
    }

    const config = new Configuration({
      basePath: baseUrl,
      apiKey: token ? `Bearer ${token}` : undefined,
      fetchApi: customFetch || fetchApi,
    });

    this.account = wrapApiWithErrorHandling(new AccountApi(config));
    this.accountIntelligence = wrapApiWithErrorHandling(new AccountIntelligenceApi(config));
    this.analytics = wrapApiWithErrorHandling(new AnalyticsApi(config));
    this.auditLogs = wrapApiWithErrorHandling(new AuditLogsApi(config));
    this.connectionModels = wrapApiWithErrorHandling(new ConnectionModelsApi(config));
    this.connections = wrapApiWithErrorHandling(new ConnectionsApi(config));
    this.converters = wrapApiWithErrorHandling(new ConvertersApi(config));
    this.customizes = wrapApiWithErrorHandling(new CustomizesApi(config));
    this.events = wrapApiWithErrorHandling(new EventsApi(config));
    this.firmware = wrapApiWithErrorHandling(new FirmwareApi(config));
    this.groups = wrapApiWithErrorHandling(new GroupsApi(config));
    this.inboundConnections = wrapApiWithErrorHandling(new InboundConnectionsApi(config));
    this.inboundSources = wrapApiWithErrorHandling(new InboundSourcesApi(config));
    this.integrations = wrapApiWithErrorHandling(new IntegrationsApi(config));
    this.intelligences = wrapApiWithErrorHandling(new IntelligencesApi(config));
    this.invitations = wrapApiWithErrorHandling(new InvitationsApi(config));
    this.issues = wrapApiWithErrorHandling(new IssuesApi(config));
    this.machine = wrapApiWithErrorHandling(new MachineApi(config));
    this.machines = wrapApiWithErrorHandling(new MachinesApi(config));
    this.notificationHistory = wrapApiWithErrorHandling(new NotificationHistoryApi(config));
    this.notifications = wrapApiWithErrorHandling(new NotificationsApi(config));
    this.obniz = wrapApiWithErrorHandling(new ObnizApi(config));
    this.reports = wrapApiWithErrorHandling(new ReportsApi(config));
    this.session = wrapApiWithErrorHandling(new SessionApi(config));
    this.threads = wrapApiWithErrorHandling(new ThreadsApi(config));
    this.units = wrapApiWithErrorHandling(new UnitsApi(config));
    this.users = wrapApiWithErrorHandling(new UsersApi(config));
  }
}

export * from "./sdk-core";
