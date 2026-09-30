import { useSiteContent } from "@/lib/site-content";
import { PageHero } from "@/components/wireframe/PageHero";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BtnPH,
  PropertyCard,
  SectionBand,
  SectionHeader,
  Tab,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { usePropiedades } from "@/lib/catalogos";
import { fichaDeFila } from "@/lib/propiedad-card";
import { MapaNorteMerida } from "@/components/wireframe/MapaNorteMerida";
import { MapaCostaYucateca } from "@/components/wireframe/MapaCostaYucateca";
export const Route = createFileRoute("/propiedades/")({
  head: () => ({
    meta: [
      { title: "Propiedades Curadas en Mérida y Yucatán — Roche Realtors" },
      { name: "description", content: "Propiedades curadas en Mérida y Yucatán: casas, departamentos, terrenos, haciendas y espacios comerciales." },
      { property: "og:title", content: "Propiedades Curadas en Mérida y Yucatán — Roche Realtors" },
      { property: "og:description", content: "Propiedades curadas en Mérida y Yucatán, por tipo de inmueble." },
    ],
  }),
  component: Propiedades,
});

const SLUG_CAT: Record<string, string> = {
  Casas: "casa",
  Departamentos: "departamento",
  Haciendas: "casa",
  "Comercial / Industrial": "casa",
  Residenciales: "terreno-residencial",
  Macrolotes: "macrolote",
};

function Propiedades() {
  const c = useSiteContent("propiedades");
  const categorias = c.categorias;
  const [active, setActive] = useState<string | null>(null);
  const [subActive, setSubActive] = useState<"Residenciales" | "Macrolotes">("Residenciales");

  const catActiva =
    SLUG_CAT[active === "Terrenos" ? subActive : (active ?? "")] ?? "casa";
  const fichas = usePropiedades(catActiva).map(fichaDeFila);

  return (
    <>
      {/* 1. Encabezado */}
      <PageHero
        image={c.portada.imagen}
        alt={c.portada.imagenAlt}
        eyebrow={c.portada.eyebrow}
        title={c.portada.titulo}
        subtitle={c.portada.subtitulo}
      />

      {/* 2. Barra de tipos sticky */}
      <div className="sticky top-16 z-40 bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 flex gap-2 overflow-x-auto">
          {categorias.map((t) => (
            <button key={t.nombre} onClick={() => setActive(t.nombre)}>
              <Tab label={t.nombre} active={active === t.nombre} />
            </button>
          ))}
        </div>
        {active === "Terrenos" && (
          <div className="border-t border-dashed border-border bg-secondary">
            <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 flex gap-2">
              {(["Residenciales", "Macrolotes"] as const).map((s) => (
                <button key={s} onClick={() => setSubActive(s)}>
                  <Tab label={s} active={subActive === s} dashed />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3a. Pantalla de selección */}
      {active === null ? (
        <SectionBand>
          <SectionHeader title={c.seleccionTitulo} center />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categorias.map((t, i) => (
              <button
                key={t.nombre}
                onClick={() => setActive(t.nombre)}
                className={`group text-left overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-gold-soft ${
                  i === categorias.length - 1 ? "md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto md:w-full" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={t.imagen}
                    alt={t.nombre}
                    className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    style={{ aspectRatio: "16 / 10" }}
                  />
                </div>
                <div className="p-7 flex items-center justify-between gap-4 flex-wrap">
                  <div className="text-xl font-semibold text-foreground">{t.nombre}</div>
                  <BtnPH label={`Ver ${t.nombre}`} variant="outline" size="sm" />
                </div>
              </button>
            ))}
          </div>
        </SectionBand>
      ) : (
        /* 3b. Grid filtrado */
        <SectionBand>
          <SectionHeader title={active === "Terrenos" ? `Terrenos · ${subActive}` : active} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fichas.length > 0
              ? fichas.map((f) => (
                  <Link
                    key={f.slug}
                    to="/propiedades/$id"
                    params={{ id: f.slug }}
                    className="contents"
                  >
                    <PropertyCard
                      title={f.nombre}
                      tipo={f.tipo}
                      operacion={f.operacion}
                      imagen={f.imagen}
                      zona={f.zona}
                      detalle={f.detalle}
                      precio={f.precio}
                    />
                  </Link>
                ))
                : Array.from({ length: 6 }).map((_, i) => (
                  <Link
                    key={i}
                    to="/propiedades/$id"
                    params={{ id: `${catActiva}-${i + 1}` }}
                    className="contents"
                  >
                    <PropertyCard />
                  </Link>
                ))}
          </div>
          <div className="mt-8 text-center">
            <BtnPH label="Ver más" variant="outline" />
          </div>
        </SectionBand>
      )}

      {/* 4. Zonas y colonias */}
      <SectionBand bg="gray">
        <SectionHeader title={c.zonasTitulo} />
        <div className="space-y-14">
          <MapaNorteMerida />
          <div className="border-t border-border" />
          <MapaCostaYucateca />
        </div>
      </SectionBand>

      {/* 5. Agenda una cita (CTA global) */}
      <AgendaCita />
    </>
  );
}
