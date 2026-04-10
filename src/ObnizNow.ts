import {
  Configuration,
  AnalyticsApi,
  ConnectionModelsApi,
  ConnectionsApi,
  EventsApi,
  GroupsApi,
  InboundConnectionsApi,
  InboundSourcesApi,
  IntegrationsApi,
  IntelligencesApi,
  IssuesApi,
  MachineApi,
  MachinesApi,
  NotificationsApi,
  ReportsApi,
  ThreadsApi,
  UnitsApi,
} from "./sdk-core";

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

export type ObnizNowOptions = (BaseOptions & WithoutCookies) | (BaseOptions & WithCookies);

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
  /** Analytics API - Execute and retrieve analytics results */
  public readonly analytics: AnalyticsApi;

  /** Connection Models API - Manage connection model configurations */
  public readonly connectionModels: ConnectionModelsApi;

  /** Connections API - Manage machine connections */
  public readonly connections: ConnectionsApi;

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
    const fetchApi = options.fetch || (typeof fetch !== "undefined" ? fetch : undefined);

    if (!token && !cookies) {
      throw new Error("Either 'token' or 'cookies' must be provided");
    }

    if (token && cookies) {
      throw new Error("Only one of 'token' or 'cookies' can be provided, not both");
    }

    let customFetch: typeof fetch | undefined;
    if (cookies) {
      customFetch = async (url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const finalInit = {
          ...init,
          credentials: "include" as RequestCredentials,
          headers: {
            ...init?.headers,
            Cookie: `token=${cookies.token}; account_id=${cookies.accountId}`,
          },
        };
        return (fetchApi || fetch)(url, finalInit);
      };
    }

    const config = new Configuration({
      basePath: baseUrl,
      apiKey: token ? `Bearer ${token}` : undefined,
      fetchApi: customFetch || fetchApi,
      credentials: cookies ? "include" : undefined,
    });

    this.analytics = new AnalyticsApi(config);
    this.connectionModels = new ConnectionModelsApi(config);
    this.connections = new ConnectionsApi(config);
    this.events = new EventsApi(config);
    this.groups = new GroupsApi(config);
    this.inboundConnections = new InboundConnectionsApi(config);
    this.inboundSources = new InboundSourcesApi(config);
    this.integrations = new IntegrationsApi(config);
    this.intelligences = new IntelligencesApi(config);
    this.issues = new IssuesApi(config);
    this.machine = new MachineApi(config);
    this.machines = new MachinesApi(config);
    this.notifications = new NotificationsApi(config);
    this.reports = new ReportsApi(config);
    this.threads = new ThreadsApi(config);
    this.units = new UnitsApi(config);
  }
}
