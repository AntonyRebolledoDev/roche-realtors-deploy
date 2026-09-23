import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumb, SectionBand } from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { LEGALES } from "@/content/textos";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/legal/$slug")({
  loader: ({ params }) => {
    const doc = LEGALES.find((l) => l.slug === params.slug);
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Documento no disponible — Roche Realtors" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { titulo, resumen } = loaderData.doc;
    return {
      meta: [
        { title: `${titulo} — Roche Realtors` },
        { name: "description", content: resumen },
        { property: "og:title", content: `${titulo} — Roche Realtors` },
        { property: "og:description", content: resumen },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: LegalNotFound,
  component: LegalDoc,
});

function LegalNotFound() {
  return (
    <SectionBand>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="page-title">Documento no disponible</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          El documento legal que busca no existe o cambió de dirección.
        </p>
        <Link to="/" className="mt-8 inline-flex btn-ghost-gold">
          Volver al inicio <span aria-hidden>→</span>
        </Link>
      </div>
    </SectionBand>
  );
}

function LegalDoc() {
  const { doc: base } = Route.useLoaderData();
  const paginas = useSiteContent("legales").paginas;
  const doc = paginas.find((l) => l.slug === base.slug) ?? base;

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-8">
        <Breadcrumb items={["Inicio", "Área legal", doc.titulo]} />
      </div>

      <SectionBand>
        <article className="mx-auto max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
            Área legal
          </div>
          <h1 className="mt-5 page-title text-balance-tight">{doc.titulo}</h1>
          <div className="mt-6 h-px w-24 bg-gold-soft" />
          <p className="mt-6 text-base leading-7 text-muted-foreground">{doc.resumen}</p>

          {doc.secciones.length > 0 && (
            <div className="mt-12 space-y-10">
              {doc.secciones.map((s, i) => (
                <section key={i} className="border-l border-gold-soft/40 pl-6">
                  {s.titulo && (
                    <h2 className="subsection-title mb-4">{s.titulo}</h2>
                  )}
                  {s.parrafos?.map((p, j) => (
                    <p key={j} className="text-base leading-7 text-muted-foreground mb-4">
                      {p}
                    </p>
                  ))}
                  {s.lista && (
                    <ul className="space-y-3 text-base leading-7 text-muted-foreground">
                      {s.lista.map((it) => (
                        <li key={it} className="flex gap-3">
                          <span className="text-gold mt-0.5">—</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          )}

          {doc.archivo && (
            <div className="mt-12 rounded-3xl border border-gold-soft/40 bg-card p-8">
              <div className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
                Documento
              </div>
              <div className="mt-4 subsection-title">{doc.archivo.titulo}</div>
              {doc.archivo.nota && (
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {doc.archivo.nota}
                </p>
              )}
              {doc.archivo.url ? (
                <>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={doc.archivo.url}
                      target="_blank"
                      rel="noopener"
                      className="btn-ghost-gold inline-flex"
                    >
                      Ver documento <span aria-hidden>→</span>
                    </a>
                    <a href={doc.archivo.url} download className="btn-ghost-gold inline-flex">
                      Descargar PDF <span aria-hidden>↓</span>
                    </a>
                  </div>
                  <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                    <object
                      data={doc.archivo.url}
                      type="application/pdf"
                      className="w-full h-[70svh]"
                      aria-label={doc.archivo.titulo}
                    >
                      <p className="p-6 text-sm text-muted-foreground">
                        Su navegador no puede mostrar el PDF.{" "}
                        <a href={doc.archivo.url} className="underline">
                          Descárguelo aquí
                        </a>
                        .
                      </p>
                    </object>
                  </div>
                </>
              ) : (
                <p className="mt-6 text-sm text-muted-foreground">
                  El archivo PDF estará disponible en breve. Mientras tanto, puede
                  solicitarlo al correo{" "}
                  <span className="text-foreground">ventas@rocherealtors.com.mx</span>.
                </p>
              )}
            </div>
          )}

          {doc.proximamente && (
            <div className="mt-12 rounded-3xl border border-gold-soft/40 bg-card p-8">
              <div className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
                Próximamente
              </div>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                El texto completo de este documento estará disponible en breve. Mientras
                tanto, puede solicitarlo al correo{" "}
                <span className="text-foreground">ventas@rocherealtors.com.mx</span> o al
                teléfono <span className="text-foreground">+52 999 969 7229</span>.
              </p>
            </div>
          )}

          <div className="mt-12">
            <Link to="/contacto" className="btn-ghost-gold inline-flex">
              Contactar al área legal <span aria-hidden>→</span>
            </Link>
          </div>
        </article>
      </SectionBand>

      <AgendaCita />
    </>
  );
}
