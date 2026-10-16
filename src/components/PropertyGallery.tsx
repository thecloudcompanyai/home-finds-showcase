import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function PropertyGallery({ name, images, favorite, onFavorite }: {
  name: string;
  images: string[];
  favorite: boolean;
  onFavorite: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const current = images[index] ?? images[0];
  const navigate = (direction: number) => setIndex((value) => (value + direction + images.length) % images.length);
  const arrows = (
    <>
      <Button variant="secondary" size="icon" title="Previous photo" aria-label="Previous photo" onClick={() => navigate(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/95 text-primary"><ChevronLeft /></Button>
      <Button variant="secondary" size="icon" title="Next photo" aria-label="Next photo" onClick={() => navigate(1)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/95 text-primary"><ChevronRight /></Button>
    </>
  );
  return (
    <div>
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <img src={current} alt={`${name} — photo ${index + 1}`} className="aspect-[4/3] w-full object-cover md:aspect-[16/8]" fetchPriority="high" />
        <Button variant="secondary" size="icon" onClick={onFavorite} aria-label={favorite ? "Remove from favorites" : "Save to favorites"} title="Save villa" className="absolute right-4 top-4 bg-card/95">
          <Heart className={favorite ? "fill-destructive text-destructive" : "text-primary"} />
        </Button>
        {images.length > 1 && arrows}
        <div className="absolute bottom-3 left-3 rounded-md bg-primary/80 px-3 py-1.5 text-sm text-primary-foreground" aria-live="polite">{index + 1} / {images.length}</div>
        <Button variant="secondary" size="icon" aria-label="Enlarge photo" title="Enlarge photo" onClick={() => setOpen(true)} className="absolute bottom-3 right-3 bg-card/95"><Expand /></Button>
      </div>
      {images.length > 1 && (
        <div className="scrollbar-none mt-3 flex gap-3 overflow-x-auto pb-2" aria-label="Villa photos">
          {images.map((image, i) => (
            <Button key={image} variant="ghost" onClick={() => setIndex(i)} aria-label={`View photo ${i + 1}`} aria-pressed={i === index} className={`h-20 w-28 shrink-0 overflow-hidden rounded-md border-2 p-0 hover:bg-transparent ${i === index ? "border-accent" : "border-transparent"}`}>
              <img src={image} alt={`${name} thumbnail ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
            </Button>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-24px)] max-w-6xl p-4 pt-10" aria-describedby={undefined} onKeyDown={(event) => {
          if (event.key === "ArrowLeft") navigate(-1);
          if (event.key === "ArrowRight") navigate(1);
        }}>
          <DialogTitle className="sr-only">{name} photos</DialogTitle>
          <div className="relative bg-muted">
            <img src={current} alt={`${name} — enlarged photo ${index + 1}`} className="h-[65vh] w-full object-contain" />
            {images.length > 1 && arrows}
          </div>
          <p className="text-center text-sm text-muted-foreground">{index + 1} / {images.length}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}