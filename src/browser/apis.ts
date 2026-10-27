import * as Core from "../sdk-core";
import { UnitAssets } from "../unitAssets";

export function createBrowserApis(baseUrl: string, fetchApi: typeof fetch) {
  const configuration = new Core.Configuration({
    basePath: baseUrl,
    fetchApi,
    credentials: "omit",
    middleware: [
      {
        onError: async (context) => {
          throw context.error;
        },
      },
    ],
  });
  return {
    assets: new UnitAssets(baseUrl, fetchApi),
    account: new Core.AccountApi(configuration),
    analytics: new Core.AnalyticsApi(configuration),
    auditLogs: new Core.AuditLogsApi(configuration),
    connectionModels: new Core.ConnectionModelsApi(configuration),
    connections: new Core.ConnectionsApi(configuration),
    converters: new Core.ConvertersApi(configuration),
    customizes: new Core.CustomizesApi(configuration),
    events: new Core.EventsApi(configuration),
    firmware: new Core.FirmwareApi(configuration),
    groups: new Core.GroupsApi(configuration),
    inboundConnections: new Core.InboundConnectionsApi(configuration),
    inboundSources: new Core.InboundSourcesApi(configuration),
    integrations: new Core.IntegrationsApi(configuration),
    intelligences: new Core.IntelligencesApi(configuration),
    invitations: new Core.InvitationsApi(configuration),
    issues: new Core.IssuesApi(configuration),
    machine: new Core.MachineApi(configuration),
    machines: new Core.MachinesApi(configuration),
    notificationHistory: new Core.NotificationHistoryApi(configuration),
    notifications: new Core.NotificationsApi(configuration),
    obniz: new Core.ObnizApi(configuration),
    reports: new Core.ReportsApi(configuration),
    threads: new Core.ThreadsApi(configuration),
    units: new Core.UnitsApi(configuration),
    users: new Core.UsersApi(configuration),
  };
}
