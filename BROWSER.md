# Browser sessions

Use `@obniz/obniz-now-sdk/browser` in a browser SPA. This entry manages a user session; the existing package root remains the server-side SDK. The browser entry is included in the 0.2.0 release candidate and requires a compatible Now server. See the package changelog for release and upgrade information.

## Before integration

- Register the SPA's exact Origin in the target Now Account's Allowed Browser Origins. Scheme, host and port matter; an Origin has no path. Use HTTPS, or HTTP on localhost for development.
- Serve the callback from the SPA's own Origin and load the same application there. Do not put a fragment or reserved `code`, `state`, `error`, `error_description` or `error_uri` query parameter in the callback URL.
- Serve the callback with `Cache-Control: no-store` and `Referrer-Policy: no-referrer`. Initialize the SDK before analytics or other code that records the current URL. Keep credentials and callback URLs out of application logs.
- The browser must provide a secure context, IndexedDB, Web Locks, Web Crypto, fetch and ReadableStream. Initialization can reject if storage is unavailable. Browser acceptance coverage is separate from feature detection.

## Initialize and connect controls

```ts
import {
  BrowserSessionClient,
  BrowserApiError,
  type BrowserAuthState,
} from "@obniz/obniz-now-sdk/browser";

const baseUrl = "https://now.example.com"; // Your Now environment.
const loginButton = document.querySelector<HTMLButtonElement>("#login")!;
const profileButton = document.querySelector<HTMLButtonElement>("#profile")!;
const logoutButton = document.querySelector<HTMLButtonElement>("#logout")!;
const status = document.querySelector<HTMLElement>("#status")!;
const result = document.querySelector<HTMLElement>("#result")!;
let state: BrowserAuthState = "signed_out";

function showFailure(error: unknown) {
  status.textContent = error instanceof BrowserApiError && error.kind === "result_unknown"
    ? "No response received. Check the result before trying again."
    : "The operation failed. Please try again when ready.";
}

async function initialize() {
  const client = await BrowserSessionClient.create({
    baseUrl,
    onAuthStateChanged(next) {
      state = next;
      status.textContent = next;
      loginButton.disabled = next !== "signed_out" && next !== "login_required";
      profileButton.disabled = next !== "active";
      logoutButton.disabled = next !== "active" && next !== "login_required";
      if (next !== "active") result.textContent = "";
    },
    onError: showFailure,
  });

  loginButton.onclick = () => {
    void client.startLogin(`${location.origin}/callback`).catch(showFailure);
  };
  profileButton.onclick = () => {
    void client.api.users.getCurrentUser().then((user) => {
      if (state === "active") result.textContent = user.id;
    }).catch(showFailure);
  };
  logoutButton.onclick = () => {
    void client.logout().then((outcome) => {
      if (outcome === "logging_out") status.textContent = "Logout is still pending.";
    }).catch(showFailure);
  };
  return client;
}

loginButton.disabled = profileButton.disabled = logoutButton.disabled = true;
void initialize().catch(showFailure);
```

Initialize once per application lifetime. `create` handles callback parameters and removes them from the URL before exchanging the authorization code. It also restores an existing session. Do not call `completeCallback` again after `create` has already processed the callback.

## Account registration

Now operators can allow an exact SPA Origin in `/_admin/account-signup-origins`. The server uses `OBNIZ_CLOUD_DEFAULT_TOKEN` when nonblank; otherwise it falls back to the historical shared Cloud token stored on the server. This registration list is separate from existing Accounts' Allowed Browser Origins. Direct public registration remains closed.

Call `client.startSignup(redirectUri)` from an explicit signup button. It uses the same callback, PKCE and session storage as `startLogin`. The hosted form asks for an Account name, creates a lite Account owned by the signed-in User, permits the requesting Origin, and returns to the SPA. Existing Users can create additional Accounts; names need not be unique. No Cloud token or Account API Token is supplied by the SPA.

`BrowserAuthorizationDeniedError.code` remains `access_denied`. Its `reason` is `no_available_account`, `signup_cancelled`, or `unspecified`. Show signup after `no_available_account`; after a cancellation, allow another login or signup. Unknown and missing descriptions map to `unspecified`. A validated denial leaves the client usable in `signed_out` without reinitialization.

If already signed in, finish `await client.logout()` and require its result to be `signed_out` before calling `startSignup`. Do not start signup while logout is pending or has failed.

If creation succeeded but the callback never reached the SPA, the client may remain `authorizing`. Offer an explicit “Log in again” action in this state:

```ts
async function logInAgain() {
  const outcome = await client.logout();
  if (outcome !== "signed_out") return;
  await client.startLogin(`${location.origin}/callback`);
}
```

Handle the returned promise's rejection through the application's error display. This ends the pending SDK authorization; it does not delete the Account or log out the Now User. Select the existing Account on the next login. Do not clear storage manually or automatically start a competing authorization. The sample includes both signup and recovery controls.

## States and session scope

| State | Application behavior |
| --- | --- |
| `signed_out` | Offer a login button. |
| `authorizing` | Authorization is pending. Do not start a competing login. |
| `active` | User API calls are available. |
| `logging_out` | Keep authenticated controls disabled while revocation is pending. |
| `login_required` | Tell the user to log in again; wait for their action. |

For one SPA Origin and one Now base URL, tabs sharing browser storage share one login and Account. Finish logout before selecting another Account. Another SPA Origin, browser profile or device has its own session. Logout does not sign the user out of obniz Cloud, Firebase or another device.

Private browsing can discard saved session state when the browser closes. The next private session then needs a new login; normal-profile restart persistence is not a promise for private browsing. Closing the browser is not equivalent to calling SDK logout.

`logout()` immediately stops this client's API access and subscriptions. It returns `signed_out` when completion is observed, or `logging_out` after at most ten seconds while work remains. A timeout is not proof that a pending storage write or server revocation completed. The SDK retries queued revocation while running and resumes it on subsequent initialization. Keep observing state changes; do not erase browser storage to force completion.

`dispose()` releases this client's subscriptions and browser resources. It does **not** log out or erase the shared session. Use it when tearing down the application, after any required logout.

## Requests and errors

Use `client.api` for generated APIs or `client.fetch(absoluteUrl, options)` for supported Now endpoints. The SDK adds authorization and omits cookies. It rejects unsupported destinations and does not follow redirects. For FormData uploads, let the browser set the multipart Content-Type and boundary.

Ordinary business requests are never automatically resent. A network/CORS/abort failure reported as `BrowserApiError.kind === "result_unknown"` does not establish whether a mutation succeeded. The SPA chooses how to show the failure, check the result and offer another attempt. Token refresh, revocation retries and SSE reconnection are separate SDK operations.

| Error | Meaning |
| --- | --- |
| `BrowserApiError` | `unsupported_api`, `result_unknown`, `http_error` or `response_interrupted`; `status`, `serverCode` and `requestId` are optional. |
| `BrowserAuthTransportError` | Authentication transport failure; inspect `kind` and optional `status` / `serverCode` / `requestId`. |
| `BrowserLoginRequiredError` | `code: "login_required"`; wait for explicit login. |
| `BrowserAuthorizationDeniedError` | `code: "access_denied"`; authorization was declined. Show an explanation and let the user log in again. |
| `BrowserSessionConflictError` | `code: "session_conflict"`; finish the existing authorization/logout/session first. |
| `BrowserStorageError` | `code: "unsupported_browser"` or `"storage_unavailable"`; stop using that client. |

Always handle rejected method promises, including `create`. `onError` also reports background failures and may report the same failure as a rejected operation; avoid displaying duplicate notifications. Reading a returned response body can fail after `fetch` resolves, so handle `response.json()`, `response.blob()` and stream-read rejections too. Do not assume every error reaches `onError`.

A validated `access_denied` callback clears the pending login and callback query, reports `BrowserAuthorizationDeniedError` through `onError`, and lets `create()` resolve with a usable client in `signed_out`. Enable the login button through `onAuthStateChanged`; no second initialization is needed. Invalid state, callback URI, expired attempts, or storage failures still reject initialization.

`client.subscribeUnitStates(filter, onEvent, options)` provides authenticated SSE with cursor-based reconnection. Keep the returned handle and call `close()` when the view no longer needs it. Logout closes client subscriptions. An application should apply snapshot/event semantics and handle errors through the subscription options.

The SDK owns tokens and browser credential storage. Do not copy tokens into LocalStorage, add an Account API Token to the SPA, or manipulate the SDK's IndexedDB/sessionStorage records.
