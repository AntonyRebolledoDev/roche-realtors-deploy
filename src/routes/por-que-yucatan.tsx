import { PageHero } from "@/components/wireframe/PageHero";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BtnPH,
  BulletList,
  ImagePH,
  LeerMas,
  Prose,
  SectionBand,
  SectionHeader,
  StatGrid,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { GaleriaCarrusel } from "@/components/wireframe/GaleriaCarrusel";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/por-que-yucatan")({
  head: () => ({
    meta: [
      { title: "Por qué Yucatán — Roche Realtors" },
      { name: "description", content: "La transformación de Yucatán: contexto, cultura y oportunidad." },
      { property: "og:title", content: "Por qué Yucatán — Roche Realtors" },
    ],
  }),
  component: PorQue,
});

function PorQue() {
  const c = useSiteContent("yucatan");
  const [intro, ...resto] = c.secciones;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-6">
        <Breadcrumb items={["Inicio", "Por qué Yucatán"]} />
      </div>

      <PageHero
        image={c.hero.imagen}
        alt={c.hero.imagenAlt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.titulo}
        subtitle={c.hero.subtitulo}
      />

      {/* Introducción */}
      <SectionBand>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader title={intro.title} center />
          <Prose resumen={intro.resumen} parrafos={intro.parrafos} />
        </div>
      </SectionBand>

      {/* Datos duros */}
      <SectionBand bg="gray">
        <SectionHeader title={c.cifras.titulo} intro={c.cifras.intro} center />
        <StatGrid stats={c.indicadores} />
      </SectionBand>

      {/* Apartados: resumen visible + detalle colapsable */}
      {resto.map((s, i) => (
        <SectionBand key={s.title} bg={i % 2 ? "gray" : "white"}>
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
            <div className={`md:sticky md:top-28 ${i % 2 ? "md:order-2" : ""}`}>
              {s.imagen ? (
                <img
                  src={s.imagen}
                  alt={s.imagenAlt}
                  className={
                    s.sinRecorte
                      ? "w-full h-auto rounded-3xl object-contain border border-gold-soft/30"
                      : "w-full rounded-3xl object-cover border border-gold-soft/30"
                  }
                  style={s.sinRecorte ? undefined : { aspectRatio: "4 / 5" }}
                  loading="lazy"
                />
              ) : (
                <ImagePH label={`IMAGEN · ${s.title.toUpperCase()}`} aspect="16 / 9" />
              )}
            </div>
            <div className={i % 2 ? "md:order-1" : ""}>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-gold-soft" />
                <span className="text-[10px] uppercase tracking-[0.24em] text-gold-soft">
                  Razón {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="subsection-title font-semibold">{s.title}</h2>
              <p className="mt-4 text-base md:text-lg leading-7 text-foreground font-medium">
                {s.resumen}
              </p>

              <LeerMas>
                <div className="space-y-6">
                  <Prose parrafos={s.parrafos} />
                  {s.lista && <BulletList title={s.listaTitulo} items={s.lista} />}
                  {s.listas?.map((l) => (
                    <BulletList key={l.titulo} title={l.titulo} items={l.items} />
                  ))}
                  {s.stats && <StatGrid stats={s.stats} />}
                </div>
              </LeerMas>
            </div>
          </div>
        </SectionBand>
      ))}

      {/* Galería · Yucatán en imágenes */}
      <SectionBand bg="gray">
        <SectionHeader eyebrow={c.galeria.eyebrow} title={c.galeria.titulo} center />
        <GaleriaCarrusel items={[...c.galeria.items]} />
      </SectionBand>

      {/* Enlace a inteligencia */}
      <SectionBand>
        <div className="border border-border bg-card p-8 md:p-10 text-center">
          <h2 className="subsection-title font-semibold">{c.cta.titulo}</h2>
          <p className="mt-3 text-sm text-foreground max-w-xl mx-auto">{c.cta.texto}</p>
          <div className="mt-6">
            <Link to="/inteligencia-de-mercado">
              <BtnPH label={c.cta.textoBoton} size="lg" />
            </Link>
          </div>
        </div>
      </SectionBand>

      <AgendaCita />
    </>
  );
}
