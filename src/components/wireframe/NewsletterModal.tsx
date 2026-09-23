import { useEffect, useState } from "react";
import { ImagePH } from "./primitives";
import { NewsletterForm } from "./NewsletterForm";

const STORAGE_KEY = "rr_newsletter_seen_v1";

export function NewsletterModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        const t = window.setTimeout(() => setOpen(true), 800);
        return () => window.clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-card border border-border shadow-xl">
        <button
          onClick={close}
          aria-label="Cerrar"
          className="absolute top-3 right-3 w-9 h-9 border border-border bg-card text-foreground flex items-center justify-center text-lg z-10"
        >
          ✕
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="min-h-56">
            <ImagePH label="IMAGEN NEWSLETTER" height={"100%"} className="h-full min-h-56" />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center gap-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Newsletter
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Reciba nuestras novedades
            </h2>
            <p className="text-sm text-muted-foreground">
              Inteligencia de mercado y propiedades destacadas, directo a su correo.
            </p>
            <NewsletterForm variant="block" textoBoton="Suscribirse" />
            <div className="flex items-center gap-3">
              <button
                onClick={close}
                className="text-xs uppercase tracking-wider text-muted-foreground underline"
              >
                Ahora no
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
