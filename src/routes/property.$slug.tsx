import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bath, BedDouble, Calendar, Check, Coffee, Heart, Mail, MapPin, MessageCircle, Phone, Star, Users, Waves, Wifi } from "lucide-react";
import { Footer } from "@/components/site";
import { getProperty, inr, useFavorites } from "@/lib/properties";

export const Route = createFileRoute("/property/$slug")({
  loader: ({ params }) => {
    const p = getProperty(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => ({
    meta: p
      ? [
          { title: `${p.name} — Malina Holidays` },
          { name: "description", content: `${p.bedrooms} BHK villa in ${p.location}, Goa from ${inr(p.price)}/night.` },
          { property: "og:title", content: `${p.name} — Malina Holidays` },
          { property: "og:description", content: `${p.bedrooms} BHK villa in ${p.location}, Goa.` },
          { property: "og:image", content: p.image },
          { name: "twitter:image", content: p.image },
        ]
      : [{ title: "Villa not found" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();
  const router = useRouter();
  const { favs, toggle } = useFavorites();
  const fav = favs.includes(p.slug);
  const amenities = ["Private pool", "Inverter back-up", "Daily housekeeping", "WiFi", "24hrs security", "Fully equipped kitchen"];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-4 text-sm">
          <button onClick={() => router.history.back()} className="flex items-center gap-2 text-base font-semibold text-primary"><ArrowLeft className="h-5 w-5" />Back</button>
          <p className="truncate text-muted-foreground"><Link to="/">Malina Holidays</Link> › Goa Collection › {p.name}</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={p.image} alt={p.name} className="aspect-[16/8] w-full object-cover" />
          <button onClick={() => toggle(p.slug)} aria-label="Save" className="absolute right-5 top-5 rounded-full bg-card/90 p-3">
            <Heart className={`h-5 w-5 ${fav ? "fill-destructive text-destructive" : "text-primary"}`} />
          </button>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="flex gap-2">
            {[p.type === "Stand-alone villa" ? "Private Villa" : "Gated Estate", "Luxury"].map((t) => (
              <span key={t} className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase text-primary-foreground">{t}</span>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-bold text-primary md:text-5xl">{p.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-lg text-muted-foreground"><MapPin className="h-5 w-5 text-accent" />{p.location}, Goa</p>
          <p className="mt-2 flex items-center gap-1">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-accent text-accent" />)}<span className="ml-2 font-semibold">{p.rating}</span></p>

          <div className="mt-8 flex flex-wrap gap-8 rounded-3xl bg-muted px-8 py-6">
            {[[Users, `Upto ${p.guests}`, "Guests"], [BedDouble, p.bedrooms, "Bedrooms"], [Bath, p.bathrooms, "Bathrooms"], [Waves, 1, "Pool"]].map(([I, v, l]: any) => (
              <div key={l} className="flex items-center gap-3"><I className="h-6 w-6 text-accent" /><div><p className="font-semibold">{v}</p><p className="text-sm text-muted-foreground">{l}</p></div></div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-6 font-medium">
            <span className="flex items-center gap-2"><Coffee className="h-4 w-4 text-accent" />Complimentary Breakfast</span>
            <span className="flex items-center gap-2"><Wifi className="h-4 w-4 text-accent" />Unlimited WiFi</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" />Check In 2 PM · Check Out 11 AM</span>
          </div>

          <section className="mt-12 border-t border-border pt-10">
            <h2 className="text-3xl font-bold text-primary">About the Villa</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.name} is a beautiful {p.bedrooms}-bedroom {p.type.toLowerCase()} located in {p.location}, Goa. It offers a private pool, inverter back-up and modern amenities for a comfortable stay — perfect for families and groups of up to {p.guests} looking for a luxurious escape.</p>
          </section>

          <section className="mt-12 border-t border-border pt-10">
            <h2 className="text-3xl font-bold text-primary">Bedroom Details</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
              {Array.from({ length: p.bedrooms }).map((_, k) => (
                <div key={k} className="rounded-2xl border border-border bg-muted p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Room {k + 1}</p>
                  <BedDouble className="mx-auto my-3 h-7 w-7 text-accent" />
                  <p className="font-semibold">Double Bed</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-border pt-10">
            <h2 className="text-3xl font-bold text-primary">Amenities</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3">
              {amenities.map((a) => <p key={a} className="flex items-center gap-3 text-lg"><Check className="h-4 w-4 text-accent" />{a}</p>)}
            </div>
          </section>

          <div className="mt-12 rounded-3xl bg-primary py-10 text-center text-primary-foreground">
            <p className="text-sm font-semibold uppercase tracking-widest">Starting from</p>
            <p className="mt-2 font-display text-5xl font-bold">{inr(p.price)}</p>
            <p className="mt-2 text-sm">per night, excluding taxes</p>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-muted px-6 py-10 text-center">
            <h2 className="text-3xl font-bold text-primary">Contact Malina Holidays</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">Interested in booking {p.name}? Our travel advisors are on hand to craft your perfect escape.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="tel:+919315572283" className="flex items-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground"><Phone className="h-5 w-5" />+91 93155 72283</a>
              <a href="mailto:concierge@malinaholidays.com" className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-4 font-semibold"><Mail className="h-5 w-5" />Email Concierge</a>
              <a href={`https://wa.me/919315572283?text=${encodeURIComponent("Hi, I'm interested in " + p.name)}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-whatsapp px-6 py-4 font-semibold text-primary-foreground"><MessageCircle className="h-5 w-5" />WhatsApp</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
