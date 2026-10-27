# obniz Now SDK

TypeScript and JavaScript clients for the obniz Now API.

## Installation

```sh
npm install @obniz/obniz-now-sdk@0.2.0
```

Node.js 18 or later is required. The package includes TypeScript declarations,
CommonJS and ES modules. See [CHANGELOG.md](./CHANGELOG.md) before upgrading from 0.1.x.

## Server-side usage

Use a **Now API token** for the target account, not an obniz Cloud API token.
Keep this token on the server.

```ts
import { ObnizNow } from "@obniz/obniz-now-sdk";

const client = new ObnizNow({
  token: process.env.NOW_API_TOKEN!,
  baseUrl: "https://now.obniz.com",
});

const response = await client.machines.listMachines({ limit: 10, offset: 0 });
for (const item of response.items) {
  console.log(item.machine.id, item.machine.name);
}

const { machine, machine_stat } = await client.machine.getMachine({
  machineId: "your-machine-id",
});
```

For CommonJS, use `const { ObnizNow } = require("@obniz/obniz-now-sdk")`.
Set `baseUrl` explicitly to choose production, staging or a local environment.
It is the service origin; do not append `/api/1`.

### Environment configuration

When authentication is omitted, the SDK reads **both** `NOW_API_TOKEN` and
`NOW_API_URL`. Missing configuration causes construction to fail before a request
is sent. Hosted Account Intelligence processes supply these values, including a
run-scoped token.

```sh
export NOW_API_TOKEN="your-now-api-token"
export NOW_API_URL="https://now.obniz.com"
```

```ts
import { ObnizNow } from "@obniz/obniz-now-sdk";

const client = new ObnizNow();
const response = await client.machines.listMachines({ limit: 10 });
```

Explicit `token` or `cookies` options select that authentication mode instead of
environment authentication. A `fetch` option can supply a custom transport.

## Browser applications

For a separate SPA, use `BrowserSessionClient` from
`@obniz/obniz-now-sdk/browser`. It manages user login, refresh, logout and
authenticated requests without putting an account API token in the application.
The browser entry does not import Node.js built-in modules.

Follow the [browser integration guide](./BROWSER.md) for required origin
registration, callback handling, browser capabilities and complete examples.

Existing custom pages hosted on the Now service can continue to use same-origin
cookie authentication through the root entry:

```ts
import { ObnizNow } from "@obniz/obniz-now-sdk";

const client = new ObnizNow({
  baseUrl: window.location.origin,
  cookies: { token: "", accountId: "" },
});
```

In a browser, this uses existing cookies through `credentials: "include"`.
Do not copy login-cookie values or account API tokens into frontend code.

## Unit state subscriptions

The Node client and `BrowserSessionClient` expose `subscribeUnitStates` for
snapshot and change events. Close subscriptions when the view or process no
longer needs them.

```ts
const subscription = client.subscribeUnitStates(
  { unitId: "machine-your-machine-id", keys: ["temp"], includeCurrent: true },
  (event) => console.log(event),
  { onError: (error) => console.error(error.kind, error.message) },
);

// Later:
subscription.close();
```

The server must support the Unit State stream endpoints. Transient transport
failures may reconnect; a successfully constructed subscription alone does not
confirm server availability. Handle errors and snapshot replacement semantics.

## Error handling

```ts
import { ObnizNowApiError } from "@obniz/obniz-now-sdk";

try {
  await client.machine.getMachine({ machineId: "your-machine-id" });
} catch (error) {
  if (error instanceof ObnizNowApiError) {
    console.error(error.status, error.message);
    console.error(error.data);
  } else {
    throw error;
  }
}
```

Network failures can occur before an HTTP response and are not necessarily
`ObnizNowApiError`. Browser sessions have their own error types, described in
[BROWSER.md](./BROWSER.md). Avoid logging tokens, complete request headers or
authorization callback URLs.

## Development

```sh
npm ci
npm run test:run
npm run typecheck
npm run build
npm pack --dry-run
```

API definitions and generated sources are maintained in `obniz/obniz-machines`.
Regenerate there with `npm run sdk:generate`, copy the generated SDK and OpenAPI
specification, then run `openapi/configure-public-sdk.mjs` against this checkout.
See [RELEASING.md](./RELEASING.md) for the release process.

## License

ISC
