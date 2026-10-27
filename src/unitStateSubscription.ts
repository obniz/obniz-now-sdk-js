const INVALID_FILTER_MESSAGE = "Invalid Unit State subscription filter";
const INVALID_CALLBACK_MESSAGE = "Invalid Unit State subscription callback";
const INVALID_OPTIONS_MESSAGE = "Invalid Unit State subscription options";
const HTTP_ERROR_MESSAGE = "Unit State subscription HTTP request failed";
const TRANSPORT_ERROR_MESSAGE = "Unit State subscription transport failed";
const PROTOCOL_ERROR_MESSAGE = "Unit State subscription protocol error";
const CALLBACK_ERROR_MESSAGE = "Unit State subscription callback failed";

const MAX_CODE_POINTS = 255;
const MAX_KEYS = 32;
const MAX_QUERY_BYTES = 8 * 1024;
const MAX_DATA_BYTES = 2 * 1024 * 1024;
const MAX_FRAME_BYTES = MAX_DATA_BYTES + 64 * 1024;
// `data: ` plus an optional CR before LF are wire framing, not payload.
const MAX_DATA_LINE_BYTES = MAX_DATA_BYTES + 7;
const MAX_REVISION = "9223372036854775807";
const MAX_RETRY_MS = 30_000;
const BASE_RETRY_MS = 1_000;
// A small read-ahead keeps fragmented queued streams moving without multiplying
// per-connection pending reads at the server's connection limit.
const READ_AHEAD_WINDOW = 8;
const CANONICAL_STREAM_ID = /^(0|[1-9]\d*)-(0|[1-9]\d*)$/u;
const POSITIVE_DECIMAL = /^[1-9]\d*$/u;
const RFC3339 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|([+-])(\d{2}):(\d{2}))$/u;

export interface UnitStateSubscriptionFilter {
  readonly unitId: string;
  readonly keys?: ReadonlyArray<string>;
  readonly includeCurrent?: boolean;
  readonly lastEventId?: string;
}

export type UnitStateSubscriptionEvent =
  | {
      readonly type: "change";
      readonly unitId: string;
      readonly key: string;
      readonly value: string | number | null;
      readonly operation: "upsert" | "delete";
      readonly revision: string;
    }
  | {
      readonly type: "snapshot";
      readonly mode: "replace";
      readonly scope: { readonly unitId: string; readonly keys?: ReadonlyArray<string> };
      readonly items: ReadonlyArray<{
        readonly key: string;
        readonly value: string | number;
        readonly revision: string;
        readonly stateTs: string;
      }>;
    }
  | { readonly type: "unit_deleted"; readonly unitId: string; readonly resetRevision: string };

export interface UnitStateSubscriptionError extends Error {
  readonly kind: "http" | "transport" | "protocol" | "callback";
  readonly retryable: boolean;
  readonly status?: number;
}

export interface UnitStateSubscriptionHandle {
  close(): void;
}

export interface UnitStateSubscriptionOptions {
  readonly onError?: (error: UnitStateSubscriptionError) => void;
}

export interface UnitStateSubscriptionDependencies {
  readonly baseUrl: string;
  readonly fetchApi: typeof fetch | undefined;
  readonly classifyFetchError?: (error: unknown) => UnitStateSubscriptionError;
  readonly shouldRetry?: (error: UnitStateSubscriptionError) => boolean;
}

interface NormalizedFilter {
  readonly unitId: string;
  readonly keys?: ReadonlyArray<string>;
  readonly includeCurrent: boolean;
  readonly lastEventId?: string;
}

interface SseFrame {
  readonly event: string;
  readonly data: string;
  readonly id?: string;
}

interface BatchChange {
  readonly key: string;
  readonly value: string | number | null;
  readonly operation: "upsert" | "delete";
  readonly revision: string;
  readonly stateTs: string;
}

interface BatchPayload {
  readonly unitId: string;
  readonly changes: ReadonlyArray<BatchChange>;
}

interface SnapshotPayload {
  readonly scope: { readonly unitId: string; readonly keys?: ReadonlyArray<string> };
  readonly items: ReadonlyArray<{
    readonly key: string;
    readonly value: string | number;
    readonly revision: string;
    readonly stateTs: string;
  }>;
}

interface DeletedPayload {
  readonly unitId: string;
  readonly resetRevision: string;
}

type ParsedFrame =
  | { readonly kind: "batch"; readonly id: string; readonly payload: BatchPayload }
  | { readonly kind: "snapshot"; readonly id: string; readonly payload: SnapshotPayload }
  | { readonly kind: "deleted"; readonly id: string; readonly payload: DeletedPayload }
  | { readonly kind: "reset"; readonly id?: string };

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value) as unknown;
  return prototype === Object.prototype || prototype === null;
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  required: ReadonlyArray<string>,
  optional: ReadonlyArray<string> = [],
): boolean {
  const allowed = new Set([...required, ...optional]);
  const keys = Object.keys(value);
  return (
    required.every((key) => Object.prototype.hasOwnProperty.call(value, key)) &&
    keys.every((key) => allowed.has(key)) &&
    keys.length >= required.length &&
    keys.length <= required.length + optional.length
  );
}

function boundedString(value: unknown, maxCodePoints = MAX_CODE_POINTS): value is string {
  return typeof value === "string" && Array.from(value).length > 0 && Array.from(value).length <= maxCodePoints;
}

function canonicalStreamId(value: unknown): value is string {
  return typeof value === "string" && CANONICAL_STREAM_ID.test(value);
}

function validRevision(value: unknown): value is string {
  return (
    typeof value === "string" &&
    POSITIVE_DECIMAL.test(value) &&
    (value.length < MAX_REVISION.length || (value.length === MAX_REVISION.length && value <= MAX_REVISION))
  );
}

function leapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function validTimestamp(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const match = RFC3339.exec(value);
  if (match === null) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const offsetHour = match[8] === undefined ? 0 : Number(match[8]);
  const offsetMinute = match[9] === undefined ? 0 : Number(match[9]);
  if (month < 1 || month > 12 || hour > 23 || minute > 59 || second > 59 || offsetHour > 23 || offsetMinute > 59) {
    return false;
  }
  const monthDays = [31, leapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= monthDays[month - 1];
}

function validValue(value: unknown): value is string | number | null {
  return typeof value === "string" || (typeof value === "number" && Number.isFinite(value)) || value === null;
}

function normalizeFilter(input: unknown): NormalizedFilter {
  try {
    if (!isPlainRecord(input) || !hasOnlyKeys(input, ["unitId"], ["keys", "includeCurrent", "lastEventId"])) {
      throw new TypeError();
    }
    const unitId = input.unitId;
    if (!boundedString(unitId)) throw new TypeError();

    let keys: ReadonlyArray<string> | undefined;
    if (input.keys !== undefined) {
      if (!Array.isArray(input.keys) || input.keys.length === 0) throw new TypeError();
      const unique: string[] = [];
      const seen = new Set<string>();
      for (const key of input.keys) {
        if (!boundedString(key)) throw new TypeError();
        if (seen.has(key)) continue;
        seen.add(key);
        unique.push(key);
        if (unique.length > MAX_KEYS) throw new TypeError();
      }
      keys = Object.freeze(unique);
    }

    const includeCurrent = input.includeCurrent;
    if (includeCurrent !== undefined && typeof includeCurrent !== "boolean") throw new TypeError();
    const lastEventId = input.lastEventId;
    if (lastEventId !== undefined && !canonicalStreamId(lastEventId)) throw new TypeError();

    return Object.freeze({
      unitId,
      ...(keys === undefined ? {} : { keys }),
      includeCurrent: includeCurrent ?? false,
      ...(lastEventId === undefined ? {} : { lastEventId }),
    });
  } catch {
    throw new TypeError(INVALID_FILTER_MESSAGE);
  }
}

function normalizeOptions(input: unknown): UnitStateSubscriptionOptions {
  try {
    if (input === undefined) return Object.freeze({});
    if (!isPlainRecord(input)) throw new TypeError();
    const onError = input.onError;
    if (onError !== undefined && typeof onError !== "function") throw new TypeError();
    return Object.freeze(
      onError === undefined ? {} : { onError: onError as (error: UnitStateSubscriptionError) => void },
    );
  } catch {
    throw new TypeError(INVALID_OPTIONS_MESSAGE);
  }
}

function fixedError(
  kind: UnitStateSubscriptionError["kind"],
  retryable: boolean,
  status?: number,
): UnitStateSubscriptionError {
  const message =
    kind === "http"
      ? HTTP_ERROR_MESSAGE
      : kind === "transport"
        ? TRANSPORT_ERROR_MESSAGE
        : kind === "callback"
          ? CALLBACK_ERROR_MESSAGE
          : PROTOCOL_ERROR_MESSAGE;
  const error = new Error(message) as UnitStateSubscriptionError & {
    kind: UnitStateSubscriptionError["kind"];
    retryable: boolean;
    status?: number;
  };
  error.kind = kind;
  error.retryable = retryable;
  if (status !== undefined && Number.isSafeInteger(status) && status >= 100 && status <= 599) error.status = status;
  return Object.freeze(error);
}

function decimalCompare(left: string, right: string): -1 | 0 | 1 {
  if (left.length !== right.length) return left.length < right.length ? -1 : 1;
  if (left === right) return 0;
  return left < right ? -1 : 1;
}

function streamIdCompare(left: string, right: string): -1 | 0 | 1 {
  const leftSeparator = left.indexOf("-");
  const rightSeparator = right.indexOf("-");
  const milliseconds = decimalCompare(left.slice(0, leftSeparator), right.slice(0, rightSeparator));
  return milliseconds === 0
    ? decimalCompare(left.slice(leftSeparator + 1), right.slice(rightSeparator + 1))
    : milliseconds;
}

function parseJsonRecord(data: string): Record<string, unknown> {
  const parsed = JSON.parse(data) as unknown;
  if (!isPlainRecord(parsed)) throw new TypeError();
  return parsed;
}

function parseBatch(data: string): BatchPayload {
  const value = parseJsonRecord(data);
  if (
    !hasOnlyKeys(value, [
      "version",
      "mutation_id",
      "chunk_index",
      "chunk_count",
      "account_id",
      "unit_id",
      "changes",
      "published_at",
    ]) ||
    value.version !== 1 ||
    !boundedString(value.mutation_id, Number.MAX_SAFE_INTEGER) ||
    typeof value.chunk_index !== "number" ||
    !Number.isSafeInteger(value.chunk_index) ||
    value.chunk_index < 0 ||
    typeof value.chunk_count !== "number" ||
    !Number.isSafeInteger(value.chunk_count) ||
    value.chunk_count <= 0 ||
    value.chunk_index >= value.chunk_count ||
    !boundedString(value.account_id, Number.MAX_SAFE_INTEGER) ||
    !boundedString(value.unit_id, Number.MAX_SAFE_INTEGER) ||
    !Array.isArray(value.changes) ||
    value.changes.length === 0 ||
    !validTimestamp(value.published_at)
  ) {
    throw new TypeError();
  }

  const changes = value.changes.map((candidate): BatchChange => {
    if (
      !isPlainRecord(candidate) ||
      !hasOnlyKeys(candidate, ["key", "value", "operation", "revision", "state_ts"]) ||
      !boundedString(candidate.key, Number.MAX_SAFE_INTEGER) ||
      !validValue(candidate.value) ||
      (candidate.operation !== "upsert" && candidate.operation !== "delete") ||
      !validRevision(candidate.revision) ||
      !validTimestamp(candidate.state_ts)
    ) {
      throw new TypeError();
    }
    return Object.freeze({
      key: candidate.key,
      value: candidate.value,
      operation: candidate.operation,
      revision: candidate.revision,
      stateTs: candidate.state_ts,
    });
  });
  return Object.freeze({ unitId: value.unit_id, changes: Object.freeze(changes) });
}

function parseSnapshot(data: string): SnapshotPayload {
  const value = parseJsonRecord(data);
  if (
    !hasOnlyKeys(value, ["version", "mode", "scope", "items"]) ||
    value.version !== 1 ||
    value.mode !== "replace" ||
    !isPlainRecord(value.scope) ||
    !hasOnlyKeys(value.scope, ["unit_id"], ["keys"]) ||
    !boundedString(value.scope.unit_id, Number.MAX_SAFE_INTEGER) ||
    !Array.isArray(value.items)
  ) {
    throw new TypeError();
  }
  let scopeKeys: ReadonlyArray<string> | undefined;
  if (value.scope.keys !== undefined) {
    if (!Array.isArray(value.scope.keys) || value.scope.keys.length === 0) throw new TypeError();
    const normalizedScopeKeys: string[] = [];
    for (const key of value.scope.keys) {
      if (!boundedString(key, Number.MAX_SAFE_INTEGER)) throw new TypeError();
      normalizedScopeKeys.push(key);
    }
    scopeKeys = Object.freeze(normalizedScopeKeys);
  }
  const items = value.items.map((candidate) => {
    if (
      !isPlainRecord(candidate) ||
      !hasOnlyKeys(candidate, ["key", "value", "revision", "state_ts"]) ||
      !boundedString(candidate.key, Number.MAX_SAFE_INTEGER) ||
      !(
        typeof candidate.value === "string" ||
        (typeof candidate.value === "number" && Number.isFinite(candidate.value))
      ) ||
      !validRevision(candidate.revision) ||
      !validTimestamp(candidate.state_ts)
    ) {
      throw new TypeError();
    }
    return Object.freeze({
      key: candidate.key,
      value: candidate.value,
      revision: candidate.revision,
      stateTs: candidate.state_ts,
    });
  });
  return Object.freeze({
    scope: Object.freeze({ unitId: value.scope.unit_id, ...(scopeKeys === undefined ? {} : { keys: scopeKeys }) }),
    items: Object.freeze(items),
  });
}

function parseDeleted(data: string): DeletedPayload {
  const value = parseJsonRecord(data);
  if (
    !hasOnlyKeys(value, ["version", "account_id", "unit_id", "reset_revision", "published_at"]) ||
    value.version !== 1 ||
    !boundedString(value.account_id, Number.MAX_SAFE_INTEGER) ||
    !boundedString(value.unit_id, Number.MAX_SAFE_INTEGER) ||
    !validRevision(value.reset_revision) ||
    !validTimestamp(value.published_at)
  ) {
    throw new TypeError();
  }
  return Object.freeze({ unitId: value.unit_id, resetRevision: value.reset_revision });
}

function parseReset(data: string): void {
  const value = parseJsonRecord(data);
  if (
    !hasOnlyKeys(value, ["version", "reason"]) ||
    value.version !== 1 ||
    (value.reason !== "cursor_expired" && value.reason !== "stream_reset")
  ) {
    throw new TypeError();
  }
}

function parseFrame(frame: SseFrame): ParsedFrame {
  if (frame.id !== undefined && !canonicalStreamId(frame.id)) throw new TypeError();
  switch (frame.event) {
    case "unit_state.batch":
      if (frame.id === undefined) throw new TypeError();
      return { kind: "batch", id: frame.id, payload: parseBatch(frame.data) };
    case "unit_state.snapshot":
      if (frame.id === undefined) throw new TypeError();
      return { kind: "snapshot", id: frame.id, payload: parseSnapshot(frame.data) };
    case "unit_state.unit_deleted":
      if (frame.id === undefined) throw new TypeError();
      return { kind: "deleted", id: frame.id, payload: parseDeleted(frame.data) };
    case "unit_state.reset":
      parseReset(frame.data);
      return { kind: "reset", ...(frame.id === undefined ? {} : { id: frame.id }) };
    default:
      throw new TypeError();
  }
}

class SseByteParser {
  private decoder = new TextDecoder("utf-8", { fatal: true });
  private line = "";
  private lineBytes = 0;
  private linePrefix: number[] = [];
  private frameBytes = 0;
  private event = "";
  private id: string | undefined;
  private data: string[] = [];
  private dataBytes = 0;
  private discarding = false;
  private discardLineBytes = 0;
  private discardLineOnlyCr = false;

  constructor(
    private readonly onFrame: (frame: SseFrame) => void,
    private readonly onProtocolError: () => void,
  ) {}

  private resetFrame(): void {
    this.frameBytes = 0;
    this.event = "";
    this.id = undefined;
    this.data = [];
    this.dataBytes = 0;
  }

  private overflow(discardLineBytes: number, discardLineOnlyCr: boolean): void {
    if (this.discarding) return;
    this.discarding = true;
    this.discardLineBytes = discardLineBytes;
    this.discardLineOnlyCr = discardLineOnlyCr;
    this.line = "";
    this.lineBytes = 0;
    this.linePrefix = [];
    this.decoder = new TextDecoder("utf-8", { fatal: true });
    this.resetFrame();
    this.onProtocolError();
  }

  private addSegment(segment: Uint8Array): void {
    if (segment.length === 0) return;
    if (this.discarding) {
      for (const byte of segment) {
        this.discardLineOnlyCr = this.discardLineBytes === 0 && byte === 13;
        if (this.discardLineBytes > 0 || byte !== 13) this.discardLineOnlyCr = false;
        this.discardLineBytes++;
      }
      return;
    }
    for (let index = 0; index < segment.length && this.linePrefix.length < 5; index++) {
      this.linePrefix.push(segment[index]!);
    }
    this.lineBytes += segment.length;
    const dataLine =
      this.linePrefix.length === 5 &&
      this.linePrefix[0] === 100 &&
      this.linePrefix[1] === 97 &&
      this.linePrefix[2] === 116 &&
      this.linePrefix[3] === 97 &&
      this.linePrefix[4] === 58;
    const lineLimit = dataLine ? MAX_DATA_LINE_BYTES : MAX_DATA_BYTES;
    if (this.lineBytes > lineLimit || this.frameBytes + this.lineBytes > MAX_FRAME_BYTES) {
      this.overflow(this.lineBytes, this.lineBytes === 1 && this.linePrefix[0] === 13);
      return;
    }
    this.line += this.decoder.decode(segment, { stream: true });
  }

  private finishDiscardedLine(): void {
    const blank = this.discardLineBytes === 0 || (this.discardLineBytes === 1 && this.discardLineOnlyCr);
    this.discardLineBytes = 0;
    this.discardLineOnlyCr = false;
    if (blank) this.discarding = false;
  }

  private dispatch(): void {
    if (this.data.length === 0) return;
    this.onFrame(
      Object.freeze({
        event: this.event,
        data: this.data.join("\n"),
        ...(this.id === undefined ? {} : { id: this.id }),
      }),
    );
  }

  private processLine(line: string): void {
    if (line.length === 0) {
      this.dispatch();
      this.resetFrame();
      return;
    }
    if (line.startsWith(":")) return;
    const separator = line.indexOf(":");
    const field = separator < 0 ? line : line.slice(0, separator);
    let value = separator < 0 ? "" : line.slice(separator + 1);
    if (value.startsWith(" ")) value = value.slice(1);
    if (field === "event") this.event = value;
    else if (field === "id" && !value.includes("\0")) this.id = value;
    else if (field === "data") {
      const nextDataBytes =
        this.dataBytes + (this.data.length === 0 ? 0 : 1) + new TextEncoder().encode(value).byteLength;
      if (nextDataBytes > MAX_DATA_BYTES) {
        this.overflow(0, false);
        return;
      }
      this.dataBytes = nextDataBytes;
      this.data.push(value);
    }
  }

  private finishLine(): void {
    if (this.discarding) {
      this.finishDiscardedLine();
      return;
    }
    this.frameBytes += this.lineBytes + 1;
    if (this.frameBytes > MAX_FRAME_BYTES) {
      this.overflow(this.lineBytes, this.lineBytes === 1 && this.line === "\r");
      this.finishDiscardedLine();
      return;
    }
    this.line += this.decoder.decode();
    const complete = this.line.endsWith("\r") ? this.line.slice(0, -1) : this.line;
    this.line = "";
    this.lineBytes = 0;
    this.linePrefix = [];
    this.processLine(complete);
  }

  push(chunk: Uint8Array): void {
    let start = 0;
    for (let index = 0; index < chunk.length; index++) {
      if (chunk[index] !== 10) continue;
      this.addSegment(chunk.subarray(start, index));
      this.finishLine();
      start = index + 1;
    }
    this.addSegment(chunk.subarray(start));
  }

  finish(): void {
    if (!this.discarding) this.line += this.decoder.decode();
  }
}

function buildUrl(baseUrl: string, filter: NormalizedFilter, includeCurrent: boolean): string {
  const url = `${baseUrl}/api/1/units/${encodeURIComponent(filter.unitId)}/states/stream`;
  const query: string[] = [];
  if (filter.keys !== undefined) query.push(`keys=${filter.keys.map((key) => encodeURIComponent(key)).join(",")}`);
  if (includeCurrent) query.push("include_current=true");
  const rawQuery = query.join("&");
  if (new TextEncoder().encode(rawQuery).byteLength > MAX_QUERY_BYTES) throw new TypeError(INVALID_FILTER_MESSAGE);
  return rawQuery.length === 0 ? url : `${url}?${rawQuery}`;
}

function safeCancelBody(response: Response): void {
  try {
    const result = response.body?.cancel();
    if (result !== undefined) void Promise.resolve(result).catch(() => undefined);
  } catch {
    // A late response owns no subscription state.
  }
}

function safeCancelReader(reader: ReadableStreamDefaultReader<Uint8Array> | undefined): void {
  if (reader === undefined) return;
  try {
    void Promise.resolve(reader.cancel()).catch(() => undefined);
  } catch {
    // Reader cancellation is best effort.
  }
}

export function createUnitStateSubscription(
  dependencies: UnitStateSubscriptionDependencies,
  filterInput: UnitStateSubscriptionFilter,
  callback: (event: UnitStateSubscriptionEvent) => void,
  optionsInput?: UnitStateSubscriptionOptions,
): UnitStateSubscriptionHandle {
  const filter = normalizeFilter(filterInput);
  if (typeof callback !== "function") throw new TypeError(INVALID_CALLBACK_MESSAGE);
  const options = normalizeOptions(optionsInput);
  const keyFilter = filter.keys === undefined ? undefined : new Set(filter.keys);
  const revisions = new Map<string, string>();
  const requestUrl = buildUrl(dependencies.baseUrl, filter, filter.includeCurrent);
  const recoveryRequestUrl = buildUrl(dependencies.baseUrl, filter, true);
  const resumeRequestUrl = buildUrl(dependencies.baseUrl, filter, false);
  let hasOpened = false;

  let closed = false;
  let terminal = false;
  let generation = 0;
  let cursor = filter.lastEventId;
  let resetPending = false;
  let retryAttempt = 0;
  let activeAbort: AbortController | undefined;
  let activeReader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  let retryTimer: ReturnType<typeof setTimeout> | undefined;
  let resolveRetry: ((active: boolean) => void) | undefined;

  const active = (expectedGeneration: number): boolean => !closed && !terminal && generation === expectedGeneration;

  let lastError: UnitStateSubscriptionError | undefined;
  const report = (error: UnitStateSubscriptionError): void => {
    if (error.retryable && dependencies.shouldRetry && !dependencies.shouldRetry(error))
      error = fixedError(error.kind, false, error.status);
    lastError = error;
    try {
      const result = (options.onError as ((error: UnitStateSubscriptionError) => unknown) | undefined)?.(error);
      if (result !== undefined) void Promise.resolve(result).catch(() => undefined);
    } catch {
      // Error observers cannot affect delivery or retry ownership.
    }
  };

  const deliver = (event: UnitStateSubscriptionEvent): void => {
    try {
      const result = (callback as (event: UnitStateSubscriptionEvent) => unknown)(event);
      if (result !== undefined) {
        void Promise.resolve(result).catch(() => {
          if (!closed) report(fixedError("callback", false));
        });
      }
    } catch {
      report(fixedError("callback", false));
    }
  };

  const clearRetry = (): void => {
    if (retryTimer !== undefined) {
      try {
        clearTimeout(retryTimer);
      } catch {
        // Resolving the waiter is authoritative.
      }
      retryTimer = undefined;
    }
    const resolve = resolveRetry;
    resolveRetry = undefined;
    resolve?.(false);
  };

  const finish = (): void => {
    if (closed) return;
    closed = true;
    generation++;
    clearRetry();
    try {
      activeAbort?.abort();
    } catch {
      // Fetch cancellation is best effort.
    }
    safeCancelReader(activeReader);
    activeAbort = undefined;
    activeReader = undefined;
  };

  const finishTerminal = (): void => {
    terminal = true;
    finish();
  };

  const updateCursor = (id: string | undefined): boolean => {
    if (id === undefined) return true;
    if (cursor !== undefined && streamIdCompare(id, cursor) <= 0) return false;
    cursor = id;
    return true;
  };

  const scopeMatches = (scope: SnapshotPayload["scope"]): boolean => {
    if (scope.unitId !== filter.unitId) return false;
    if (filter.keys === undefined) return scope.keys === undefined;
    return (
      scope.keys !== undefined &&
      scope.keys.length === filter.keys.length &&
      scope.keys.every((key, index) => key === filter.keys![index])
    );
  };

  const handleFrame = (raw: SseFrame, expectedGeneration: number): void => {
    if (!active(expectedGeneration)) return;
    let parsed: ParsedFrame;
    try {
      parsed = parseFrame(raw);
    } catch {
      report(fixedError("protocol", false));
      return;
    }
    if (parsed.kind === "snapshot") {
      const seenItems = new Set<string>();
      let invalidItems = false;
      for (const item of parsed.payload.items) {
        if (seenItems.has(item.key) || (keyFilter !== undefined && !keyFilter.has(item.key))) invalidItems = true;
        seenItems.add(item.key);
      }
      if (!scopeMatches(parsed.payload.scope) || invalidItems) {
        report(fixedError("protocol", false));
        return;
      }
    }
    if (parsed.kind === "reset") {
      if (!resetPending && !updateCursor(parsed.id)) {
        report(fixedError("protocol", false));
        return;
      }
      resetPending = true;
      return;
    }
    if (resetPending && parsed.kind !== "snapshot") {
      report(fixedError("protocol", false));
      return;
    }
    if (resetPending) cursor = parsed.id;
    else if (!updateCursor(parsed.id)) {
      report(fixedError("protocol", false));
      return;
    }

    if (parsed.kind === "batch") {
      if (parsed.payload.unitId !== filter.unitId) return;
      for (const change of parsed.payload.changes) {
        if (!active(expectedGeneration)) return;
        if (keyFilter !== undefined && !keyFilter.has(change.key)) continue;
        const previous = revisions.get(change.key);
        if (previous !== undefined && decimalCompare(change.revision, previous) <= 0) continue;
        revisions.set(change.key, change.revision);
        deliver(
          Object.freeze({
            type: "change",
            unitId: filter.unitId,
            key: change.key,
            value: change.value,
            operation: change.operation,
            revision: change.revision,
          }),
        );
      }
      return;
    }

    if (parsed.kind === "snapshot") {
      if (filter.keys === undefined) revisions.clear();
      else for (const key of filter.keys) revisions.delete(key);
      const items = parsed.payload.items;
      for (const item of items) revisions.set(item.key, item.revision);
      const publicItems = Object.freeze(items.map((item) => Object.freeze({ ...item })));
      const scope = Object.freeze({
        unitId: filter.unitId,
        ...(filter.keys === undefined ? {} : { keys: filter.keys }),
      });
      resetPending = false;
      deliver(Object.freeze({ type: "snapshot", mode: "replace", scope, items: publicItems }));
      return;
    }

    if (parsed.payload.unitId !== filter.unitId) return;
    terminal = true;
    revisions.clear();
    deliver(
      Object.freeze({
        type: "unit_deleted",
        unitId: filter.unitId,
        resetRevision: parsed.payload.resetRevision,
      }),
    );
    finish();
  };

  const waitForRetry = (expectedGeneration: number): Promise<boolean> => {
    if (!active(expectedGeneration)) return Promise.resolve(false);
    if (lastError && dependencies.shouldRetry && !dependencies.shouldRetry(lastError)) {
      finishTerminal();
      return Promise.resolve(false);
    }
    const baseDelay = Math.min(BASE_RETRY_MS * 2 ** Math.min(retryAttempt, 30), MAX_RETRY_MS);
    retryAttempt++;
    const delay = Math.min(MAX_RETRY_MS, baseDelay + Math.floor(baseDelay * 0.2 * Math.random()));
    return new Promise<boolean>((resolve) => {
      let settled = false;
      const settle = (value: boolean): void => {
        if (settled) return;
        settled = true;
        if (resolveRetry === settle) resolveRetry = undefined;
        retryTimer = undefined;
        resolve(value);
      };
      resolveRetry = settle;
      try {
        retryTimer = setTimeout(() => settle(active(expectedGeneration)), delay);
        try {
          retryTimer.unref?.();
        } catch {
          // Browser timers and hostile timer handles are both valid.
        }
      } catch {
        settle(false);
      }
    });
  };

  const consumeBody = async (response: Response, expectedGeneration: number): Promise<"eof" | "fatal" | "terminal"> => {
    let reader: ReadableStreamDefaultReader<Uint8Array>;
    try {
      if (response.body === null) {
        report(fixedError("transport", true));
        return "fatal";
      }
      reader = response.body.getReader();
      activeReader = reader;
    } catch {
      report(fixedError("transport", true));
      return "fatal";
    }
    const parser = new SseByteParser(
      (frame) => handleFrame(frame, expectedGeneration),
      () => {
        if (active(expectedGeneration)) report(fixedError("protocol", false));
      },
    );
    try {
      return await new Promise<"eof" | "fatal" | "terminal">((resolve) => {
        let settled = false;
        const settle = (outcome: "eof" | "fatal" | "terminal"): void => {
          if (settled) return;
          settled = true;
          resolve(outcome);
        };
        const scheduleRead = (): void => {
          if (settled) return;
          let read: Promise<ReadableStreamReadResult<Uint8Array>>;
          try {
            read = reader.read();
          } catch {
            if (active(expectedGeneration)) report(fixedError("transport", true));
            settle(terminal ? "terminal" : "fatal");
            return;
          }
          void Promise.resolve(read).then(
            (result) => {
              if (settled) return;
              if (!active(expectedGeneration)) {
                settle(terminal ? "terminal" : "fatal");
                return;
              }
              if (result.done) {
                try {
                  parser.finish();
                  settle("eof");
                } catch {
                  report(fixedError("protocol", true));
                  settle("fatal");
                }
                return;
              }
              if (!(result.value instanceof Uint8Array)) {
                report(fixedError("protocol", true));
                settle("fatal");
                return;
              }
              try {
                parser.push(result.value);
              } catch {
                report(fixedError("protocol", true));
                settle("fatal");
                return;
              }
              if (!active(expectedGeneration)) {
                settle(terminal ? "terminal" : "fatal");
                return;
              }
              if (terminal) {
                settle("terminal");
                return;
              }
              scheduleRead();
            },
            () => {
              if (active(expectedGeneration)) report(fixedError("transport", true));
              settle(terminal ? "terminal" : "fatal");
            },
          );
        };
        for (let index = 0; index < READ_AHEAD_WINDOW; index++) scheduleRead();
      });
    } finally {
      if (activeReader === reader) activeReader = undefined;
      safeCancelReader(reader);
    }
  };

  const run = async (expectedGeneration: number): Promise<void> => {
    while (active(expectedGeneration)) {
      const fetchApi = dependencies.fetchApi;
      if (fetchApi === undefined) {
        report(fixedError("transport", true));
        if (!(await waitForRetry(expectedGeneration))) return;
        continue;
      }
      const abort = new AbortController();
      activeAbort = abort;
      const headers = new Headers({ Accept: "text/event-stream" });
      if (cursor !== undefined) headers.set("Last-Event-ID", cursor);
      // Repeating include_current overrides Last-Event-ID on the server and skips replay after an initial snapshot.
      const connectionUrl =
        resetPending && cursor === undefined
          ? recoveryRequestUrl
          : hasOpened && cursor !== undefined
            ? resumeRequestUrl
            : requestUrl;
      let response: Response;
      try {
        response = await fetchApi(connectionUrl, { method: "GET", headers, signal: abort.signal });
      } catch (error) {
        if (activeAbort === abort) activeAbort = undefined;
        if (!active(expectedGeneration)) return;
        const classified = dependencies.classifyFetchError?.(error) ?? fixedError("transport", true);
        report(classified);
        if (!classified.retryable) {
          finishTerminal();
          return;
        }
        if (!(await waitForRetry(expectedGeneration))) return;
        continue;
      }
      if (!active(expectedGeneration)) {
        safeCancelBody(response!);
        return;
      }
      if (response.status !== 200) {
        if (activeAbort === abort) activeAbort = undefined;
        safeCancelBody(response);
        const retryable = response.status < 400 || response.status >= 500;
        report(fixedError("http", retryable, response.status));
        if (!retryable) {
          finishTerminal();
          return;
        }
        if (!(await waitForRetry(expectedGeneration))) return;
        continue;
      }
      let contentType: string | null;
      try {
        contentType = response.headers.get("Content-Type");
      } catch {
        contentType = null;
      }
      if (contentType?.split(";", 1)[0]?.trim().toLowerCase() !== "text/event-stream") {
        if (activeAbort === abort) activeAbort = undefined;
        safeCancelBody(response);
        report(fixedError("protocol", true));
        if (!(await waitForRetry(expectedGeneration))) return;
        continue;
      }
      retryAttempt = 0;
      lastError = undefined;
      hasOpened = true;
      const outcome = await consumeBody(response, expectedGeneration);
      if (activeAbort === abort) activeAbort = undefined;
      if (!active(expectedGeneration) || outcome === "terminal") return;
      if (!(await waitForRetry(expectedGeneration))) return;
    }
  };

  const expectedGeneration = generation;
  void run(expectedGeneration).catch(() => {
    if (!active(expectedGeneration)) return;
    report(fixedError("transport", true));
    finishTerminal();
  });

  return Object.freeze({ close: finish });
}
