import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer, Header, PropertyCard } from "@/components/site";
import { properties, useFavorites } from "@/lib/properties";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Your Favorites — Malina Holidays" },
      { name: "description", content: "Villas you've saved on Malina Holidays." },
      { property: "og:title", content: "Your Favorites — Malina Holidays" },
      { property: "og:description", content: "Villas you've saved on Malina Holidays." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { favs, toggle } = useFavorites();
  const list = properties.filter((p) => favs.includes(p.slug));
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-bold text-primary">Your Favorites</h1>
        {list.length === 0 ? (
          <p className="mt-6 text-muted-foreground">No saved villas yet. <Link to="/" className="text-accent underline">Start exploring</Link></p>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => <PropertyCard key={p.slug} p={p} fav onFav={() => toggle(p.slug)} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
