import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "./Reveal";

export type GaleriaItem = { src: string; alt: string; caption?: string };

/** Carrusel de galería de imágenes con navegación y puntos. */
export function GaleriaCarrusel({ items }: { items: GaleriaItem[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <Reveal>
      <div className="relative">
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="flex">
            {items.map((it) => (
              <div
                key={it.src}
                className="relative min-w-0 shrink-0 grow-0 basis-full md:basis-[68%] lg:basis-[55%] pr-4"
              >
                <figure className="group relative overflow-hidden rounded-3xl bg-secondary">
                  <img
                    src={it.src}
                    alt={it.alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    style={{ aspectRatio: "16 / 10" }}
                  />
                  {it.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 pt-16 text-sm tracking-tight text-foreground">
                      {it.caption}
                    </figcaption>
                  )}
                </figure>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Anterior"
          onClick={() => embla?.scrollPrev()}
          className="absolute left-4 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-md text-lg shadow-sm transition-transform hover:scale-105"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => embla?.scrollNext()}
          className="absolute right-8 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-md text-lg shadow-sm transition-transform hover:scale-105"
        >
          ›
        </button>

        <div className="mt-6 flex justify-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.src}
              type="button"
              aria-label={`Ir a la imagen ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selected ? "w-7 bg-gold" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
