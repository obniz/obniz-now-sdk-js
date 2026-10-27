export function normalizeBrowserBaseUrl(value: string): string {
  if (typeof value !== "string" || /[\s\\?#]/u.test(value) || !/^https?:\/\//iu.test(value))
    throw new Error("Invalid Now base URL");
  const authority = value.slice(value.indexOf("://") + 3).split("/")[0];
  if (authority.includes("@")) throw new Error("Invalid Now base URL");
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Invalid Now base URL");
  }
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && loopback)) throw new Error("Invalid Now base URL");
  if (/%(?:2f|5c|2e|00)/iu.test(value)) throw new Error("Invalid Now base URL");
  return url.origin + url.pathname.replace(/\/+$/u, "");
}

export function browserSessionNamespace(baseUrl: string): string {
  return `now-browser-session:${normalizeBrowserBaseUrl(baseUrl)}`;
}
