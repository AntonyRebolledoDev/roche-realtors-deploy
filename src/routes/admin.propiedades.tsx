import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { JsonEditor } from "@/components/admin/JsonEditor";
import { AdminCard, Btn, Label, TextInput } from "@/components/admin/ui";
import { PROPIEDADES_DEMO } from "@/content/fichas";

export const Route = createFileRoute("/admin/propiedades")({
  component: AdminPropiedades,
});

const CATEGORIAS = [
  ["casa", "Casa"],
  ["departamento", "Departamento"],
  ["terreno-residencial", "Terreno residencial"],
  ["macrolote", "Terreno macrolote"],
] as const;

const MAX_DESTACADAS = 6;

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
  categoria: string;
  estado: string;
  destacada: boolean;
  archivada: boolean;
  orden: number;
  data: Record<string, unknown>;
};

function AdminPropiedades() {
  const qc = useQueryClient();
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState<string>("todas");
  const [verArchivadas, setVerArchivadas] = useState(false);
  const [edicion, setEdicion] = useState<Fila | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: filas } = useQuery({
    queryKey: ["admin-propiedades"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("propiedades")
        .select("*")
        .order("orden")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Fila[];
    },
  });

  const lista = (filas ?? []).filter(
    (f) =>
      f.archivada === verArchivadas &&
      (filtro === "todas" || f.categoria === filtro) &&
      f.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const refrescar = () => qc.invalidateQueries({ queryKey: ["admin-propiedades"] });

  const guardar = async () => {
    if (!edicion) return;
    setGuardando(true);
    setError(null);
    const destacadasCat = (filas ?? []).filter(
      (f) => f.categoria === edicion.categoria && f.destacada && !f.archivada && f.id !== edicion.id,
    ).length;
    if (edicion.destacada && destacadasCat >= MAX_DESTACADAS) {
      setError(`Solo puede destacar ${MAX_DESTACADAS} propiedades por categoría.`);
      setGuardando(false);
      return;
    }
    const payload = {
      slug: edicion.slug || slugify(edicion.nombre),
      nombre: edicion.nombre,
      categoria: edicion.categoria,
      estado: edicion.estado,
      destacada: edicion.destacada,
      archivada: edicion.archivada,
      orden: edicion.orden,
      data: edicion.data as never,
    };
    const res = edicion.id
      ? await supabase.from("propiedades").update(payload).eq("id", edicion.id)
      : await supabase.from("propiedades").insert(payload);
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
            {edicion.id ? "Editar propiedad" : "Nueva propiedad"}
          </h1>
          <div className="flex gap-2">
            <Btn variant="ghost" onClick={() => setEdicion(null)}>
              Cancelar
            </Btn>
            <Btn onClick={guardar} disabled={guardando}>
              {guardando ? "Guardando…" : "Guardar"}
            </Btn>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <AdminCard className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Nombre</Label>
              <TextInput
                value={edicion.nombre}
                onChange={(e) => setEdicion({ ...edicion, nombre: e.target.value })}
              />
            </div>
            <div>
              <Label>Categoría</Label>
              <select
                value={edicion.categoria}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                onChange={(e) => {
                  const cat = e.target.value;
                  const plantilla = PROPIEDADES_DEMO[cat];
                  setEdicion({
                    ...edicion,
                    categoria: cat,
                    data: edicion.id ? edicion.data : ({ ...plantilla } as Record<string, unknown>),
                  });
                }}
              >
                {CATEGORIAS.map(([v, l]) => (
                  <option key={v} value={v} className="bg-black">
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Estado</Label>
              <select
                value={edicion.estado}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                onChange={(e) => setEdicion({ ...edicion, estado: e.target.value })}
              >
                <option value="borrador" className="bg-black">Borrador</option>
                <option value="publicada" className="bg-black">Publicada</option>
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
              checked={edicion.destacada}
              onChange={(e) => setEdicion({ ...edicion, destacada: e.target.checked })}
            />
            Mostrar como destacada en Inicio (máximo {MAX_DESTACADAS} por categoría)
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
        <h1 className="section-title text-white">Propiedades</h1>
        <Btn
          onClick={() =>
            setEdicion({
              id: "",
              slug: "",
              nombre: "",
              categoria: "casa",
              estado: "borrador",
              destacada: false,
              archivada: false,
              orden: 0,
              data: { ...PROPIEDADES_DEMO.casa } as Record<string, unknown>,
            })
          }
        >
          Nueva propiedad
        </Btn>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <TextInput
          placeholder="Buscar por nombre…"
          className="max-w-xs"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
        >
          <option value="todas" className="bg-black">Todas las categorías</option>
          {CATEGORIAS.map(([v, l]) => (
            <option key={v} value={v} className="bg-black">{l}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[#C6A35A]"
            checked={verArchivadas}
            onChange={(e) => setVerArchivadas(e.target.checked)}
          />
          Ver archivadas
        </label>
      </div>

      <div className="mt-6 space-y-2">
        {lista.length === 0 && <p className="text-sm text-white/50">Sin registros.</p>}
        {lista.map((f) => (
          <AdminCard key={f.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <div className="text-sm text-white">{f.nombre}</div>
              <div className="text-xs text-white/45">
                {f.categoria} · {f.estado}
                {f.destacada ? " · destacada" : ""}
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="soft" onClick={() => setEdicion(f)}>Editar</Btn>
              <Btn
                variant="ghost"
                onClick={async () => {
                  await supabase
                    .from("propiedades")
                    .update({ archivada: !f.archivada })
                    .eq("id", f.id);
                  refrescar();
                }}
              >
                {f.archivada ? "Restaurar" : "Archivar"}
              </Btn>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
