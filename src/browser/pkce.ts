function encodeBase64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/gu, "-")
    .replace(/\//gu, "_")
    .replace(/=+$/u, "");
}

export function createBrowserRandomId(crypto: Crypto): string {
  return encodeBase64Url(crypto.getRandomValues(new Uint8Array(32)));
}

export async function createBrowserPkce(
  crypto: Crypto,
): Promise<{ verifier: string; challenge: string; state: string }> {
  const verifier = createBrowserRandomId(crypto);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return { verifier, challenge: encodeBase64Url(new Uint8Array(digest)), state: createBrowserRandomId(crypto) };
}

export function consumeBrowserCallbackUrl(
  location: Pick<Location, "href">,
  history: Pick<History, "state" | "replaceState">,
): {
  code: string | null;
  state: string | null;
  error: string | null;
  description: string | null;
  errorUri: string | null;
  duplicate: boolean;
} {
  const url = new URL(location.href);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const description = url.searchParams.get("error_description");
  const errorUri = url.searchParams.get("error_uri");
  const duplicate = ["code", "state", "error", "error_description", "error_uri"].some((key) => url.searchParams.getAll(key).length > 1);
  for (const key of ["code", "state", "error", "error_description", "error_uri"]) url.searchParams.delete(key);
  // Cleanup precedes validation and network calls so failure cannot leave credentials in the current URL.
  history.replaceState(history.state, "", url.href);
  return { code, state, error, description, errorUri, duplicate };
}
