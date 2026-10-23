import { useEffect, useState } from "react";
import { SectionBand, SectionHeader } from "./primitives";
import { useSiteContent } from "@/lib/site-content";
import logoRoche from "@/assets/logo-roche-avatar.jpg";

declare global {
  interface Window {
    Cal?: ((...args: unknown[]) => void) & {
      loaded?: boolean;
      ns?: Record<string, unknown>;
      q?: unknown[];
    };
  }
}

// Pestañas propias en vez de la lista de tipos de cita de Cal.com: esa
// pantalla siempre muestra la duración (p. ej. "60m") y Cal.com no expone
// ninguna opción de embed para ocultarla. Al apuntar cada pestaña a su
// tipo de cita específico, el usuario cae directo al calendario — ahí
// `hideEventTypeDetails` sí aplica.
const TIPOS_CITA = [
  { clave: "presencial", label: "Cita presencial", calLink: "rocherealtorsyucatan/cita-presencial" },
  { clave: "whatsapp", label: "WhatsApp", calLink: "rocherealtorsyucatan/whatsapp" },
  { clave: "videollamada", label: "Videollamada (Google Meet)", calLink: "rocherealtorsyucatan/40min" },
] as const;

/** Inyecta el SDK de Cal.com solo una vez, sin importar cuántos embeds se monten. */
function cargarCalSdk() {
  if (window.Cal) return;
  (function (C: Window, A: string, L: string) {
    const p = (a: NonNullable<Window["Cal"]>, ar: unknown[]) => a.q!.push(ar);
    const d = document;
    C.Cal =
      C.Cal ||
      (function (...args: unknown[]) {
        const cal = C.Cal!;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = [];
          const s = d.createElement("script");
          s.src = A;
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api: NonNullable<Window["Cal"]> = (...a: unknown[]) => p(api, a);
          api.q = [];
          const ns = args[1] as string | undefined;
          if (typeof ns === "string") {
            (cal.ns![ns] as typeof api) = api;
            p(api, args as unknown[]);
          } else {
            p(cal, args as unknown[]);
          }
          return;
        }
        p(cal, args as unknown[]);
      });
  })(window, "https://app.cal.com/embed/embed.js", "init");
  window.Cal!("init", { origin: "https://cal.com" });
}

function CalInline({ calLink, elementId }: { calLink: string; elementId: string }) {
  useEffect(() => {
    cargarCalSdk();
    window.Cal!("inline", {
      elementOrSelector: `#${elementId}`,
      calLink,
      config: { layout: "month_view" },
    });
    window.Cal!("ui", {
      theme: "dark",
      hideEventTypeDetails: true,
      layout: "month_view",
    });
    // Cada pestaña monta una instancia nueva (key distinto en el padre), así
    // que este efecto corre una sola vez por pestaña — no hace falta guard.
  }, [calLink, elementId]);

  return (
    <div
      id={elementId}
      className="w-full rounded-2xl border border-border overflow-hidden"
      // El SDK de Cal auto-redimensiona este div vía postMessage; sin altura fija
    />
  );
}

export function AgendaCita() {
  const c = useSiteContent("global").agendaCita;
  const [activa, setActiva] = useState<(typeof TIPOS_CITA)[number]["clave"] | null>(null);
  const tipo = TIPOS_CITA.find((t) => t.clave === activa);

  return (
    <SectionBand bg="gray">
      <SectionHeader title={c.titulo} intro={c.intro} center />
      <div className="mx-auto mb-6 max-w-xl rounded-2xl border border-border bg-ink p-6">
        <div className="h-14 w-14 overflow-hidden rounded-full">
          <img src={logoRoche} alt="Roche Realtors" className="h-full w-full object-cover" />
        </div>
        <div className="mt-4 text-sm font-semibold uppercase tracking-tight text-foreground">
          Roche Realtors
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">Roche Realtors</strong> es una
          inmobiliaria boutique con{" "}
          <strong className="font-semibold text-foreground">más de 30 años de experiencia</strong>{" "}
          en bienes raíces e inversión inmobiliaria en Mérida y Yucatán. Asesoramos a familias,
          inversionistas y compradores con conocimiento del mercado local y atención personalizada.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          ¿Buscas comprar, vender o invertir en Yucatán? Agenda tu asesoría.
        </p>
      </div>
      <div className="mx-auto mb-6 max-w-xl overflow-hidden rounded-2xl border border-border divide-y divide-border">
        {TIPOS_CITA.map((t) => (
          <button
            key={t.clave}
            onClick={() => setActiva(t.clave)}
            className={`flex w-full items-center justify-between px-5 py-4 text-left transition-colors ${
              activa === t.clave ? "bg-card" : "hover:bg-card/60"
            }`}
          >
            <span
              className={`text-sm font-semibold uppercase tracking-tight ${
                activa === t.clave ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t.label}
            </span>
            <span
              aria-hidden
              className={activa === t.clave ? "text-gold" : "text-muted-foreground"}
            >
              →
            </span>
          </button>
        ))}
      </div>
      {tipo && (
        <CalInline key={tipo.clave} calLink={tipo.calLink} elementId={`cal-embed-roche-${tipo.clave}`} />
      )}
    </SectionBand>
  );
}
