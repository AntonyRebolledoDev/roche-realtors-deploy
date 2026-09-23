import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { JsonEditor } from "@/components/admin/JsonEditor";
import { AdminCard, Btn, Label, TextInput } from "@/components/admin/ui";
import { DESARROLLO_DEMO } from "@/content/fichas";

export const Route = createFileRoute("/admin/desarrollos")({
  component: AdminDesarrollos,
});

const MAX_DESTACADOS = 10;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type Fila = {
  id: string;
  slug: string;
  nombre: string;
  estado: string;
  destacado: boolean;
  archivado: boolean;
  orden: number;
  data: Record<string, unknown>;
};

function AdminDesarrollos() {
  const qc = useQueryClient();
  const [busqueda, setBusqueda] = useState("");
  const [verArchivados, setVerArchivados] = useState(false);
  const [edicion, setEdicion] = useState<Fila | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: filas } = useQuery({
    queryKey: ["admin-desarrollos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("desarrollos").select("*").order("orden");
      if (error) throw error;
      return (data ?? []) as unknown as Fila[];
    },
  });

  const lista = (filas ?? []).filter(
    (f) => f.archivado === verArchivados && f.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );
  const refrescar = () => qc.invalidateQueries({ queryKey: ["admin-desarrollos"] });

  const guardar = async () => {
    if (!edicion) return;
    setGuardando(true);
    setError(null);
    const destacados = (filas ?? []).filter(
      (f) => f.destacado && !f.archivado && f.id !== edicion.id,
    ).length;
    if (edicion.destacado && destacados >= MAX_DESTACADOS) {
      setError(`Solo puede destacar ${MAX_DESTACADOS} desarrollos.`);
      setGuardando(false);
      return;
    }
    const payload = {
      slug: edicion.slug || slugify(edicion.nombre),
      nombre: edicion.nombre,
      estado: edicion.estado,
      destacado: edicion.destacado,
      archivado: edicion.archivado,
      orden: edicion.orden,
      data: edicion.data as never,
    };
    const res = edicion.id
      ? await supabase.from("desarrollos").update(payload).eq("id", edicion.id)
      : await supabase.from("desarrollos").insert(payload);
    setGuardando(false);
    if (res.error) return setError(res.error.message);
    setEdicion(null);
    refrescar();
  };

  if (edicion) {
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="section-title text-white">
            {edicion.id ? "Editar desarrollo" : "Nuevo desarrollo"}
          </h1>
          <div className="flex gap-2">
            <Btn variant="ghost" onClick={() => setEdicion(null)}>Cancelar</Btn>
            <Btn onClick={guardar} disabled={guardando}>
              {guardando ? "Guardando…" : "Guardar"}
            </Btn>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <AdminCard className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Nombre</Label>
              <TextInput
                value={edicion.nombre}
                onChange={(e) => setEdicion({ ...edicion, nombre: e.target.value })}
              />
            </div>
            <div>
              <Label>Estado</Label>
              <select
                value={edicion.estado}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                onChange={(e) => setEdicion({ ...edicion, estado: e.target.value })}
              >
                <option value="borrador" className="bg-black">Borrador</option>
                <option value="publicado" className="bg-black">Publicado</option>
              </select>
            </div>
            <div>
              <Label>Orden</Label>
              <TextInput
                type="number"
                value={edicion.orden}
                onChange={(e) => setEdicion({ ...edicion, orden: Number(e.target.value) })}
              />
            </div>
          </div>
          <label className="flex items-center gap-3 text-sm text-white/80">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#C6A35A]"
              checked={edicion.destacado}
              onChange={(e) => setEdicion({ ...edicion, destacado: e.target.checked })}
            />
            Mostrar como destacado (máximo {MAX_DESTACADOS})
          </label>
        </AdminCard>

        <div className="mt-6">
          <JsonEditor
            value={edicion.data}
            onChange={(v) => setEdicion({ ...edicion, data: v as Record<string, unknown> })}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="section-title text-white">Desarrollos</h1>
        <Btn
          onClick={() =>
            setEdicion({
              id: "",
              slug: "",
              nombre: "",
              estado: "borrador",
              destacado: false,
              archivado: false,
              orden: 0,
              data: { ...DESARROLLO_DEMO } as unknown as Record<string, unknown>,
            })
          }
        >
          Nuevo desarrollo
        </Btn>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <TextInput
          placeholder="Buscar por nombre…"
          className="max-w-xs"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[#C6A35A]"
            checked={verArchivados}
            onChange={(e) => setVerArchivados(e.target.checked)}
          />
          Ver archivados
        </label>
      </div>

      <div className="mt-6 space-y-2">
        {lista.length === 0 && <p className="text-sm text-white/50">Sin registros.</p>}
        {lista.map((f) => (
          <AdminCard key={f.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <div className="text-sm text-white">{f.nombre}</div>
              <div className="text-xs text-white/45">
                {f.estado}
                {f.destacado ? " · destacado" : ""}
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="soft" onClick={() => setEdicion(f)}>Editar</Btn>
              <Btn
                variant="ghost"
                onClick={async () => {
                  await supabase
                    .from("desarrollos")
                    .update({ archivado: !f.archivado })
                    .eq("id", f.id);
                  refrescar();
                }}
              >
                {f.archivado ? "Restaurar" : "Archivar"}
              </Btn>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
