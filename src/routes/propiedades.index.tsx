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

// Qué categorías de la base de datos corresponden a cada pestaña (por
// `clave`, no por el nombre visible —ese lo edita libremente el admin—).
const EN_CATEGORIA: Record<string, (categoria: string) => boolean> = {
  casa: (cat) => cat === "casa",
  departamento: (cat) => cat === "departamento",
  terrenos: (cat) => cat === "terreno-residencial" || cat === "macrolote",
  hacienda: (cat) => cat === "hacienda",
  "comercial-industrial": (cat) => cat === "comercial-industrial",
};

// Dentro de "Terrenos y Macrolotes" el cliente elige, además, entre estos
// dos subtipos (por `clave` de `categoria`, igual que EN_CATEGORIA).
const SUBTIPOS_TERRENO = [
  { clave: "terreno-residencial", nombre: "Terrenos Residenciales" },
  { clave: "macrolote", nombre: "Macrolotes" },
];

function Propiedades() {
  const c = useSiteContent("propiedades");
  const categorias = c.categorias;
  const [active, setActive] = useState<string | null>(null);
  const [subTipo, setSubTipo] = useState(SUBTIPOS_TERRENO[0].clave);

  const tileActiva = categorias.find((t) => t.clave === active);
  const esTerrenos = active === "terrenos";
  const filtro = active
    ? esTerrenos
      ? (cat: string) => cat === subTipo
      : EN_CATEGORIA[active]
    : undefined;
  const fichas = usePropiedades()
    .filter((p) => filtro?.(p.categoria))
    .map(fichaDeFila);

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
            <button key={t.clave} onClick={() => setActive(t.clave)}>
              <Tab label={t.nombre} active={active === t.clave} />
            </button>
          ))}
        </div>
      </div>

      {/* 3a. Pantalla de selección */}
      {active === null ? (
        <SectionBand>
          <SectionHeader title={c.seleccionTitulo} center />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categorias.map((t, i) => (
              <button
                key={t.clave}
                onClick={() => setActive(t.clave)}
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
          <SectionHeader title={tileActiva?.nombre ?? ""} />
          {esTerrenos && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 -mt-4">
              {SUBTIPOS_TERRENO.map((st) => (
                <button
                  key={st.clave}
                  onClick={() => setSubTipo(st.clave)}
                  className={`py-2 text-sm md:text-base font-medium tracking-tight border-b-2 transition-colors ${
                    subTipo === st.clave
                      ? "border-gold-soft text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {st.nombre}
                </button>
              ))}
            </div>
          )}
          {fichas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fichas.map((f) => (
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
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/40 py-16 text-center">
              <p className="text-base text-foreground">
                Por el momento no hay propiedades disponibles en esta categoría.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Vuelva pronto o contáctenos para conocer opciones similares.
              </p>
            </div>
          )}
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
