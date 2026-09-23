import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard, Btn, TextInput } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/newsletter")({
  component: Suscriptores,
});

type Fila = { id: string; email: string; origen: string | null; created_at: string };

function Suscriptores() {
  const [q, setQ] = useState("");
  const { data } = useQuery({
    queryKey: ["admin", "suscriptores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("suscriptores")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Fila[];
    },
  });

  const filas = (data ?? []).filter((f) => f.email.toLowerCase().includes(q.toLowerCase()));

  const exportar = () => {
    const csv = ["correo,origen,fecha", ...filas.map((f) => `${f.email},${f.origen ?? ""},${f.created_at}`)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "suscriptores.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="section-title text-white">Suscriptores</h1>
        <Btn onClick={exportar} disabled={filas.length === 0}>
          Exportar CSV
        </Btn>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <TextInput
          className="max-w-xs"
          placeholder="Buscar correo…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="text-xs text-white/45">{filas.length} registros</span>
      </div>
      <AdminCard className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-white/40">
            <tr>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Origen</th>
              <th className="px-4 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody className="text-white/80">
            {filas.map((f) => (
              <tr key={f.id} className="border-t border-white/5">
                <td className="px-4 py-3">{f.email}</td>
                <td className="px-4 py-3 text-white/45">{f.origen ?? "Sitio web"}</td>
                <td className="px-4 py-3 text-white/45">
                  {new Date(f.created_at).toLocaleDateString("es-MX")}
                </td>
              </tr>
            ))}
            {filas.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-white/45" colSpan={3}>
                  Aún no hay suscriptores.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
