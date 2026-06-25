import {
  Configuration,
  AccountApi,
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

export type ObnizNowTokenOptions = BaseOptions & WithoutCookies;
export type ObnizNowCookiesOptions = BaseOptions & WithCookies;

export type ObnizNowOptions =
  | (BaseOptions & WithoutCookies)
  | (BaseOptions & WithCookies);

/**
 * ObnizNow SDK main class
 *
 * Provides access to all Obniz Now API endpoints.
 *
 * @example
 * ```typescript
 * import { ObnizNow } from '@obniz/sdk';
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
  /** Account API - Manage current account settings, members, API keys, plan, entitlements, usages, and secrets */
  public readonly account: AccountApi;

  /** Analytics API - Execute and retrieve analytics results */
  public readonly analytics: AnalyticsApi;

  /** Audit Logs API - Access account audit log entries */
  public readonly auditLogs: AuditLogsApi;

  /** Connection Models API - Manage connection model configurations */
  public readonly connectionModels: ConnectionModelsApi;

  /** Connections API - Manage machine connections */
  public readonly connections: ConnectionsApi;

  /** Converters API - Data format conversions */
  public readonly converters: ConvertersApi;

  /** Customizes API - Resolve account, machine, group, and asset customizations */
  public readonly customizes: CustomizesApi;

  /** Events API - Access event data and history */
  public readonly events: EventsApi;

  /** Firmware API - Inspect and update device firmware */
  public readonly firmware: FirmwareApi;

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

  /** Invitations API - Manage account invitations */
  public readonly invitations: InvitationsApi;

  /** Issues API - Track and manage issues */
  public readonly issues: IssuesApi;

  /** Machine API - Single machine operations */
  public readonly machine: MachineApi;

  /** Machines API - Machine management and operations */
  public readonly machines: MachinesApi;

  /** Notification History API - Access notification delivery history */
  public readonly notificationHistory: NotificationHistoryApi;

  /** Notifications API - Manage notification settings */
  public readonly notifications: NotificationsApi;

  /** Obniz API - Access obniz device metadata */
  public readonly obniz: ObnizApi;

  /** Reports API - Generate and retrieve reports */
  public readonly reports: ReportsApi;

  /** Session API - Browser session account selection and UI configuration */
  public readonly session: SessionApi;

  /** Threads API - Discussion threads and communications */
  public readonly threads: ThreadsApi;

  /** Units API - Unit data and state management */
  public readonly units: UnitsApi;

  /** Users API - Manage current user and profile pictures */
  public readonly users: UsersApi;

  /**
   * Creates a new ObnizNow SDK client instance
   *
   * @param options - Configuration options
   * @param options.token - API authentication token (required)
   * @param options.baseUrl - Base URL for API requests (optional, defaults to 'https://api.obniz.com')
   * @param options.fetch - Custom fetch implementation (optional, for Node.js < 18 or custom scenarios)
   *
   * @throws {Error} When token is not provided
   *
   * @example
   * ```typescript
   * const client = new ObnizNow({ token: 'your-api-token' });
   * ```
   */
  constructor(options: ObnizNowOptions) {
    const token = (options as ObnizNowTokenOptions).token;
    const cookies = (options as ObnizNowCookiesOptions).cookies;
    const baseUrl = options.baseUrl ?? "https://api.obniz.com";
    const fetchApi =
      options.fetch || (typeof fetch !== "undefined" ? fetch : undefined);

    if (!token && !cookies) {
      throw new Error("Either 'token' or 'cookies' must be provided");
    }

    if (token && cookies) {
      throw new Error(
        "Only one of 'token' or 'cookies' can be provided, not both",
      );
    }

    let customFetch: typeof fetch | undefined;
    if (cookies) {
      const isBrowser =
        typeof window !== "undefined" && typeof document !== "undefined";

      customFetch = async (
        url: RequestInfo | URL,
        init?: RequestInit,
      ): Promise<Response> => {
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
    }

    const config = new Configuration({
      basePath: baseUrl,
      apiKey: token ? `Bearer ${token}` : undefined,
      fetchApi: customFetch || fetchApi,
    });

    this.account = wrapApiWithErrorHandling(new AccountApi(config));
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
