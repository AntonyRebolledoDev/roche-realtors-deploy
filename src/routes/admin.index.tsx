import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/")({
  component: Resumen,
});

type Acceso = { to: string; params?: Record<string, string>; label: string; desc: string };

const ACCESOS: Acceso[] = [
  { to: "/admin/contenido/$modulo", params: { modulo: "inicio" }, label: "Inicio", desc: "Bienvenida, servicios y textos de la portada" },
  { to: "/admin/propiedades", label: "Propiedades", desc: "Catálogo, fichas y destacadas" },
  { to: "/admin/desarrollos", label: "Desarrollos", desc: "Catálogo y fichas de desarrollos" },
  { to: "/admin/contenido/$modulo", params: { modulo: "yucatan" }, label: "Por qué Yucatán", desc: "Indicadores y razones" },
  { to: "/admin/contenido/$modulo", params: { modulo: "mercado" }, label: "Inteligencia de mercado", desc: "Cifras y gráficas" },
  { to: "/admin/recursos", label: "Recursos", desc: "Artículos, videos y estilo de vida" },
  { to: "/admin/newsletter", label: "Suscriptores", desc: "Lista y exportación" },
  { to: "/admin/contenido/$modulo", params: { modulo: "empresa" }, label: "Contenido general", desc: "Empresa, contacto y legales" },
  { to: "/admin/usuarios", label: "Usuarios", desc: "Accesos y roles" },
];

function Resumen() {
  const { data } = useQuery({
    queryKey: ["admin-resumen"],
    queryFn: async () => {
      const [p, d, a, s] = await Promise.all([
        supabase.from("propiedades").select("id", { count: "exact", head: true }).eq("archivada", false),
        supabase.from("desarrollos").select("id", { count: "exact", head: true }).eq("archivado", false),
        supabase.from("articulos").select("id", { count: "exact", head: true }).eq("archivado", false),
        supabase.from("suscriptores").select("id", { count: "exact", head: true }),
      ]);
      return { propiedades: p.count ?? 0, desarrollos: d.count ?? 0, articulos: a.count ?? 0, suscriptores: s.count ?? 0 };
    },
  });

  return (
    <div>
      <h1 className="section-title text-white">Resumen</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["Propiedades", data?.propiedades],
          ["Desarrollos", data?.desarrollos],
          ["Artículos", data?.articulos],
          ["Suscriptores", data?.suscriptores],
        ].map(([label, valor]) => (
          <AdminCard key={String(label)}>
            <div className="text-2xl text-gold">{valor ?? "—"}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">{label}</div>
          </AdminCard>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ACCESOS.map((a) => (
          <Link key={a.label} to={a.to as never} params={a.params as never} className="block">
            <AdminCard className="h-full transition-colors hover:border-gold/50">
              <div className="text-sm text-white">{a.label}</div>
              <div className="mt-1 text-xs text-white/50">{a.desc}</div>
            </AdminCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
