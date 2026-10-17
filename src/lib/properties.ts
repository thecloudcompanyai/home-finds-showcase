import data from "@/data/properties.json";
import coverData from "@/data/villa-covers.json";
import { useEffect, useState } from "react";

export type Property = {
  slug: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  image: string;
  images?: string[];
  original: string;
  type: string;
};

const covers: Record<string, string> = coverData;
export const properties: Property[] = (data as Property[]).map((property) => {
  return { ...property, image: covers[property.slug] ?? property.image };
});
export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const bhkGroups = [2, 3, 4, 5]
  .map((b) => ({ bhk: b, items: properties.filter((p) => p.bedrooms === b) }))
  .filter((g) => g.items.length);

export const collections = [
  { id: "standalone", title: "Stand-alone Villas", subtitle: "Complete privacy, all to yourself", items: properties.filter((p) => p.type === "Stand-alone villa") },
  { id: "estate", title: "Estate Villas", subtitle: "Gated estates with shared comforts", items: properties.filter((p) => p.type === "Villa in estate") },
  { id: "toprated", title: "Top Rated", subtitle: "Perfect 5-star stays loved by guests", items: properties.filter((p) => p.rating >= 5) },
  { id: "value", title: "Under ₹10,000", subtitle: "Luxury that stays kind to your wallet", items: properties.filter((p) => p.price < 10000) },
  { id: "large", title: "Big Group Getaways", subtitle: "Space for 8 guests or more", items: properties.filter((p) => p.guests >= 8) },
].filter((c) => c.items.length);

const KEY = "malina-favs";
export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    setFavs(JSON.parse(localStorage.getItem(KEY) || "[]"));
  }, []);
  const toggle = (slug: string) => {
    const next = favs.includes(slug) ? favs.filter((s) => s !== slug) : [...favs, slug];
    setFavs(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };
  return { favs, toggle };
}

export function getCategory(id: string) {
  const b = bhkGroups.find((g) => `${g.bhk}-bhk` === id);
  if (b) return { title: `${b.bhk} BHK Villas`, subtitle: `All ${b.bhk} bedroom stays in Goa`, items: b.items };
  return collections.find((c) => c.id === id);
}
