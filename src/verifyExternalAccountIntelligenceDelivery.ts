const VERIFICATION_PATH = "/api/1/account-intelligence/runs/verify-external-delivery";
const MAX_RAW_BODY_BYTES = 1024 * 1024;
const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const AUTHORIZATION_PATTERN =
  /^Bearer (nowir_v1_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}_[A-Za-z0-9_-]{43})$/u;
const RFC3339_UTC_PATTERN =
  /^[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])T(?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](?:\.[0-9]{1,9})?Z$/u;
const GENERIC_ERROR_MESSAGE = "External Account Intelligence delivery verification failed";

export type ExternalAccountIntelligenceRawBodyChunk = Uint8Array;
export type ExternalAccountIntelligenceRawBody =
  | ExternalAccountIntelligenceRawBodyChunk
  | Iterable<ExternalAccountIntelligenceRawBodyChunk>
  | AsyncIterable<ExternalAccountIntelligenceRawBodyChunk>;

export interface VerifyExternalAccountIntelligenceDeliveryOptions {
  readonly authorization: string | null | undefined;
  readonly rawBody: ExternalAccountIntelligenceRawBody;
  readonly baseUrl?: string;
  readonly fetch?: typeof fetch;
}

export interface VerifiedExternalAccountIntelligenceDeliveryContext {
  readonly verified: true;
  readonly runId: string;
  readonly accountId: string;
  readonly intelligenceId: string;
  readonly intelligenceName: string;
  readonly leaseExpiresAt: string;
}

type DeliveryIdentity = Readonly<{
  runId: string;
  accountId: string;
  intelligenceId: string;
  intelligenceName: string;
}>;

function verificationError(): Error {
  return new Error(GENERIC_ERROR_MESSAGE);
}

function nodeApiUrl(): string | undefined {
  const value = (
    globalThis as typeof globalThis & {
      process?: { env?: Partial<Record<"NOW_API_URL", string | undefined>> };
    }
  ).process?.env?.NOW_API_URL;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function isByteChunk(value: unknown): value is Uint8Array {
  return value instanceof Uint8Array;
}

async function collectRawBody(rawBody: ExternalAccountIntelligenceRawBody): Promise<Uint8Array> {
  if (isByteChunk(rawBody)) {
    if (rawBody.byteLength > MAX_RAW_BODY_BYTES) throw verificationError();
    return new Uint8Array(rawBody);
  }
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  for await (const chunk of rawBody) {
    if (!isByteChunk(chunk) || chunk.byteLength > MAX_RAW_BODY_BYTES - totalBytes) throw verificationError();
    totalBytes += chunk.byteLength;
    chunks.push(new Uint8Array(chunk));
  }
  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

function deliveryIdentity(bytes: Uint8Array): DeliveryIdentity {
  const value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as unknown;
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw verificationError();
  const body = value as Record<string, unknown>;
  const intelligence = body.intelligence;
  if (typeof intelligence !== "object" || intelligence === null || Array.isArray(intelligence)) {
    throw verificationError();
  }
  const intelligenceBody = intelligence as Record<string, unknown>;
  if (
    typeof body.run_id !== "string" ||
    !UUID_V4_PATTERN.test(body.run_id) ||
    typeof body.account_id !== "string" ||
    body.account_id.length === 0 ||
    typeof intelligenceBody.id !== "string" ||
    !UUID_V4_PATTERN.test(intelligenceBody.id) ||
    typeof intelligenceBody.name !== "string" ||
    intelligenceBody.name.length === 0
  ) {
    throw verificationError();
  }
  return Object.freeze({
    runId: body.run_id,
    accountId: body.account_id,
    intelligenceId: intelligenceBody.id,
    intelligenceName: intelligenceBody.name,
  });
}

async function sha256(bytes: Uint8Array): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (subtle === undefined) throw verificationError();
  const digest = new Uint8Array(await subtle.digest("SHA-256", new Uint8Array(bytes)));
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function verificationUrl(baseUrl: string): string {
  const parsed = new URL(baseUrl);
  if (
    (parsed.protocol !== "https:" && parsed.protocol !== "http:") ||
    parsed.username.length > 0 ||
    parsed.password.length > 0
  ) {
    throw verificationError();
  }
  return new URL(VERIFICATION_PATH, parsed).toString();
}

function verifiedContext(
  value: unknown,
  identity: DeliveryIdentity,
): VerifiedExternalAccountIntelligenceDeliveryContext {
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw verificationError();
  const response = value as Record<string, unknown>;
  if (
    Object.keys(response).sort().join(",") !==
      "accountId,intelligenceId,intelligenceName,leaseExpiresAt,runId,verified" ||
    response.verified !== true ||
    response.runId !== identity.runId ||
    response.accountId !== identity.accountId ||
    response.intelligenceId !== identity.intelligenceId ||
    response.intelligenceName !== identity.intelligenceName ||
    typeof response.leaseExpiresAt !== "string" ||
    !RFC3339_UTC_PATTERN.test(response.leaseExpiresAt) ||
    !Number.isFinite(Date.parse(response.leaseExpiresAt))
  ) {
    throw verificationError();
  }
  return Object.freeze({
    verified: true,
    runId: identity.runId,
    accountId: identity.accountId,
    intelligenceId: identity.intelligenceId,
    intelligenceName: identity.intelligenceName,
    leaseExpiresAt: response.leaseExpiresAt,
  });
}

/**
 * Fail-closed verification for an external Account Intelligence delivery.
 * Call before side effects and use the returned runId as their idempotency key.
 */
export async function verifyExternalAccountIntelligenceDelivery(
  options: VerifyExternalAccountIntelligenceDeliveryOptions,
): Promise<VerifiedExternalAccountIntelligenceDeliveryContext> {
  try {
    const match = typeof options.authorization === "string" ? AUTHORIZATION_PATTERN.exec(options.authorization) : null;
    if (match === null) throw verificationError();
    const bytes = await collectRawBody(options.rawBody);
    const identity = deliveryIdentity(bytes);
    const payloadHash = `sha256:jcs-v1:${await sha256(bytes)}`;
    const baseUrl = options.baseUrl ?? nodeApiUrl();
    const fetchApi = options.fetch ?? globalThis.fetch;
    if (baseUrl === undefined || fetchApi === undefined) throw verificationError();
    const response = await fetchApi(verificationUrl(baseUrl), {
      method: "POST",
      redirect: "error",
      headers: {
        "Authorization": match[0],
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ runId: identity.runId, payloadHash }),
    });
    if (!response.ok) throw verificationError();
    return verifiedContext(await response.json(), identity);
  } catch {
    throw verificationError();
  }
}
