import { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard, Btn } from "@/components/admin/ui";

const ALERTA_OSCURA = {
  background: "#1A1A1A",
  color: "#ffffff",
} as const;

export type FilaDestacada = {
  id: string;
  nombre: string;
  categoriaLabel: string;
  orden_destacada: number;
};

/**
 * Orden de las propiedades o desarrollos destacados en Inicio, independiente
 * del orden de catálogo (campo "Orden" de cada registro). Cada movimiento se
 * guarda de inmediato, igual que "Archivar" en las listas de propiedades y
 * desarrollos — sin un paso aparte de "Guardar".
 */
export function DestacadasOrden({
  tabla,
  entidad,
  filas,
  limite,
  onCambiado,
}: {
  /** Tabla de Supabase a actualizar. */
  tabla: "propiedades" | "desarrollos";
  /** Nombre en singular, para el mensaje cuando no hay nada marcado (p. ej. "propiedad"). */
  entidad: string;
  filas: FilaDestacada[];
  /** Cuántas de estas, en el orden actual, realmente se muestran en Inicio. */
  limite: number;
  onCambiado: () => void;
}) {
  const [moviendo, setMoviendo] = useState(false);

  const lista = [...filas].sort((a, b) => a.orden_destacada - b.orden_destacada);

  const mover = async (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= lista.length || moviendo) return;
    const next = [...lista];
    [next[i], next[j]] = [next[j], next[i]];

    setMoviendo(true);
    const resultados = await Promise.all(
      next.map((f, idx) => supabase.from(tabla).update({ orden_destacada: idx }).eq("id", f.id)),
    );
    setMoviendo(false);

    const fallo = resultados.find((r) => r.error);
    if (fallo) {
      Swal.fire({
        ...ALERTA_OSCURA,
        icon: "error",
        title: "No se pudo guardar el orden",
        text: fallo.error?.message,
        confirmButtonColor: "#C6A35A",
      });
      return;
    }
    onCambiado();
  };

  return (
    <AdminCard className="space-y-3">
      <div>
        <div className="text-sm font-medium text-white">Orden de destacadas en Inicio</div>
        <p className="mt-1 text-[11px] text-white/40">
          Independiente del orden de catálogo. Se muestran las primeras {limite} en este orden
          (ajustable en Contenido → Inicio).
        </p>
      </div>

      {lista.length === 0 ? (
        <p className="text-sm text-white/50">
          Todavía no hay {entidad === "propiedad" ? "propiedades" : "desarrollos"} publicados
          marcados como destacado.
        </p>
      ) : (
        <div className="space-y-2">
          {lista.map((f, i) => {
            const entra = i < limite;
            return (
              <div
                key={f.id}
                className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2 ${
                  entra ? "border-white/10 bg-black/20" : "border-white/5 bg-black/10 opacity-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 text-right text-xs text-white/30">{i + 1}</span>
                  <div>
                    <div className="text-sm text-white">{f.nombre}</div>
                    <div className="text-[11px] text-white/40">
                      {f.categoriaLabel}
                      {!entra && " · no se muestra (excede el límite)"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Btn
                    type="button"
                    variant="ghost"
                    disabled={i === 0 || moviendo}
                    onClick={() => mover(i, -1)}
                  >
                    ↑
                  </Btn>
                  <Btn
                    type="button"
                    variant="ghost"
                    disabled={i === lista.length - 1 || moviendo}
                    onClick={() => mover(i, 1)}
                  >
                    ↓
                  </Btn>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminCard>
  );
}
