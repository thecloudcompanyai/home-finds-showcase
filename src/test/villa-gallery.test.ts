import { describe, expect, it } from "vitest";
import { properties, getProperty } from "@/lib/properties";
import { loadVillaGallery } from "@/lib/villa-gallery";

describe("Deferred villa albums", () => {
  it("keeps all listing data cover-only", () => {
    expect(properties).toHaveLength(150);
    expect(properties.every((property) => property.images === undefined)).toBe(true);
  });

  it("loads only the requested villa album with its matching cover", async () => {
    const slug = "refined-2-bedroom-villa-in-siolim";
    const property = getProperty(slug);
    if (!property) throw new Error("Expected villa is missing");
    const images = await loadVillaGallery(slug, property.image);
    expect(images).toHaveLength(24);
    expect(images[0]).toBe(property.image);
    expect(images.every((image) => image.includes(slug))).toBe(true);
  });

  it("keeps the cover for villas without supplied albums", async () => {
    expect(await loadVillaGallery("villa-without-album", "cover.jpg")).toEqual(["cover.jpg"]);
  });
});