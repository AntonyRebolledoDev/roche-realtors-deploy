import { PageHero } from "@/components/wireframe/PageHero";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  BtnPH,
  ImagePH,
  SectionBand,
  SectionHeader,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { useSiteContent } from "@/lib/site-content";
import { useDesarrollos } from "@/lib/catalogos";

export const Route = createFileRoute("/desarrollos/")({
  head: () => ({
    meta: [
      { title: "Desarrollos — Roche Realtors" },
      { name: "description", content: "Vitrina curada de desarrollos inmobiliarios en Yucatán." },
      { property: "og:title", content: "Desarrollos — Roche Realtors" },
      { property: "og:description", content: "Desarrollos seleccionados y curados en Yucatán." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Desarrollos,
});

type Ficha = {
  id: string;
  nombre: string;
  categoria: string;
  zona: string;
  productos: string;
  detalle: string;
  imagen?: string;
};

function DevCard({ f }: { f: Ficha }) {
  return (
    <Link
      to="/desarrollos/$id"
      params={{ id: f.id }}
      className="group block overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-gold-soft/50 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_oklch(0_0_0/0.35)]"
    >
      {f.imagen ? (
        <img
          src={f.imagen}
          alt={f.nombre}
          className="w-full object-cover"
          style={{ aspectRatio: "16 / 9" }}
          loading="lazy"
        />
      ) : (
        <ImagePH label="Imagen desarrollo" aspect="16 / 9" />
      )}
      <div className="p-5 space-y-2">
        <div className="text-lg font-semibold text-foreground">{f.nombre}</div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-gold-soft">{f.categoria}</div>
        <div className="text-xs text-muted-foreground">{f.zona}</div>
        <div className="text-xs text-muted-foreground">{f.productos}</div>
        <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground pt-1">
          <span>{f.detalle}</span>
        </div>
        <div className="pt-3">
          <BtnPH label="Ver desarrollo" variant="outline" size="sm" />
        </div>
      </div>
    </Link>
  );
}

const PLACEHOLDERS: Ficha[] = [1, 2, 3, 4, 5, 6].map((i) => ({
  id: String(i),
  nombre: "Nombre del desarrollo",
  categoria: ["Residencial", "Comercial", "Logístico/Industrial"][i % 3],
  zona: "Zona / Municipio",
  productos: "Lotes · Casas · Departamentos",
  detalle: "Desde $000,000 · Amenidades",
}));

function Desarrollos() {
  const c = useSiteContent("desarrollos");
  const filas = useDesarrollos();
  const [showList, setShowList] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const fichas: Ficha[] =
    filas.length > 0
      ? filas.map((d) => ({
          id: d.slug,
          nombre: d.nombre,
          categoria: String(d.data?.['categoria'] ?? ""),
          zona: String(d.data?.['zona'] ?? ""),
          productos: String(d.data?.['productos'] ?? ""),
          detalle: String(d.data?.['detalle'] ?? ""),
          imagen: (d.data?.['imagen'] as string) || undefined,
        }))
      : PLACEHOLDERS;

  return (
    <>
      <PageHero
        image={c.portada.imagen}
        alt={c.portada.imagenAlt}
        eyebrow={c.portada.eyebrow}
        title={c.portada.titulo}
        subtitle={c.portada.subtitulo}
      />

      <SectionBand>
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <button
              onClick={() => {
                setShowList(true);
                requestAnimationFrame(() =>
                  listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                );
              }}
            >
              <BtnPH label={c.portada.textoBoton} size="lg" />
            </button>
          </div>
        </div>
      </SectionBand>

      {/* Nivel 2 — Listado */}
      {showList && (
        <div ref={listRef}>
          <SectionBand bg="gray">
            <SectionHeader title={c.portada.tituloListado} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fichas.map((f) => (
                <DevCard key={f.id} f={f} />
              ))}
            </div>
          </SectionBand>
        </div>
      )}

      <AgendaCita />
    </>
  );
}
