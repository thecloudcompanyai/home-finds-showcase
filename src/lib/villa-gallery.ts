import { resolveAssetUrls } from "@/lib/asset-url";

const albums = import.meta.glob<string[]>("../data/villa-galleries/*.json", { import: "default" });

export async function loadVillaGallery(slug: string, cover: string): Promise<string[]> {
  const load = albums[`../data/villa-galleries/${slug}.json`];
  if (!load) return [cover];
  const images = await load();
  return images.length ? resolveAssetUrls(images) : [cover];
}