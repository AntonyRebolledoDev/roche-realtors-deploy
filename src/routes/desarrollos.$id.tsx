import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BtnPH,
  ImagePH,
  Reveal,
  SectionBand,
  SectionHeader,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { DESARROLLO_DEMO, type Desarrollo } from "@/content/fichas";

export const Route = createFileRoute("/desarrollos/$id")({
  head: () => ({
    meta: [
      { title: `${DESARROLLO_DEMO.nombre} — Desarrollos · Roche Realtors` },
      {
        name: "description",
        content: DESARROLLO_DEMO.descripcionCorta,
      },
      { property: "og:title", content: `${DESARROLLO_DEMO.nombre} — Roche Realtors` },
      { property: "og:description", content: DESARROLLO_DEMO.descripcionCorta },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Micrositio,
});

function Meta({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="border-b border-border pb-3">
      <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-sm text-foreground">{valor}</div>
    </div>
  );
}

function Micrositio() {
  const d: Desarrollo = DESARROLLO_DEMO;

  return (
    <>
      {/* Portada / hero */}
      <section className="relative">
        <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-secondary">
          {d.portada ? (
            <img src={d.portada} alt={d.nombre} className="h-full w-full object-cover" />
          ) : (
            <ImagePH label="PORTADA DEL DESARROLLO" height="100%" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-5 md:px-8 pb-10 md:pb-14">
              <Reveal className="max-w-2xl rounded-3xl border border-background/20 bg-background/15 p-7 md:p-9 backdrop-blur-xl text-foreground">
                <div className="text-[11px] uppercase tracking-[0.28em] text-gold">
                  {d.tipoDesarrollo} · {d.tipoOperacion}
                </div>
                <h1 className="mt-4 page-title font-semibold tracking-tight">
                  {d.nombre}
                </h1>
                <p className="mt-4 text-sm md:text-base leading-relaxed opacity-90">
                  {d.descripcionCorta}
                </p>
                {d.desde && (
                  <div className="mt-5 text-lg font-medium">
                    Desde <span className="text-gold">{d.desde}</span>
                  </div>
                )}
                <div className="mt-7">
                  <a href="#el-desarrollo">
                    <BtnPH label="Ver más" size="lg" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-8">
        <Breadcrumb items={["Inicio", "Desarrollos", d.nombre]} />
      </div>

      {/* Imagen representativa + descripción general */}
      <SectionBand className="pt-4" >
        <div id="el-desarrollo" className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2">
            <Reveal className="overflow-hidden rounded-3xl">
              {d.imagenRepresentativa ? (
                <img
                  src={d.imagenRepresentativa}
                  alt={d.nombre}
                  className="w-full object-cover"
                  style={{ aspectRatio: "16 / 9" }}
                />
              ) : (
                <ImagePH label="IMAGEN REPRESENTATIVA" aspect="16 / 9" />
              )}
            </Reveal>
            <Reveal delay={80} className="mt-8">
              <h2 className="subsection-title font-semibold tracking-tight">El desarrollo</h2>
              <div className="mt-5 space-y-5">
                {d.descripcionGeneral.map((p, i) => (
                  <p key={i} className="text-base leading-8 text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <aside className="lg:sticky lg:top-28 rounded-3xl border border-border bg-card p-7 space-y-4">
              <Meta label="Tipo de desarrollo" valor={d.tipoDesarrollo} />
              <Meta label="Tipo de operación" valor={d.tipoOperacion} />
              <Meta label="Ubicación" valor={d.ubicacion} />
              <Meta label="Disponibilidad" valor={d.disponibilidad} />
              {d.desde && <Meta label="Precio desde" valor={d.desde} />}
              <div className="pt-2">
                <Link to="/contacto">
                  <BtnPH label="Contactar un asesor" size="lg" />
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </SectionBand>

      {/* Tipos de oferta */}
      {d.ofertas.length > 0 && (
        <SectionBand bg="gray">
          <SectionHeader eyebrow="Oferta" title="Tipos de producto disponibles" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {d.ofertas.map((o, i) => (
              <Reveal key={o.tipo} delay={i * 80}>
                <div className="rounded-3xl border border-border bg-card p-8 hover-lift">
                  <div className="text-lg font-medium tracking-tight">{o.tipo}</div>
                  <div className="mt-3 gold-rule" style={{ background: "var(--gold)" }} />
                  <div className="mt-4 text-sm text-muted-foreground">Desde</div>
                  <div className="text-2xl font-semibold tracking-tight">{o.desde}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionBand>
      )}

      {/* Amenidades (opcional) */}
      {d.amenidades && d.amenidades.length > 0 && (
        <SectionBand>
          <SectionHeader eyebrow="Estilo de vida" title="Amenidades" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {d.amenidades.map((a, i) => (
              <Reveal key={a} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-card px-5 py-6 text-sm">
                  <span className="text-gold mr-2">—</span>
                  {a}
                </div>
              </Reveal>
            ))}
          </div>
        </SectionBand>
      )}

      {/* Galería */}
      {d.galeria.length > 0 && (
        <SectionBand bg="gray">
          <SectionHeader eyebrow="Galería" title="El proyecto en imágenes" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {d.galeria.map((g, i) => (
              <Reveal key={g.alt} delay={(i % 3) * 80}>
                <div className="overflow-hidden rounded-3xl">
                  {g.src ? (
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-700 hover:scale-105"
                      style={{ aspectRatio: "4 / 3" }}
                    />
                  ) : (
                    <ImagePH label={g.alt} aspect="4 / 3" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </SectionBand>
      )}

      {/* Master plan (opcional) */}
      {d.masterPlan !== undefined && (
        <SectionBand>
          <SectionHeader eyebrow="Planeación" title="Mapa de master plan" />
          <Reveal className="overflow-hidden rounded-3xl">
            {d.masterPlan ? (
              <img src={d.masterPlan} alt="Master plan" className="w-full object-cover" />
            ) : (
              <ImagePH label="MASTER PLAN" height={460} />
            )}
          </Reveal>
        </SectionBand>
      )}

      {/* Ubicación */}
      <SectionBand bg="gray">
        <SectionHeader eyebrow="Ubicación" title={d.ubicacion} />
        <Reveal className="overflow-hidden rounded-3xl">
          {d.mapa ? (
            <img src={d.mapa} alt="Mapa de ubicación" className="w-full object-cover" />
          ) : (
            <ImagePH label="MAPA DE UBICACIÓN" height={400} />
          )}
        </Reveal>
      </SectionBand>

      {/* Desarrollador (opcional) */}
      {d.desarrollador && (
        <SectionBand>
          <div className="grid lg:grid-cols-3 gap-10">
            <SectionHeader eyebrow="Quién lo construye" title={d.desarrollador.nombre} />
            <div className="lg:col-span-2 space-y-5">
              {d.desarrollador.texto.map((p, i) => (
                <p key={i} className="text-base leading-8 text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </SectionBand>
      )}

      <AgendaCita />
    </>
  );
}
