export class UnitAssetApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(`Asset request failed (${status}: ${code})`);
  }
}

export type AssetRevision<T> = { value: T; etag: string };
export type UploadedUnitAsset = { id: string; url: string; etag?: string };

export class UnitAssets {
  constructor(
    private readonly baseUrl: string,
    private readonly transport: typeof fetch,
  ) {}

  private path(unitId: string, assetId?: string): string {
    return (
      `${this.baseUrl.replace(/\/$/, "")}/api/1/units/${encodeURIComponent(unitId)}/assets` +
      (assetId === undefined ? "" : `/${encodeURIComponent(assetId)}`)
    );
  }

  private async request(url: string, init?: RequestInit): Promise<Response> {
    const response = await this.transport(url, init);
    if (!response.ok) {
      const failure = await response.json().catch(() => ({}));
      throw new UnitAssetApiError(response.status, failure.code ?? failure.error?.code ?? "asset_request_failed");
    }
    return response;
  }

  async fetchJson<T>(unitId: string, assetId: string): Promise<AssetRevision<T>> {
    const response = await this.request(`${this.path(unitId, assetId)}?contentType=json`, { cache: "no-store" });
    const etag = response.headers.get("etag");
    if (!etag) throw new UnitAssetApiError(502, "asset_etag_missing");
    return { value: (await response.json()) as T, etag };
  }

  async saveJson<T>(
    unitId: string,
    filename: string,
    content: T,
    expectedETag: string | null,
  ): Promise<UploadedUnitAsset & { etag: string }> {
    if (expectedETag === undefined) throw new TypeError("expectedETag must be supplied");
    const response = await this.request(this.path(unitId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, content, expectedETag }),
    });
    const saved = (await response.json()) as UploadedUnitAsset;
    if (!saved.etag) throw new UnitAssetApiError(502, "asset_etag_missing");
    return { ...saved, etag: saved.etag };
  }

  async uploadFile(unitId: string, file: Blob, filename: string): Promise<UploadedUnitAsset> {
    const body = new FormData();
    body.append("files", file, filename);
    const response = await this.request(this.path(unitId), { method: "POST", body });
    const saved = (await response.json()) as { items: UploadedUnitAsset[] };
    if (saved.items?.length !== 1) throw new UnitAssetApiError(502, "asset_upload_invalid");
    return saved.items[0];
  }

  async fetchBlob(unitId: string, assetId: string): Promise<Blob> {
    return (await this.request(this.path(unitId, assetId), { cache: "no-store" })).blob();
  }
}
