import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "@/integrations/supabase/client";
import { JsonEditor } from "@/components/admin/JsonEditor";
import { AdminCard, Btn, Label, TextInput, ImageField } from "@/components/admin/ui";
import { DestacadasOrden } from "@/components/admin/DestacadasOrden";
import { PROPIEDADES_DEMO } from "@/content/fichas";
import { useSiteContent, limiteDestacadasHome } from "@/lib/site-content";

// Tema oscuro acorde al panel de administración.
const ALERTA_OSCURA = {
  background: "#1A1A1A",
  color: "#ffffff",
} as const;

export const Route = createFileRoute("/admin/propiedades")({
  component: AdminPropiedades,
});

const CATEGORIAS = [
  ["casa", "Casa"],
  ["departamento", "Departamento"],
  ["terreno-residencial", "Terreno residencial"],
  ["macrolote", "Terreno macrolote"],
  ["hacienda", "Hacienda"],
  ["comercial-industrial", "Comercial / Industrial"],
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
  orden_destacada: number;
  data: Record<string, unknown>;
};

/**
 * Completa con los campos de la plantilla de su categoría los que falten en
 * una propiedad ya guardada (p. ej. si se creó antes de que la plantilla
 * incluyera "Precio"), sin tocar los valores que ya tiene.
 */
function conPlantilla(f: Fila): Fila {
  const plantilla = PROPIEDADES_DEMO[f.categoria] as Record<string, unknown> | undefined;
  return plantilla ? { ...f, data: { ...plantilla, ...f.data } } : f;
}

/** Ruta dentro del bucket "media" a partir de una URL pública de Supabase Storage. */
function rutaStorage(url: unknown): string | null {
  if (typeof url !== "string") return null;
  const marcador = "/object/public/media/";
  const i = url.indexOf(marcador);
  return i === -1 ? null : url.slice(i + marcador.length);
}

/** Todas las imágenes (portada + galería) referenciadas por una propiedad. */
function imagenesDe(data: Record<string, unknown>): string[] {
  const urls: unknown[] = [data.imagenPortada];
  if (Array.isArray(data.galeria)) {
    for (const g of data.galeria) {
      if (g && typeof g === "object") urls.push((g as Record<string, unknown>).src);
    }
  }
  return urls.map(rutaStorage).filter((r): r is string => !!r);
}

function AdminPropiedades() {
  const qc = useQueryClient();
  const limiteDestacadas = limiteDestacadasHome(useSiteContent("inicio").destacadas.cantidad);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState<string>("todas");
  const [verArchivadas, setVerArchivadas] = useState(false);
  const [edicion, setEdicion] = useState<Fila | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eliminando, setEliminando] = useState<string | null>(null);

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

  // Mismo conjunto que ve el Home: publicadas, no archivadas y destacadas.
  const filasDestacadas = (filas ?? [])
    .filter((f) => f.destacada && !f.archivada && f.estado === "publicada")
    .map((f) => ({
      id: f.id,
      nombre: f.nombre,
      categoriaLabel: CATEGORIAS.find(([v]) => v === f.categoria)?.[1] ?? f.categoria,
      orden_destacada: f.orden_destacada,
    }));

  const refrescar = () => qc.invalidateQueries({ queryKey: ["admin-propiedades"] });

  const eliminar = async (f: Fila) => {
    const { isConfirmed } = await Swal.fire({
      ...ALERTA_OSCURA,
      icon: "warning",
      title: "¿Eliminar propiedad?",
      text: `Esto elimina "${f.nombre}" y todas sus imágenes de forma permanente. Esta acción no se puede deshacer.`,
      showCancelButton: true,
      reverseButtons: true,
      focusCancel: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#dc2626",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#3f3f3f",
    });
    if (!isConfirmed) return;

    setEliminando(f.id);
    const rutas = imagenesDe(f.data);
    if (rutas.length) await supabase.storage.from("media").remove(rutas);
    const { error } = await supabase.from("propiedades").delete().eq("id", f.id);
    setEliminando(null);

    if (error) {
      Swal.fire({
        ...ALERTA_OSCURA,
        icon: "error",
        title: "No se pudo eliminar",
        text: error.message,
        confirmButtonColor: "#C6A35A",
      });
      return;
    }
    refrescar();
    Swal.fire({
      ...ALERTA_OSCURA,
      icon: "success",
      title: "Propiedad eliminada",
      toast: true,
      position: "top-end",
      timer: 2500,
      showConfirmButton: false,
    });
  };

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
    const etiquetaCategoria = CATEGORIAS.find(([v]) => v === edicion.categoria)?.[1] ?? edicion.categoria;
    const payload = {
      slug: edicion.slug || slugify(edicion.nombre),
      nombre: edicion.nombre,
      categoria: edicion.categoria,
      estado: edicion.estado,
      destacada: edicion.destacada,
      archivada: edicion.archivada,
      orden: edicion.orden,
      // El nombre y la categoría se capturan arriba en campos dedicados; se
      // reflejan aquí para que no queden desincronizados con los que se
      // guardaron dentro de `data` (usados por la ficha pública).
      data: { ...edicion.data, nombre: edicion.nombre, categoria: etiquetaCategoria } as never,
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
              <p className="mt-1 text-[11px] text-white/40">
                Define el orden dentro de su categoría en /propiedades (menor va primero). El
                orden en Inicio se ajusta aparte, en el panel de destacadas.
              </p>
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

        <AdminCard className="mt-6 space-y-2">
          <Label>Imagen de portada</Label>
          <ImageField
            value={(edicion.data.imagenPortada as string) ?? ""}
            hint="1200×675 px (16:9)"
            carpeta="propiedades"
            onChange={(url) =>
              setEdicion({ ...edicion, data: { ...edicion.data, imagenPortada: url || undefined } })
            }
          />
        </AdminCard>

        <AdminCard className="mt-6 space-y-2">
          <Label>Mapa de ubicación (URL embed de Google Maps)</Label>
          <TextInput
            value={(edicion.data.mapa as string) ?? ""}
            placeholder="https://www.google.com/maps/embed?pb=…"
            onChange={(e) =>
              setEdicion({ ...edicion, data: { ...edicion.data, mapa: e.target.value || undefined } })
            }
          />
          <p className="text-[11px] text-white/40">
            Google Maps → Compartir → Insertar mapa → copiar solo la URL del src del iframe
          </p>
        </AdminCard>

        <div className="mt-6">
          <JsonEditor
            value={edicion.data}
            onChange={(v) => setEdicion({ ...edicion, data: v as Record<string, unknown> })}
            ocultar={["nombre", "categoria"]}
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
              orden_destacada: 0,
              data: { ...PROPIEDADES_DEMO.casa } as Record<string, unknown>,
            })
          }
        >
          Nueva propiedad
        </Btn>
      </div>

      <div className="mt-6">
        <DestacadasOrden
          tabla="propiedades"
          entidad="propiedad"
          filas={filasDestacadas}
          limite={limiteDestacadas}
          onCambiado={refrescar}
        />
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
              <Btn variant="soft" onClick={() => setEdicion(conPlantilla(f))}>Editar</Btn>
              <Btn
                variant="ghost"
                onClick={() => window.open(`/propiedades/${f.slug}?preview=1`, "_blank")}
              >
                Vista previa
              </Btn>
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
              {f.archivada && (
                <Btn
                  variant="ghost"
                  className="text-red-400 hover:text-red-300"
                  disabled={eliminando === f.id}
                  onClick={() => eliminar(f)}
                >
                  {eliminando === f.id ? "Eliminando…" : "Eliminar"}
                </Btn>
              )}
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
