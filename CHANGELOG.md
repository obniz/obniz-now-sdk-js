# Changelog

## 0.2.0

### Added

- Browser session entry (`@obniz/obniz-now-sdk/browser`) with authorization
  callbacks, session refresh, logout, cross-tab coordination and typed errors.
- Unit State subscriptions with snapshots, revisions, resumable cursors and
  explicit subscription cleanup.
- Argumentless Node client configuration through `NOW_API_TOKEN` and
  `NOW_API_URL`, including hosted Account Intelligence environments.
- Unit asset helpers and external Account Intelligence delivery verification.
- Generated API coverage for Account Intelligence and updated account, event,
  notification, audit-log, unit-state and other Now API contracts.

### Removed

- Legacy anonymous machine customization and public visibility operations.
  The matching server paths are retired; use authenticated machine and asset APIs.

### Upgrade notes

- Preserve all public 0.1.15 client namespaces, HTTP error conversion to
  `ObnizNowApiError`, and trailing-slash normalization when regenerating the SDK.
- Middleware builders remain synchronous and retain error conversion on their
  returned API instances.

- Generated request/response types now follow the current server specification.
  Recompile applications and review TypeScript errors when upgrading from 0.1.x;
  do not assume all generated type shapes are unchanged.
- Existing explicit-token and cookie client construction remain available. The
  package root remains the Node/general client; the new `/browser` entry is for
  SPA user sessions.
- Argumentless construction requires both environment values. The SDK does not
  automatically read `OBNIZ_TOKEN` or `OBNIZ_NOW_TOKEN`.
- Stream and Account Intelligence features require compatible server endpoints
  and permissions. This package does not enable server features or migrate data.

The base candidate was generated from obniz-machines master
`ca956a11f441d447fb6646774a44ad517728a63d`. The public-machine
retirement changes follow `fix/retire-public-machine-access` at `287e588d9`.

## 0.1.15

Previous published version.
