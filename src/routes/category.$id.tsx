import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Footer, Header, PropertyCard } from "@/components/site";
import { getCategory, useFavorites } from "@/lib/properties";

export const Route = createFileRoute("/category/$id")({
  loader: ({ params }) => {
    const c = getCategory(params.id);
    if (!c) throw notFound();
    return { title: c.title, subtitle: c.subtitle };
  },
  head: ({ loaderData: c }) => ({
    meta: c
      ? [
          { title: `${c.title} in Goa — Malina Holidays` },
          { name: "description", content: `${c.subtitle}. Browse all ${c.title.toLowerCase()} on Malina Holidays.` },
          { property: "og:title", content: `${c.title} in Goa — Malina Holidays` },
          { property: "og:description", content: c.subtitle },
        ]
      : [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: Category,
});

function Category() {
  const { id } = Route.useParams();
  const c = getCategory(id)!;
  const { favs, toggle } = useFavorites();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-14">
        <Link to="/" className="text-sm font-medium text-accent">← All categories</Link>
        <h1 className="mt-3 text-4xl font-bold text-primary md:text-5xl">{c.title}</h1>
        <p className="mt-2 text-muted-foreground">{c.subtitle} · {c.items.length} stays</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((p) => <PropertyCard key={p.slug} p={p} fav={favs.includes(p.slug)} onFav={() => toggle(p.slug)} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
}
