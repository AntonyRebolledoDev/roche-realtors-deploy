import { useEffect, useRef } from "react";
import { SectionBand, SectionHeader } from "./primitives";
import { useSiteContent } from "@/lib/site-content";

declare global {
  interface Window {
    Cal?: ((...args: unknown[]) => void) & {
      loaded?: boolean;
      ns?: Record<string, unknown>;
      q?: unknown[];
    };
  }
}

function CalInline() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Inyectar el SDK de Cal.com solo una vez
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
    window.Cal!("inline", {
      elementOrSelector: "#cal-embed-roche",
      calLink: "rocherealtorsyucatan",
      config: { layout: "month_view" },
    });
    window.Cal!("ui", {
      theme: "dark",
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <div
      id="cal-embed-roche"
      className="w-full rounded-2xl border border-border overflow-hidden"
      // El SDK de Cal auto-redimensiona este div vía postMessage; sin altura fija
    />
  );
}

export function AgendaCita() {
  const c = useSiteContent("global").agendaCita;

  return (
    <SectionBand bg="gray">
      <SectionHeader title={c.titulo} intro={c.intro} center />
      <CalInline />
    </SectionBand>
  );
}
