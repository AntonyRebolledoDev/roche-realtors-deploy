import { useEffect, useCallback } from "react";
import type { Galeria } from "@/content/fichas";

export function Lightbox({
  imagenes,
  index,
  onClose,
  onIndexChange,
}: {
  imagenes: Galeria;
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const total = imagenes.length;
  const anterior = useCallback(
    () => onIndexChange((index - 1 + total) % total),
    [index, total, onIndexChange],
  );
  const siguiente = useCallback(
    () => onIndexChange((index + 1) % total),
    [index, total, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") siguiente();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, anterior, siguiente]);

  const actual = imagenes[index];
  if (!actual) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/90 backdrop-blur-sm px-4 py-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 w-10 h-10 rounded-full border border-border bg-card/80 text-foreground flex items-center justify-center text-lg z-10"
      >
        ✕
      </button>

      {total > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              anterior();
            }}
            aria-label="Imagen anterior"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-card/80 text-foreground flex items-center justify-center text-xl z-10"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              siguiente();
            }}
            aria-label="Imagen siguiente"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-card/80 text-foreground flex items-center justify-center text-xl z-10"
          >
            ›
          </button>
        </>
      )}

      <div
        className="relative max-h-[85vh] max-w-6xl w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {actual.src ? (
          <img
            src={actual.src}
            alt={actual.alt}
            className="max-h-[85vh] w-auto max-w-full object-contain rounded-xl"
          />
        ) : (
          <div className="flex h-[60vh] w-full items-center justify-center rounded-xl bg-card text-sm uppercase tracking-widest text-muted-foreground">
            {actual.alt}
          </div>
        )}
      </div>

      {total > 1 && (
        <div className="mt-4 text-sm text-foreground/80">
          {index + 1} / {total}
        </div>
      )}
    </div>
  );
}
