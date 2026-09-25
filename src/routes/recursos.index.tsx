import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Breadcrumb,
  BtnPH,
  ImagePH,
  SectionBand,
  SectionHeader,
  Tab,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { CATEGORIAS_RECURSOS, ytThumb, ytThumbFallback } from "@/content/textos";
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

function YtThumb({
  id,
  alt,
  className,
  style,
}: {
  id: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [src, setSrc] = useState(ytThumb(id));
  const triedFallback = useRef(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={style}
      onError={() => {
        if (!triedFallback.current) {
          triedFallback.current = true;
          setSrc(ytThumbFallback(id));
        }
      }}
      onLoad={(e) => {
        if (!triedFallback.current && e.currentTarget.naturalWidth < 480) {
          triedFallback.current = true;
          setSrc(ytThumbFallback(id));
        }
      }}
    />
  );
}

function Recursos() {
  const c = useSiteContent("recursos");
  const articulos = useArticulos();
  const videos = useVideos();
  const estiloVida = useEstiloVida();
  const [active, setActive] = useState("Todos");
  const ultimoVideo = videos[0];
  const lista =
    active === "Todos" ? articulos : articulos.filter((a) => a.categoria === active);

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
            {lista.map((a) => (
              <Link
                key={a.slug}
                to="/recursos/$slug"
                params={{ slug: a.slug }}
                className="border border-border bg-card flex flex-col rounded-3xl overflow-hidden"
              >
                {a.imagen ? (
                  <img
                    src={a.imagen}
                    alt={a.titulo}
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                ) : (
                  <ImagePH label="IMAGEN" aspect="16 / 9" />
                )}
                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <span className="card-label">{a.categoria}</span>
                  <div className="text-sm font-semibold text-foreground">{a.titulo}</div>
                  <p className="text-xs leading-relaxed text-foreground flex-1">{a.entradilla}</p>
                  <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <span>DD MMM AAAA</span>
                    <span className="underline">Leer más</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Paginación */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <BtnPH label="Ver más recursos" />
          <div className="text-xs text-muted-foreground flex gap-3">
            <span>‹</span><span className="underline">1</span><span>2</span><span>3</span><span>›</span>
          </div>
        </div>
      </SectionBand>
      )}


      {/* Agenda una cita (CTA global) */}
      <AgendaCita />
    </>
  );
}
