import { useRef, useState } from "react";
import { subirImagen, TIPOS_IMAGEN } from "@/lib/media";
import { Label } from "./ui";
import { cn } from "@/lib/utils";

type ItemGaleria = { src?: string; alt: string };

export function GaleriaField({
  value,
  onChange,
  carpeta = "galeria",
}: {
  value: ItemGaleria[];
  onChange: (v: ItemGaleria[]) => void;
  carpeta?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragIndex = useRef<number | null>(null);
  const [sobreZona, setSobreZona] = useState(false);
  const [subiendo, setSubiendo] = useState<{ total: number; hechos: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const subirArchivos = async (archivos: File[]) => {
    const validos = archivos.filter((f) => TIPOS_IMAGEN.includes(f.type));
    if (!validos.length) {
      setError("Formato no válido. Use JPG, PNG o WebP.");
      return;
    }
    setError(null);
    setSubiendo({ total: validos.length, hechos: 0 });
    const resultados = await Promise.allSettled(
      validos.map(async (file) => {
        const src = await subirImagen(file, carpeta);
        setSubiendo((s) => (s ? { ...s, hechos: s.hechos + 1 } : s));
        return { src, alt: file.name.replace(/\.[^.]+$/, "") };
      }),
    );
    const nuevas = resultados
      .filter((r) => r.status === "fulfilled")
      .map((r) => (r as PromiseFulfilledResult<ItemGaleria>).value);
    const fallidas = resultados.length - nuevas.length;
    if (nuevas.length) onChange([...value, ...nuevas]);
    if (fallidas) setError(`${fallidas} imagen(es) no se pudieron subir.`);
    setSubiendo(null);
  };

  const moverA = (destino: number) => {
    const origen = dragIndex.current;
    dragIndex.current = null;
    if (origen === null || origen === destino) return;
    const next = [...value];
    const [movida] = next.splice(origen, 1);
    next.splice(destino, 0, movida);
    onChange(next);
  };

  return (
    <div>
      <Label>Galería</Label>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {value.map((item, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => {
              dragIndex.current = i;
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              moverA(i);
            }}
            className="group relative aspect-square cursor-move overflow-hidden rounded-md border border-white/10 bg-black/40"
          >
            {item.src ? (
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[10px] text-white/30">
                Sin imagen
              </div>
            )}
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              aria-label="Quitar imagen"
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-white/90 opacity-0 transition-opacity hover:bg-red-600/90 group-hover:opacity-100"
            >
              ×
            </button>
            <input
              value={item.alt}
              placeholder="Descripción"
              onChange={(e) => {
                const next = [...value];
                next[i] = { ...next[i], alt: e.target.value };
                onChange(next);
              }}
              className="absolute inset-x-0 bottom-0 w-full bg-black/70 px-1.5 py-1 text-[10px] text-white/80 outline-hidden focus:bg-black/90"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setSobreZona(true);
          }}
          onDragLeave={() => setSobreZona(false)}
          onDrop={(e) => {
            e.preventDefault();
            setSobreZona(false);
            subirArchivos(Array.from(e.dataTransfer.files));
          }}
          disabled={!!subiendo}
          className={cn(
            "flex aspect-square flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed text-[10px] text-white/50 transition-colors",
            sobreZona ? "border-gold bg-gold/10 text-gold" : "border-white/15 hover:border-gold/60 hover:text-white/80",
          )}
        >
          {subiendo ? (
            <span>
              Subiendo {subiendo.hechos}/{subiendo.total}…
            </span>
          ) : (
            <>
              <span className="text-lg leading-none">+</span>
              <span className="px-1 text-center leading-tight">Añadir imágenes</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          const archivos = Array.from(e.target.files ?? []);
          if (archivos.length) subirArchivos(archivos);
          e.target.value = "";
        }}
      />

      <p className="mt-2 text-[11px] text-white/40">
        Arrastre imágenes a la casilla punteada para subir varias a la vez, o arrastre una miniatura sobre otra para reordenar.
      </p>
      {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
    </div>
  );
}
