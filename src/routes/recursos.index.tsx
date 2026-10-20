import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Breadcrumb,
  BtnPH,
  ImagePH,
  SectionBand,
  SectionHeader,
  Tab,
  YtThumb,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { CATEGORIAS_RECURSOS } from "@/content/textos";
import { useArticulos, useEstiloVida, useVideos } from "@/lib/catalogos";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/recursos/")({
  head: () => ({
    meta: [
      { title: "Recursos — Roche Realtors" },
      { name: "description", content: "Artículos, noticias y análisis del mercado inmobiliario de Yucatán." },
      { property: "og:title", content: "Recursos — Roche Realtors" },
      { property: "og:description", content: "Noticias, ley y normatividad y Termómetro Inmobiliario." },
    ],
  }),
  component: Recursos,
});

// Tarjeta genérica que mezcla artículos (ruta interna) y videos de
// Termómetro (enlace externo a YouTube) en un mismo listado — p. ej. en
// la pestaña "Todos".
type RecursoListItem = {
  key: string;
  categoria: string;
  titulo: string;
  resumen: string;
  fecha?: string;
  imagen?: string;
  videoId?: string;
  href: { tipo: "interno"; slug: string } | { tipo: "externo"; url: string };
};

function RecursoCard({ item }: { item: RecursoListItem }) {
  const contenido = (
    <>
      <div className="relative">
        {item.videoId ? (
          <YtThumb
            id={item.videoId}
            alt={item.titulo}
            className="w-full object-cover"
            style={{ aspectRatio: "16 / 9" }}
          />
        ) : item.imagen ? (
          <img
            src={item.imagen}
            alt={item.titulo}
            loading="lazy"
            className="w-full object-cover"
            style={{ aspectRatio: "16 / 9" }}
          />
        ) : (
          <ImagePH label="IMAGEN" aspect="16 / 9" />
        )}
        {item.videoId && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-12 h-12 rounded-full border-2 border-foreground bg-ink/70 flex items-center justify-center text-xl transition-transform group-hover:scale-110">
              ▶
            </span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <span className="card-label">{item.categoria}</span>
        <div className="text-sm font-semibold text-foreground">{item.titulo}</div>
        <p className="text-xs leading-relaxed text-foreground flex-1">{item.resumen}</p>
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>{item.fecha ?? ""}</span>
          <span className="underline">{item.videoId ? "Ver video" : "Leer más"}</span>
        </div>
      </div>
    </>
  );

  const className =
    "group border border-border bg-card flex flex-col rounded-3xl overflow-hidden";

  return item.href.tipo === "interno" ? (
    <Link to="/recursos/$slug" params={{ slug: item.href.slug }} className={className}>
      {contenido}
    </Link>
  ) : (
    <a href={item.href.url} target="_blank" rel="noopener" className={className}>
      {contenido}
    </a>
  );
}

function Recursos() {
  const c = useSiteContent("recursos");
  const articulos = useArticulos();
  const videos = useVideos();
  const estiloVida = useEstiloVida();
  const [active, setActive] = useState("Todos");
  const ultimoVideo = videos[0];

  const articuloItems: RecursoListItem[] = articulos.map((a) => ({
    key: a.slug,
    categoria: a.categoria,
    titulo: a.titulo,
    resumen: a.entradilla,
    fecha: a.fecha,
    imagen: a.imagen,
    href: { tipo: "interno", slug: a.slug },
  }));
  const videoItems: RecursoListItem[] = videos.map((v) => ({
    key: `video-${v.id}`,
    categoria: "Termómetro Inmobiliario",
    titulo: v.titulo,
    resumen: `Duración ${v.duracion}`,
    fecha: v.fecha,
    videoId: v.id,
    href: { tipo: "externo", url: v.url },
  }));
  const lista =
    active === "Todos"
      ? [...videoItems, ...articuloItems]
      : articuloItems.filter((a) => a.categoria === active);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-6">
        <Breadcrumb items={["Inicio", "Recursos"]} />
        <h1 className="mt-3 page-title font-semibold">{c.portada.titulo}</h1>
        <p className="mt-3 text-sm text-foreground max-w-2xl">{c.portada.texto}</p>
      </div>

      {/* Recurso destacado · último video de Termómetro Inmobiliario */}
      <SectionBand>
        <div className="border border-border bg-card grid md:grid-cols-2 overflow-hidden rounded-3xl">
          <a
            href={ultimoVideo.url}
            target="_blank"
            rel="noopener"
            className="relative block group"
          >
            <YtThumb
              id={ultimoVideo.id}
              alt={ultimoVideo.titulo}
              className="w-full h-full min-h-[240px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-foreground bg-ink/70 flex items-center justify-center text-2xl transition-transform group-hover:scale-110">
                ▶
              </div>
            </div>
          </a>
          <div className="p-6 md:p-8 flex flex-col justify-center gap-3">
            <span className="card-label">{c.destacado.etiqueta}</span>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {c.destacado.subetiqueta}
            </div>
            <h2 className="subsection-title font-semibold">{ultimoVideo.titulo}</h2>
            <p className="text-sm text-muted-foreground">
              Duración {ultimoVideo.duracion}
            </p>
            <div className="text-xs text-muted-foreground">{ultimoVideo.fecha}</div>
            <div className="pt-2 flex gap-3">
              <a href={ultimoVideo.url} target="_blank" rel="noopener">
                <BtnPH label={c.destacado.botonVer} />
              </a>
              <a href={ultimoVideo.url} target="_blank" rel="noopener">
                <BtnPH label={c.destacado.botonYoutube} variant="outline" />
              </a>
            </div>
          </div>
        </div>
      </SectionBand>

      {/* Filtro sticky */}
      <div className="sticky top-16 z-40 bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 flex gap-2 overflow-x-auto">
          {CATEGORIAS_RECURSOS.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}>
              <Tab label={cat} active={active === cat} />
            </button>
          ))}
        </div>
      </div>

      {/* Termómetro Inmobiliario · cuadrícula de videos */}
      {active === "Termómetro Inmobiliario" ? (
        <SectionBand bg="gray">
          <SectionHeader
            title={c.termometro.titulo}
            intro={c.termometro.intro}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener"
                className="border border-border bg-card flex flex-col rounded-3xl overflow-hidden group transition-colors hover:border-primary/60"
              >
                <div className="relative">
                  <YtThumb
                    id={v.id}
                    alt={v.titulo}
                    className="w-full object-cover"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full border-2 border-foreground bg-ink/70 flex items-center justify-center text-xl transition-transform group-hover:scale-110">
                      ▶
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-sm font-semibold text-foreground">{v.titulo}</div>
                  <div className="text-xs text-muted-foreground">
                    {v.duracion} · {v.fecha}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </SectionBand>
      ) : active === "Estilo de vida" ? (
        <SectionBand bg="gray">
          <SectionHeader
            title={c.estiloVida.titulo}
            intro={c.estiloVida.intro}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {estiloVida.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener"
                className="relative border border-border bg-card flex flex-col rounded-3xl overflow-hidden transition-colors hover:border-primary/60"
              >
                <span className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-card/90 border border-border flex items-center justify-center text-muted-foreground text-xs">
                  ↗
                </span>
                <img
                  src={r.imagen}
                  alt={r.titulo}
                  loading="lazy"
                  className="w-full object-cover"
                  style={{ aspectRatio: "16 / 9" }}
                />
                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <span className="card-label">{r.fuente}</span>
                  <div className="text-sm font-semibold text-foreground">{r.titulo}</div>
                  <p className="text-xs leading-relaxed text-foreground flex-1">{r.texto}</p>
                  <span className="pt-2 text-xs text-muted-foreground underline inline-flex items-center gap-1">
                    Leer más ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </SectionBand>
      ) : (
      <SectionBand bg="gray">
        {lista.length === 0 ? (
          <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            {c.vacio}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lista.map((item) => (
              <RecursoCard key={item.key} item={item} />
            ))}
          </div>
        )}
      </SectionBand>
      )}

      {/* Preguntas frecuentes */}
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

      {/* Agenda una cita (CTA global) */}
      <AgendaCita />
    </>
  );
}
