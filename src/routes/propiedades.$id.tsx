import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Breadcrumb,
  BtnPH,
  ImagePH,
  Reveal,
  SectionBand,
  SectionHeader,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { PROPIEDADES_DEMO, amenidadesCompletas, type Propiedad } from "@/content/fichas";
import { usePropiedad } from "@/lib/catalogos";
export const Route = createFileRoute("/propiedades/$id")({
  head: () => ({
    meta: [
      { title: "Ficha de propiedad — Roche Realtors" },
      {
        name: "description",
        content:
          "Detalle de la propiedad: medidas, distribución, características, amenidades y ubicación.",
      },
      { property: "og:title", content: "Ficha de propiedad — Roche Realtors" },
      {
        property: "og:description",
        content: "Medidas, distribución, características y ubicación de la propiedad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ficha,
});

const VARIANTES = [
  { key: "casa", label: "Casa" },
  { key: "departamento", label: "Departamento" },
  { key: "terreno-residencial", label: "Terreno residencial" },
  { key: "macrolote", label: "Macrolote" },
];

function Dato({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="border-b border-border pb-3">
      <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-sm text-foreground">{valor}</div>
    </div>
  );
}

function Bloque({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <Reveal className="rounded-3xl border border-border bg-card p-7 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-6">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {items.map(([k, v]) => (
          <Dato key={k} label={k} valor={v} />
        ))}
      </div>
    </Reveal>
  );
}

function Ficha() {
  const { id } = Route.useParams();
  const fila = usePropiedad(id);
  const desdeUrl = VARIANTES.find((v) => id.startsWith(v.key))?.key ?? "casa";
  const [variante, setVariante] = useState(desdeUrl);
  const demo: Propiedad = PROPIEDADES_DEMO[variante] ?? PROPIEDADES_DEMO["casa"]!;
  const p: Propiedad = fila
    ? ({ ...demo, ...(fila.data as Partial<Propiedad>), nombre: fila.nombre } as Propiedad)
    : demo;
  const amenidades = amenidadesCompletas(p);
  const principal = p.galeria[0];
  const minis = p.galeria.slice(1, 5);


  return (
    <>
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-8">
        <Breadcrumb items={["Inicio", "Propiedades", p.nombre]} />
      </div>

      {/* Selector de variante (solo para revisión de plantilla) */}
      {!fila && (
        <div className="mx-auto max-w-7xl px-5 md:px-8 mt-5">
          <div className="flex flex-wrap gap-2">
            {VARIANTES.map((v) => (
              <button
                key={v.key}
                onClick={() => setVariante(v.key)}
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  variante === v.key
                    ? "border-transparent bg-ink text-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Galería */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 mt-6">
        <div className="grid md:grid-cols-3 gap-3">
          <div className="md:col-span-2 overflow-hidden rounded-3xl">
            {principal?.src ? (
              <img
                src={principal.src}
                alt={principal.alt}
                className="w-full object-cover"
                style={{ aspectRatio: "16 / 10" }}
              />
            ) : (
              <ImagePH label="IMAGEN PRINCIPAL" aspect="16 / 10" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {minis.map((g, i) => (
              <div key={g.alt} className="relative overflow-hidden rounded-2xl">
                {g.src ? (
                  <img src={g.src} alt={g.alt} className="w-full object-cover" style={{ aspectRatio: "4 / 3" }} />
                ) : (
                  <ImagePH label={`MINI ${i + 1}`} aspect="4 / 3" />
                )}
                {i === 3 && p.galeria.length > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/65 text-foreground text-xl font-medium">
                    +{p.galeria.length - 5}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Encabezado + descripción */}
      <SectionBand>
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {p.tipoPropiedad} · {p.tipoOferta}
              </div>
              <h1 className="mt-4 page-title font-semibold tracking-tight">{p.nombre}</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                {p.desarrollo ?? p.zonaAbierta ?? "Mérida, Yucatán"}
              </p>
            </Reveal>
            <Reveal delay={80} className="mt-8 space-y-5">
              {p.descripcion.map((t, i) => (
                <p key={i} className="text-base leading-8 text-muted-foreground">
                  {t}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={140}>
            <aside className="lg:sticky lg:top-28 rounded-3xl border border-border bg-card p-7 space-y-4">
              {p.precio && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    Precio
                  </div>
                  <div className="mt-1 text-3xl font-semibold tracking-tight">{p.precio}</div>
                </div>
              )}
              {p.precioM2 && <Dato label="Precio por m²" valor={p.precioM2} />}
              {p.mantenimiento && <Dato label="Mantenimiento mensual" valor={p.mantenimiento} />}
              {p.disponibilidad && <Dato label="Disponibilidad" valor={p.disponibilidad} />}
              {p.desarrollo && <Dato label="Desarrollo" valor={p.desarrollo} />}
              {p.uso && <Dato label="Uso" valor={p.uso} />}
              <div className="pt-2 space-y-3">
                <Link to="/contacto">
                  <BtnPH label="Contactar un asesor" size="lg" />
                </Link>
                <BtnPH label="Compartir" variant="outline" size="sm" />
              </div>
            </aside>
          </Reveal>
        </div>
      </SectionBand>

      {/* Medidas y distribución */}
      <SectionBand bg="gray">
        <SectionHeader eyebrow="Ficha técnica" title="Características de la propiedad" />
        <div className="grid md:grid-cols-2 gap-6">
          {p.medidas && <Bloque title="Medidas" items={p.medidas} />}
          {p.distribucion && <Bloque title="Distribución" items={p.distribucion} />}
          {p.estatus && <Bloque title="Estatus" items={p.estatus} />}
          {p.servicios && p.servicios.length > 0 && (
            <Reveal className="rounded-3xl border border-border bg-card p-7 md:p-8">
              <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-6">
                Servicios
              </div>
              <ul className="grid grid-cols-2 gap-3 text-sm">
                {p.servicios.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="text-gold">—</span>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </SectionBand>

      {/* Características */}
      {p.caracteristicas && p.caracteristicas.length > 0 && (
        <SectionBand>
          <SectionHeader eyebrow="Detalle" title="Características y equipamiento" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {p.caracteristicas.map((c, i) => (
              <Reveal key={c.label} delay={(i % 4) * 60}>
                <div
                  className={`rounded-2xl border px-5 py-5 text-sm ${
                    c.incluido
                      ? "border-border bg-card text-foreground"
                      : "border-dashed border-border bg-transparent text-muted-foreground"
                  }`}
                >
                  <span className={`mr-2 ${c.incluido ? "text-gold" : "opacity-50"}`}>
                    {c.incluido ? "✓" : "—"}
                  </span>
                  {c.label}
                </div>
              </Reveal>
            ))}
          </div>
        </SectionBand>
      )}

      {/* Amenidades */}
      {amenidades.length > 0 && (
        <SectionBand bg="gray">
          <SectionHeader eyebrow="Estilo de vida" title="Amenidades" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenidades.map((a, i) => (
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


      {/* Video (opcional) */}
      {p.video !== undefined && (
        <SectionBand>
          <SectionHeader eyebrow="Recorrido" title="Video de la propiedad" />
          <Reveal className="overflow-hidden rounded-3xl">
            <ImagePH label="VIDEO" aspect="16 / 9" />
          </Reveal>
        </SectionBand>
      )}

      {/* Ubicación */}
      <SectionBand bg={p.video !== undefined ? "gray" : undefined}>
        <SectionHeader eyebrow="Ubicación" title={p.desarrollo ?? p.zonaAbierta ?? "Mérida, Yucatán"} />
        <Reveal className="overflow-hidden rounded-3xl">
          {p.mapa ? (
            <img src={p.mapa} alt="Mapa de ubicación" className="w-full object-cover" />
          ) : (
            <ImagePH label="MAPA DE UBICACIÓN" height={400} />
          )}
        </Reveal>
      </SectionBand>

      <AgendaCita />
    </>
  );
}
