import { PageHero } from "@/components/wireframe/PageHero";
import { createFileRoute } from "@tanstack/react-router";
import {
  Breadcrumb,
  IconPH,
  SectionBand,
  SectionHeader,
  Prose,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/empresa")({
  head: () => ({
    meta: [
      { title: "Empresa — Roche Realtors" },
      { name: "description", content: "Más de 30 años de experiencia inmobiliaria en Yucatán." },
      { property: "og:title", content: "Empresa — Roche Realtors" },
    ],
  }),
  component: Empresa,
});

function Empresa() {
  const c = useSiteContent("empresa");

  return (
    <>
      {/* 1. BIENVENIDA (hero + 30 años) */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-6">
        <Breadcrumb items={["Inicio", "Empresa"]} />
      </div>

      <PageHero
        image={c.hero.imagen}
        alt={c.hero.imagenAlt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.titulo}
        subtitle={c.hero.subtitulo}
      />

      <SectionBand>
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <img
            src={c.boutique.imagen}
            alt={c.boutique.imagenAlt}
            className="w-full h-full min-h-[280px] object-cover border border-border rounded-3xl"
          />
          <div>
            <SectionHeader eyebrow={c.boutique.eyebrow} title={c.boutique.titulo} />
            <Prose resumen={c.boutique.resumen} parrafos={c.intro} />
          </div>
        </div>
      </SectionBand>

      {/* 2. ¿POR QUÉ ROCHE REALTORS? */}
      <SectionBand bg="gray">
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <div className="md:order-1 order-2">
            <SectionHeader eyebrow={c.porQueRoche.eyebrow} title={c.porQueRoche.titulo} />
            <Prose resumen={c.porQueRoche.resumen} parrafos={c.porQueRoche.parrafos} />
          </div>
          <div className="md:order-2 order-1">
            <img
              src={c.porQueRoche.imagen}
              alt={c.porQueRoche.imagenAlt}
              className="w-full h-full min-h-[280px] object-cover border border-border rounded-3xl"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {c.pilares.map((p) => (
            <div key={p.title} className="w-full md:w-[calc((100%-3rem)/3)] rounded-3xl border border-border bg-card p-6 hover-lift">
              <div className="mb-3"><IconPH size={48} /></div>
              <div className="text-sm font-semibold mb-2">{p.title}</div>
              <p className="text-xs leading-6 text-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionBand>

      {/* 3. EQUIPO */}
      <SectionBand>
        <SectionHeader title={c.equipoTitulo} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.equipo.map((m) => (
            <div key={m.nombre} className="rounded-3xl overflow-hidden border border-border bg-card flex flex-col hover-lift">
              <img
                src={m.foto}
                alt={`${m.nombre}, ${m.cargo} de Roche Realtors`}
                className="w-full object-cover object-top"
                style={{ aspectRatio: "4 / 3" }}
              />
              <div className="p-5">
                <div className="text-sm font-semibold">{m.nombre}</div>
                <div className="text-xs text-muted-foreground">{m.cargo}</div>
                <p className="mt-3 text-xs leading-6 text-foreground">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBand>

      {/* 4. TESTIMONIOS */}
      <SectionBand bg="gray">
        <SectionHeader title={c.testimoniosTitulo} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.testimonios.map((t, i) => (
            <figure key={i} className="rounded-3xl border border-border bg-card p-6 space-y-4 hover-lift">
              <div className="text-2xl text-muted-foreground">“</div>
              <blockquote className="text-sm leading-7 text-foreground">{t.texto}</blockquote>
              <figcaption className="pt-2 border-t border-border text-xs text-foreground">
                <div className="font-semibold">{t.autor}</div>
                <div className="text-muted-foreground">{t.lugar}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionBand>

      {/* 5. SERVICIOS */}
      <SectionBand>
        <SectionHeader title={c.serviciosTitulo} center />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.servicios.map((s) => (
            <div key={s.title} className="text-center rounded-3xl border border-border p-6 bg-card hover-lift">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                  <img src={s.icon} alt="" aria-hidden className="w-8 h-8 object-contain" loading="lazy" />
                </div>
              </div>
              <div className="text-sm font-semibold mb-2">{s.title}</div>
              <p className="text-xs leading-6 text-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </SectionBand>

      {/* 6. FAQ */}
      <SectionBand bg="gray">
        <SectionHeader title={c.faqTitulo} intro={c.faqIntro} />
        <div className="space-y-10" id="faq">
          {c.faq.map((g) => (
            <div key={g.tema}>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {g.tema}
              </h3>
              <div className="rounded-3xl overflow-hidden border border-border bg-card divide-y divide-border">
                {g.items.map((f, i) => (
                  <details key={i} className="group">
                    <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 text-sm font-semibold">
                      <span>{f.q}</span>
                      <span className="text-muted-foreground group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-7 text-foreground">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBand>

      {/* 7. Agenda una cita (CTA global) */}
      <AgendaCita />
    </>
  );
}
