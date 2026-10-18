const ASSET_ORIGIN = (import.meta.env.VITE_ASSET_ORIGIN as string | undefined)?.replace(/\/$/, "") ?? "";

const LOVABLE_ASSET_PREFIX = "/__l5e/";

export function resolveAssetUrl(url: string): string {
  if (!url || !url.startsWith(LOVABLE_ASSET_PREFIX)) return url;
  if (!ASSET_ORIGIN) return url;
  return `${ASSET_ORIGIN}${url}`;
}

export function resolveAssetUrls(urls: string[]): string[] {
  return urls.map(resolveAssetUrl);
}
