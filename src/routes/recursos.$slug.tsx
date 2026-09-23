import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  Breadcrumb,
  BtnPH,
  Chip,
  ImagePH,
  ParaPH,
  SectionBand,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { SocialIcons } from "@/components/wireframe/SocialIcons";
import { FIRMA } from "@/content/textos";
import { useArticulos } from "@/lib/catalogos";

export const Route = createFileRoute("/recursos/$slug")({
  head: () => ({
    meta: [
      { title: "Artículo — Roche Realtors" },
      { name: "description", content: "Artículos y análisis del mercado inmobiliario de Yucatán." },
      { property: "og:title", content: "Artículo — Roche Realtors" },
      { property: "og:description", content: "Artículos y análisis del mercado inmobiliario de Yucatán." },
    ],
  }),
  component: Articulo,
});

function Articulo() {
  const { slug } = useParams({ from: "/recursos/$slug" });
  const articulos = useArticulos();
  const art = articulos.find((a) => a.slug === slug);
  const relacionados = articulos.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 md:px-6 pt-8">
        <Breadcrumb items={["Inicio", "Recursos", art ? art.titulo : "Artículo"]} />
        <div className="mt-4"><Chip label={art?.categoria ?? "Termómetro Inmobiliario"} /></div>
        <h1 className="mt-3 page-title font-semibold">
          {art ? art.titulo : "Título grande del artículo"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {art ? art.entradilla : "Bajada / subtítulo del artículo (contenido dinámico)."}
        </p>
        <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground border-y border-border py-3">
          <span>Roger Roche M. · DD MMM AAAA</span>
          <BtnPH label="⤴ Compartir" variant="outline" size="sm" />
        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-3xl px-4 md:px-6 mt-8">
        {art?.imagen ? (
          <img
            src={art.imagen}
            alt={art.titulo}
            className="w-full rounded-3xl object-cover"
            style={{ aspectRatio: "16 / 9" }}
          />
        ) : (
          <ImagePH label="IMAGEN PRINCIPAL" height={420} />
        )}
      </div>

      {/* Cuerpo */}
      <article className="mx-auto max-w-3xl px-4 md:px-6 mt-10 space-y-6">
        {art ? (
          art.bloques.map((b, i) => (
            <div key={i} className="space-y-4">
              {b.h && <h2 className="subsection-title font-semibold pt-2">{b.h}</h2>}
              {b.p && <p className="text-sm leading-relaxed text-foreground">{b.p}</p>}
              {b.list && (
                <ul className="list-disc pl-6 space-y-2 text-sm text-foreground">
                  {b.list.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <>
            <ParaPH lines={5} />
            <ImagePH label="VIDEO" height={320} />
            <ParaPH lines={4} />
          </>
        )}

        {art?.referencias && (
          <div className="pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Referencias</h3>
            <ul className="mt-2 list-disc pl-6 space-y-1 text-xs text-muted-foreground">
              {art.referencias.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-border pt-5 text-sm text-foreground">{FIRMA}</div>
      </article>

      {/* Compartir */}
      <div className="mx-auto max-w-3xl px-4 md:px-6 mt-10 border-t border-border pt-5 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Compartir</span>
        <SocialIcons size={32} iconSize={16} />

      </div>

      {/* Relacionados */}
      <SectionBand bg="gray" className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Podría interesarte</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relacionados.map((a) => (
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
              <div className="p-4 space-y-2">
                <Chip label={a.categoria} />
                <div className="text-sm font-semibold">{a.titulo}</div>
                <p className="text-xs text-foreground">{a.entradilla}</p>
              </div>
            </Link>
          ))}
        </div>
      </SectionBand>

      <AgendaCita />
    </>
  );
}
