import { useState } from "react";
import { MessageCircle } from "lucide-react";

const field = "w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-accent";

export function BookingForm({ villa, maxGuests }: { villa: string; maxGuests: number }) {
  const [f, setF] = useState({ name: "", phone: "", checkIn: "", checkOut: "", guests: "2", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      "*New Booking Enquiry*",
      `Villa: ${villa}`,
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Check-in: ${f.checkIn}`,
      `Check-out: ${f.checkOut}`,
      `Guests: ${f.guests}`,
      f.message && `Message: ${f.message}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/918287840116?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <form onSubmit={submit} className="mt-8 rounded-3xl border border-border bg-muted px-6 py-10 md:px-10">
      <h2 className="text-center text-3xl font-bold text-primary">Book Your Stay</h2>
      <p className="mt-2 text-center text-muted-foreground">Fill in your details and we'll confirm on WhatsApp.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">Full name<input required value={f.name} onChange={set("name")} className={field + " mt-1"} maxLength={80} /></label>
        <label className="text-sm font-medium">Phone<input required type="tel" value={f.phone} onChange={set("phone")} className={field + " mt-1"} maxLength={20} /></label>
        <label className="text-sm font-medium">Check-in<input required type="date" min={today} value={f.checkIn} onChange={set("checkIn")} className={field + " mt-1"} /></label>
        <label className="text-sm font-medium">Check-out<input required type="date" min={f.checkIn || today} value={f.checkOut} onChange={set("checkOut")} className={field + " mt-1"} /></label>
        <label className="text-sm font-medium md:col-span-2">Guests
          <select value={f.guests} onChange={set("guests")} className={field + " mt-1"}>
            {Array.from({ length: maxGuests }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium md:col-span-2">Message (optional)<textarea value={f.message} onChange={set("message")} rows={3} maxLength={500} className={field + " mt-1"} /></label>
      </div>
      <button type="submit" className="mx-auto mt-8 flex items-center gap-2 rounded-xl bg-whatsapp px-8 py-4 font-semibold text-primary-foreground"><MessageCircle className="h-5 w-5" />Book on WhatsApp</button>
    </form>
  );
}
