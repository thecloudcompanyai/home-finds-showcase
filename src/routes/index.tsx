import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, ShieldCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Footer, Header, Row } from "@/components/site";
import { bhkGroups, collections, properties, useFavorites, type Property } from "@/lib/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Malina Holidays — Luxury Villas in Goa" },
      { name: "description", content: "Browse 150 handpicked luxury villas in Goa by BHK and curated collections." },
      { property: "og:title", content: "Malina Holidays — Luxury Villas in Goa" },
      { property: "og:description", content: "Browse 150 handpicked luxury villas in Goa by BHK and curated collections." },
    ],
  }),
  component: Index,
});

const slides = [
  { tag: "Private Pools", script: "Escape", title: "Stand-alone Villas", text: "Your own piece of Goa — no neighbours, just palms and quiet.", p: (properties.find((p) => p.type === "Stand-alone villa")!) as Property },
  { tag: "Top Rated", script: "Unwind", title: "Five-Star Stays", text: "Homes our guests rate a perfect five, every time.", p: (properties[1]) as Property },
  { tag: "Groups & Families", script: "Gather", title: "Big Group Getaways", text: "Spacious villas built for long dinners and loud laughter.", p: (properties.find((p) => p.guests >= 8) ?? properties[2]) as Property },
  { tag: "North Goa", script: "Restore", title: "Assagao Retreats", text: "Leafy lanes, slow mornings and Goa's best cafés nearby.", p: (properties.find((p) => p.location === "Assagao")!) as Property },
];

function Index() {
  const [i, setI] = useState(0);
  const { favs, toggle } = useFavorites();
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative mx-auto h-[78vh] min-h-[520px] max-w-7xl overflow-hidden md:mt-0">
        {slides.map((s, k) => (
          <div key={k} className={`absolute inset-0 transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`}>
            <img src={s.p.image} alt={s.title} className={`h-full w-full object-cover transition-transform duration-[6000ms] ${k === i ? "scale-105" : "scale-100"}`} />
            <div className="hero-fade absolute inset-0" />
            <div className="absolute inset-y-0 right-0 flex max-w-xl flex-col items-end justify-center px-10 text-right text-primary-foreground">
              <span className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur">{s.tag}</span>
              <p className="mt-6 font-display text-6xl italic text-accent md:text-7xl">{s.script}</p>
              <h1 className="text-5xl font-bold md:text-6xl">{s.title}</h1>
              <p className="mt-4 text-lg italic text-primary-foreground/90">{s.text}</p>
              <Link to="/property/$slug" params={{ slug: s.p.slug }} className="mt-8 rounded-full bg-accent px-8 py-3.5 font-semibold text-primary transition hover:brightness-110">Explore Villa</Link>
            </div>
          </div>
        ))}
        {[-1, 1].map((d) => (
          <button key={d} onClick={() => go(d)} aria-label="Slide" className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-primary/40 p-3 text-primary-foreground backdrop-blur transition hover:bg-primary/70 ${d < 0 ? "left-6" : "right-6"}`}>
            {d < 0 ? <ChevronLeft /> : <ChevronRight />}
          </button>
        ))}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} className={`h-2.5 rounded-full transition-all ${k === i ? "w-9 bg-accent" : "w-2.5 bg-primary-foreground/60"}`} />
          ))}
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 bg-secondary px-6 py-10 text-center">
        {[[Heart, "2 Lakh+", "Happy guests"], [Star, "4.9/5", "Average rating"], [ShieldCheck, "97%", "Return guests"]].map(([Icon, v, l]: any) => (
          <div key={v} className="flex flex-col items-center gap-1 md:flex-row md:justify-center md:gap-4">
            <Icon className="h-7 w-7 text-accent" />
            <div><p className="font-display text-3xl font-bold text-primary">{v}</p><p className="text-sm text-muted-foreground">{l}</p></div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Browse by size</p>
      </div>
      {bhkGroups.map((g) => (
        <Row key={g.bhk} title={`${g.bhk} BHK Villas`} subtitle={`Perfect for up to ${g.items[0]?.guests ?? 4}+ guests`} items={g.items} favs={favs} onFav={toggle} />
      ))}

      <div className="mx-auto mt-28 max-w-7xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Curated collections</p>
      </div>
      {collections.map((c) => (
        <Row key={c.id} title={c.title} subtitle={c.subtitle} items={c.items} favs={favs} onFav={toggle} />
      ))}
      <Footer />
    </div>
  );
}
