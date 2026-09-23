import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BtnPH,
  Reveal,
  SectionBand,
  SectionHeader,
  StatCard,
} from "@/components/wireframe/primitives";
import {
  BarraDistribucion,
  BarrasAgrupadas,
  BarrasSimples,
  ChartCard,
  LineaPrecios,
  PastelDistribucion,
} from "@/components/wireframe/Charts";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { PageHero } from "@/components/wireframe/PageHero";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/inteligencia-de-mercado")({
  head: () => ({
    meta: [
      { title: "Inteligencia de mercado — Roche Realtors" },
      {
        name: "description",
        content:
          "Información, data y tendencias del mercado inmobiliario en Mérida, Yucatán. Precios por m², absorción y proyectos por municipio.",
      },
      { property: "og:title", content: "Inteligencia de mercado — Roche Realtors" },
      {
        property: "og:description",
        content: "Indicadores y tendencias del mercado inmobiliario en Mérida, Yucatán.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inteligencia,
});

function GrupoKPI({
  eyebrow,
  items,
}: {
  eyebrow: string;
  items: { valor: string; label: string }[];
}) {
  return (
    <div>
      <div className="mb-6">
        <span className="block text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {eyebrow}
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((k, i) => (
          <Reveal key={k.label} delay={i * 80}>
            <StatCard valor={k.valor} label={k.label} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Bloque({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="rounded-3xl border border-border bg-card p-7 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-6">
        {title}
      </div>
      {children}
    </Reveal>
  );
}

function Cifras({ items }: { items: { valor: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-7">
      {items.map((it) => (
        <div key={it.label}>
          <div className="text-3xl font-semibold tracking-tight text-foreground">{it.valor}</div>
          <div className="mt-2 text-xs leading-relaxed text-muted-foreground">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

function Inteligencia() {
  const c = useSiteContent("mercado");
  const MERCADO_META = c.meta;
  const DEMOGRAFICOS = c.demograficos;

  return (
    <>
      <PageHero
        image={c.hero.imagen}
        imageMobile={c.hero.imagenMobile}
        alt={c.hero.imagenAlt}
        eyebrow={MERCADO_META.badge}
        title={MERCADO_META.titulo}
        subtitle={MERCADO_META.subtitulo}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 pt-10">
        <Breadcrumb items={["Inicio", "Inteligencia de mercado"]} />
      </section>

      {/* Banda de KPIs */}
      <SectionBand bg="gray">
        <div className="space-y-14">
          <GrupoKPI eyebrow={c.etiquetas.horizontal} items={c.kpisHorizontal} />
          <GrupoKPI eyebrow={c.etiquetas.vertical} items={c.kpisVertical} />
        </div>
        <p className="mt-10 text-[11px] italic text-muted-foreground">{MERCADO_META.fuente}</p>
      </SectionBand>

      {/* 1 · Datos demográficos */}
      <SectionBand>
        <SectionHeader eyebrow="01" title={c.etiquetas.demograficos} />
        <div className="grid md:grid-cols-2 gap-6">
          <Bloque title="Población">
            <Cifras items={DEMOGRAFICOS.poblacion} />
          </Bloque>
          <Bloque title="Población por grupo de edad">
            <Cifras items={DEMOGRAFICOS.edad} />
          </Bloque>
          <Bloque title="Vivienda">
            <Cifras items={DEMOGRAFICOS.vivienda} />
            <div className="mt-8 grid sm:grid-cols-2 gap-8">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  Tenencia de la vivienda
                </div>
                <BarraDistribucion items={DEMOGRAFICOS.tenencia} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  Adquisición de la vivienda
                </div>
                <BarraDistribucion items={DEMOGRAFICOS.adquisicion} />
              </div>
            </div>
          </Bloque>
          <div className="space-y-6">
            <Bloque title="Créditos">
              <Cifras items={DEMOGRAFICOS.creditos} />
            </Bloque>
            <Bloque title="Turismo">
              <Cifras items={DEMOGRAFICOS.turismo} />
            </Bloque>
          </div>
        </div>

        {/* Nivel socioeconómico */}
        <Reveal className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
          <ChartCard title="Nivel socioeconómico — composición del mercado">
            <PastelDistribucion
              data={DEMOGRAFICOS.nse.map(([nivel, pct]) => ({
                name: nivel,
                value: Number(String(pct).replace("%", "")),
              }))}
            />
          </ChartCard>
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
              Lectura
            </div>
            <p className="text-base md:text-lg leading-8 text-foreground">{c.lecturaNSE}</p>
          </div>
        </Reveal>
        <p className="mt-6 text-[11px] italic text-muted-foreground">{MERCADO_META.fuente}</p>
      </SectionBand>

      {/* 2 · Evolución del precio */}
      <SectionBand bg="gray">
        <SectionHeader
          eyebrow="02"
          title={c.etiquetas.precios}
          intro={c.etiquetas.preciosIntro}
        />
        <div className="grid lg:grid-cols-2 gap-6">
          <Reveal>
            <ChartCard title="Precio por m² — Vivienda horizontal (MXN)">
              <LineaPrecios data={c.precioHorizontal} />
            </ChartCard>
          </Reveal>
          <Reveal delay={100}>
            <ChartCard title="Precio por m² — Vivienda vertical (MXN)">
              <LineaPrecios data={c.precioVertical} />
            </ChartCard>
          </Reveal>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          {c.variaciones.map((v) => (
            <StatCard key={v.label} valor={v.valor} label={v.label} />
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Reveal>
              <ChartCard
                title="Precio por m² por segmento — Horizontal vs. vertical (2T26)"
                fuente={MERCADO_META.fuente}
              >
                <BarrasAgrupadas data={c.precioSegmento} xKey="segmento" formato="moneda" />
              </ChartCard>
            </Reveal>
          </div>
          <Reveal delay={100} className="flex">
            <div className="flex w-full flex-col justify-center rounded-3xl border border-border bg-ink p-8 text-foreground">
              <div className="text-5xl font-semibold tracking-tight text-gold">
                {c.destacadoVertical.valor}
              </div>
              <div className="mt-4 text-sm leading-relaxed opacity-80">
                {c.destacadoVertical.texto}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionBand>

      {/* 3 · Absorción */}
      <SectionBand>
        <SectionHeader
          eyebrow="03"
          title={c.etiquetas.absorcion}
          intro={c.etiquetas.absorcionIntro}
        />
        <Reveal>
          <ChartCard title="Absorción mensual (unidades)" fuente={MERCADO_META.fuente}>
            <BarrasSimples data={c.absorcion} xKey="producto" dataKey="unidades" />
          </ChartCard>
        </Reveal>
      </SectionBand>

      {/* 4 · Proyectos por municipio */}
      <SectionBand bg="gray">
        <SectionHeader eyebrow="04" title={c.etiquetas.municipios} />
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
          <Reveal>
            <ChartCard
              title="Proyectos por municipio — Horizontal vs. vertical (2T26)"
              fuente={MERCADO_META.fuente}
            >
              <BarrasAgrupadas data={c.proyectosMunicipio} xKey="municipio" />
            </ChartCard>
          </Reveal>
          <Reveal delay={100} className="space-y-6">
            <div className="rounded-3xl border border-gold-soft/30 bg-card p-7">
              <div className="text-[11px] uppercase tracking-[0.28em] text-gold-soft mb-4">
                Lectura del dato
              </div>
              <p className="text-[15px] leading-7 text-muted-foreground">{c.notaMunicipios}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {c.callouts.map((co) => (
                <div
                  key={co.label}
                  className="flex items-baseline gap-4 rounded-3xl border border-border bg-card px-6 py-5"
                >
                  <span className="text-2xl font-semibold tracking-tight text-gold">
                    {co.valor}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">{co.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </SectionBand>

      {/* Enlace a Por qué Yucatán */}
      <SectionBand>
        <Reveal className="rounded-3xl border border-border bg-card p-10 md:p-16 text-center">
          <h2 className="section-title font-semibold tracking-tight">{c.cta.titulo}</h2>
          <div className="mt-8">
            <Link to="/por-que-yucatan">
              <BtnPH label={c.cta.textoBoton} size="lg" />
            </Link>
          </div>
        </Reveal>
      </SectionBand>

      <AgendaCita />
    </>
  );
}
