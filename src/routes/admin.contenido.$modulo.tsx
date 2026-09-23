import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { JsonEditor } from "@/components/admin/JsonEditor";
import { Btn } from "@/components/admin/ui";
import {
  CONTENT_DEFAULTS,
  fetchContent,
  mergeContent,
  saveContent,
  type ContentKey,
} from "@/lib/site-content";

export const Route = createFileRoute("/admin/contenido/$modulo")({
  component: EditorModulo,
});

const TITULOS: Record<string, string> = {
  inicio: "Inicio",
  propiedades: "Página de Propiedades",
  desarrollos: "Página de Desarrollos",
  yucatan: "Por qué Yucatán",
  mercado: "Inteligencia de mercado",
  recursos: "Página de Recursos",
  empresa: "Empresa",
  contacto: "Contacto y datos compartidos",
  legales: "Páginas legales",
  global: "Pie de página y agenda de citas",
};

const GENERAL = ["empresa", "contacto", "legales", "global"];

function EditorModulo() {
  const { modulo } = useParams({ from: "/admin/contenido/$modulo" });
  const key = modulo as ContentKey;
  const qc = useQueryClient();
  const [valor, setValor] = useState<unknown>(null);
  const [guardando, setGuardando] = useState(false);
  const [ok, setOk] = useState(false);

  const valido = key in CONTENT_DEFAULTS;
  const { data, isLoading } = useQuery({
    queryKey: ["site_content", key],
    queryFn: () => fetchContent(key),
    enabled: valido,
  });

  useEffect(() => {
    if (!valido) return;
    setValor(mergeContent(CONTENT_DEFAULTS[key], data));
  }, [data, key, valido]);

  if (!valido) return <p className="text-sm text-white/60">Módulo no encontrado.</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="section-title text-white">{TITULOS[modulo] ?? modulo}</h1>
        <div className="flex items-center gap-3">
          {ok && <span className="text-xs text-gold">Guardado</span>}
          <Btn
            disabled={guardando || valor === null}
            onClick={async () => {
              setGuardando(true);
              setOk(false);
              try {
                await saveContent(key, valor);
                qc.invalidateQueries({ queryKey: ["site_content", key] });
                setOk(true);
              } finally {
                setGuardando(false);
              }
            }}
          >
            {guardando ? "Guardando…" : "Guardar cambios"}
          </Btn>
        </div>
      </div>

      {GENERAL.includes(modulo) && (
        <nav className="mt-4 flex gap-2 text-sm">
          {GENERAL.map((m) => (
            <Link
              key={m}
              to="/admin/contenido/$modulo"
              params={{ modulo: m }}
              className="rounded-md border border-white/10 px-3 py-1.5 text-white/60 hover:text-gold"
              activeProps={{ className: "border-gold/50 text-gold" }}
            >
              {TITULOS[m]}
            </Link>
          ))}
        </nav>
      )}

      <p className="mt-3 text-xs text-white/40">
        Los campos vacíos no se muestran en el sitio público.
      </p>

      <div className="mt-8">
        {isLoading || valor === null ? (
          <p className="text-sm text-white/50">Cargando contenido…</p>
        ) : (
          <JsonEditor value={valor} onChange={setValor} />
        )}
      </div>
    </div>
  );
}
