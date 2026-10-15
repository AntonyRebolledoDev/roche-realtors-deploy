import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "@/integrations/supabase/client";
import { JsonEditor } from "@/components/admin/JsonEditor";
import { AdminCard, Btn, Label, Select, TextInput, ImageField } from "@/components/admin/ui";
import { CATALOGOS, DESARROLLO_DEMO } from "@/content/fichas";

/** Campos del nivel superior que ya se editan con un select dedicado fuera del editor genérico. */
const OCULTAR_DEL_EDITOR = ["nombre", "tipoDesarrollo", "tipoOperacion", "disponibilidad"];

// Tema oscuro acorde al panel de administraci\u00f3n.
const ALERTA_OSCURA = {
  background: "#1A1A1A",
  color: "#ffffff",
} as const;

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

/**
 * Completa con los campos de la plantilla los que falten en un desarrollo ya
 * guardado (p. ej. si se cre\u00f3 antes de que existiera un campo nuevo), sin
 * tocar los valores que ya tiene.
 */
function conPlantilla(f: Fila): Fila {
  const data: Record<string, unknown> = { ...DESARROLLO_DEMO, ...f.data };
  // Fichas guardadas antes de que "desde" tuviera selector de formato
  // traían un texto libre (p. ej. "$2,450,000 MXN"); se adapta a la nueva
  // forma {monto, formato} para que el selector funcione sin perder el dato.
  if (typeof data.desde === "string") {
    data.desde = { monto: data.desde.replace(/[^0-9.,]/g, ""), formato: "total" };
  }
  return { ...f, data };
}

/** Ruta dentro del bucket "media" a partir de una URL p\u00fablica de Supabase Storage. */
function rutaStorage(url: unknown): string | null {
  if (typeof url !== "string") return null;
  const marcador = "/object/public/media/";
  const i = url.indexOf(marcador);
  return i === -1 ? null : url.slice(i + marcador.length);
}

/** Todas las im\u00e1genes (portada, representativa, master plan y galer\u00eda) de un desarrollo. */
function imagenesDe(data: Record<string, unknown>): string[] {
  const urls: unknown[] = [data.imagen, data.imagenRepresentativa, data.masterPlan];
  if (Array.isArray(data.galeria)) {
    for (const g of data.galeria) {
      if (g && typeof g === "object") urls.push((g as Record<string, unknown>).src);
    }
  }
  return urls.map(rutaStorage).filter((r): r is string => !!r);
}

function AdminDesarrollos() {
  const qc = useQueryClient();
  const [busqueda, setBusqueda] = useState("");
  const [verArchivados, setVerArchivados] = useState(false);
  const [edicion, setEdicion] = useState<Fila | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eliminando, setEliminando] = useState<string | null>(null);

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

  const eliminar = async (f: Fila) => {
    const { isConfirmed } = await Swal.fire({
      ...ALERTA_OSCURA,
      icon: "warning",
      title: "¿Eliminar desarrollo?",
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
    const { error } = await supabase.from("desarrollos").delete().eq("id", f.id);
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
      title: "Desarrollo eliminado",
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
      // El nombre se captura arriba en un campo dedicado; se refleja aquí
      // para que no quede desincronizado con el guardado dentro de `data`.
      data: { ...edicion.data, nombre: edicion.nombre } as never,
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

        <AdminCard className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Tipo de desarrollo</Label>
              <Select
                value={(edicion.data.tipoDesarrollo as string) ?? ""}
                onChange={(e) =>
                  setEdicion({ ...edicion, data: { ...edicion.data, tipoDesarrollo: e.target.value } })
                }
              >
                {!CATALOGOS.tipoDesarrollo.includes(edicion.data.tipoDesarrollo as string) && (
                  <option value="">— Seleccionar —</option>
                )}
                {CATALOGOS.tipoDesarrollo.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Tipo de operación</Label>
              <Select
                value={(edicion.data.tipoOperacion as string) ?? ""}
                onChange={(e) =>
                  setEdicion({ ...edicion, data: { ...edicion.data, tipoOperacion: e.target.value } })
                }
              >
                {!CATALOGOS.tipoOperacion.includes(edicion.data.tipoOperacion as string) && (
                  <option value="">— Seleccionar —</option>
                )}
                {CATALOGOS.tipoOperacion.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Disponibilidad</Label>
              <Select
                value={(edicion.data.disponibilidad as string) ?? ""}
                onChange={(e) =>
                  setEdicion({ ...edicion, data: { ...edicion.data, disponibilidad: e.target.value } })
                }
              >
                {!CATALOGOS.disponibilidadDesarrollo.includes(edicion.data.disponibilidad as string) && (
                  <option value="">— Seleccionar —</option>
                )}
                {CATALOGOS.disponibilidadDesarrollo.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="mt-6 space-y-2">
          <Label>Imagen de portada</Label>
          <ImageField
            value={(edicion.data.imagen as string) ?? ""}
            hint="1200×675 px (16:9)"
            carpeta="desarrollos"
            onChange={(url) =>
              setEdicion({ ...edicion, data: { ...edicion.data, imagen: url || undefined } })
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
            ocultar={OCULTAR_DEL_EDITOR}
            catalogoAmenidades={CATALOGOS.amenidadesDesarrollo}
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
              <Btn variant="soft" onClick={() => setEdicion(conPlantilla(f))}>Editar</Btn>
              <Btn
                variant="ghost"
                onClick={() => window.open(`/desarrollos/${f.slug}?preview=1`, "_blank")}
              >
                Vista previa
              </Btn>
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
              {f.archivado && (
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
