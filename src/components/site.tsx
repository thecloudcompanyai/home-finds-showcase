import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, MapPin, Star } from "lucide-react";
import { useRef } from "react";
import { inr, type Property } from "@/lib/properties";

export function Header() {
  const nav = "relative py-1 text-foreground transition-colors hover:text-accent";
  const active = { className: "text-accent border-b-2 border-accent" };
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-3xl font-bold text-primary">
          Malina <span className="text-accent">Holidays</span>
        </Link>
        <nav className="flex gap-8 text-base font-medium">
          <Link to="/" className={nav} activeProps={active} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/favorites" className={nav} activeProps={active}>Favorites</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const cols = [
    ["Destinations", ["Assagao", "Siolim", "Anjuna", "Vagator"]],
    ["Collections", ["Stand-alone Villas", "Estate Villas", "Top Rated", "Big Group Getaways"]],
    ["Support", ["+91 82878 40116", "Email Concierge", "WhatsApp", "Live Chat"]],
  ] as const;
  return (
    <footer className="mx-auto mt-24 max-w-7xl bg-primary px-8 py-14 text-primary-foreground md:rounded-t-3xl">
      <div className="grid gap-10 md:grid-cols-4">
        {cols.map(([t, items]) => (
          <div key={t}>
            <h4 className="font-display text-lg uppercase tracking-widest text-accent">{t}</h4>
            <ul className="mt-5 space-y-3">{items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
        <div>
          <h4 className="font-display text-lg uppercase tracking-widest text-accent">Malina Holidays</h4>
          <p className="mt-5 text-primary-foreground/50">Curating exceptional villa experiences across India's most beautiful destinations since 2018.</p>
        </div>
      </div>
      <p className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/50">© 2026 Malina Holidays. All rights reserved.</p>
    </footer>
  );
}

export function PropertyCard({ p, fav, onFav }: { p: Property; fav?: boolean; onFav?: () => void }) {
  return (
    <Link to="/property/$slug" params={{ slug: p.slug }} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-md bg-accent/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
          {p.type === "Stand-alone villa" ? "Private Villa" : "Gated Estate"}
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-md bg-primary/70 px-2 py-1 text-sm text-primary-foreground">
          <Star className="h-3 w-3 fill-accent text-accent" /> {p.rating}
        </span>
        {onFav && (
          <button
            aria-label="Save to favorites"
            onClick={(e) => { e.preventDefault(); onFav(); }}
            className="absolute bottom-4 right-4 rounded-full bg-card/90 p-2 transition hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-destructive text-destructive" : "text-primary"}`} />
          </button>
        )}
      </div>
      <p className="mt-4 flex items-center gap-1 text-sm font-medium text-accent"><MapPin className="h-3.5 w-3.5" />{p.location}, Goa</p>
      <h3 className="mt-1.5 text-lg font-bold text-primary line-clamp-1">{p.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{p.bedrooms} BR · Upto {p.guests} Guests</p>
      <p className="mt-2 text-lg font-semibold text-primary">{inr(p.price)} <span className="text-sm font-normal text-muted-foreground">/night</span></p>
    </Link>
  );
}

export function Row({ id, title, subtitle, items, favs, onFav }: { id: string; title: string; subtitle: string; items: Property[]; favs: string[]; onFav: (s: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Link to="/category/$id" params={{ id }} className="hover:text-accent"><h2 className="text-3xl font-bold text-primary transition-colors hover:text-accent md:text-4xl">{title}</h2></Link>
          <p className="mt-2 text-muted-foreground">{subtitle} · {items.length} stays</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/category/$id" params={{ id }} className="mr-3 border-b border-primary font-semibold text-primary hover:border-accent hover:text-accent">View All →</Link>
          {[-1, 1].map((d) => (
            <button key={d} onClick={() => scroll(d)} aria-label={d < 0 ? "Previous" : "Next"} className="rounded-full border border-border bg-card p-2.5 shadow-sm transition hover:border-accent hover:text-accent">
              {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </div>
      <div ref={ref} className="scrollbar-none mt-8 flex snap-x gap-6 overflow-x-auto">
        {items.map((p) => (
          <div key={p.slug} className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-18px)]">
            <PropertyCard p={p} fav={favs.includes(p.slug)} onFav={() => onFav(p.slug)} />
          </div>
        ))}
      </div>
    </section>
  );
}
