import { SectionBand, SectionHeader } from "./primitives";
import { useSiteContent } from "@/lib/site-content";

export function AgendaCita() {
  const c = useSiteContent("global").agendaCita;

  return (
    <SectionBand bg="gray">
      <SectionHeader
        title={c.titulo}
        intro={c.intro}
        center
      />

      <div className="overflow-hidden rounded-2xl border border-border">
        <iframe
          src="https://cal.com/rocherealtorsyucatan?theme=dark&layout=month_view"
          frameBorder={0}
          className="w-full"
          style={{ height: 700, minHeight: 600 }}
          title="Agenda una cita con Roche Realtors"
          loading="lazy"
        />
      </div>
    </SectionBand>
  );
}
