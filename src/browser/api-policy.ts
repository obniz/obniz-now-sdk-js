import { browserRoutePolicies } from "./route-policy.generated";
import { normalizeBrowserBaseUrl } from "./environment";

type Variant = {
  match: "default" | { params?: Readonly<Record<string, string>>; query?: Readonly<Record<string, string>> };
  allowed: boolean;
};
const policies = browserRoutePolicies.map((route) => ({
  ...route,
  expression: new RegExp(route.expression, route.flags),
}));

export function allowsBrowserApiRequest(baseUrl: string, target: string, method: string): boolean {
  try {
    // Reject characters that URL parsing could silently normalize.
    // eslint-disable-next-line no-control-regex
    if (/[\u0000-\u0020\u007f\\]/u.test(target) || /%(?:2f|5c|00)/iu.test(target)) return false;
    const base = new URL(normalizeBrowserBaseUrl(baseUrl));
    const url = new URL(target);
    if (url.origin !== base.origin || url.username || url.password || url.hash) return false;
    const prefix = base.pathname.replace(/\/+$/u, "");
    if (!url.pathname.startsWith(`${prefix}/`)) return false;
    const pathname = url.pathname.slice(prefix.length);
    if (!/^\/api\/1\//iu.test(pathname)) return false;
    const effectiveMethod = method.toUpperCase() === "HEAD" ? "GET" : method.toUpperCase();
    for (const policy of policies) {
      if (policy.method !== effectiveMethod) continue;
      const match = policy.expression.exec(pathname);
      if (!match) continue;
      const params = Object.fromEntries(
        policy.parameters.map((key, index) => [key, decodeURIComponent(match[index + 1])]),
      );
      const variant = (policy.variants as readonly Variant[]).find(
        (variant) =>
          variant.match === "default" ||
          (Object.entries(variant.match.params ?? {}).every(([key, value]) => params[key] === value) &&
            Object.entries(variant.match.query ?? {}).every(
              ([key, value]) => url.searchParams.getAll(key).length === 1 && url.searchParams.get(key) === value,
            )),
      );
      return variant?.allowed === true;
    }
    return false;
  } catch {
    return false;
  }
}
