import { useState } from "react";
import { Btn, Label, TextInput } from "./ui";
import { CATALOGOS } from "@/content/fichas";
import { cn } from "@/lib/utils";

/** Estilo compartido del chip, igual al de las tarjetas de la ficha pública. */
function Chip({
  activo,
  texto,
  onClick,
}: {
  activo: boolean;
  texto: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
        activo
          ? "border-white/10 bg-white/5 text-white hover:border-gold/50"
          : "border-white/5 bg-black/20 text-white/30 line-through hover:text-white/50",
      )}
    >
      <span className={activo ? "text-gold" : "text-white/20"}>{activo ? "✓" : "✕"}</span>
      <span className="truncate">{texto}</span>
    </button>
  );
}

type Caracteristica = { label: string; incluido: boolean };

/**
 * Checklist precargado de características y equipamiento: en vez de un
 * formulario por elemento (etiqueta + casilla), muestra todas las
 * características ya cargadas como chips — igual al bloque de la ficha
 * pública — y basta un clic para incluir o excluir cada una.
 */
export function CaracteristicasField({
  value,
  onChange,
}: {
  value: Caracteristica[];
  onChange: (v: Caracteristica[]) => void;
}) {
  const [nueva, setNueva] = useState("");

  const agregar = () => {
    const label = nueva.trim();
    if (!label || value.some((c) => c.label === label)) return;
    onChange([...value, { label, incluido: true }]);
    setNueva("");
  };

  return (
    <div className="space-y-3">
      <Label>Características y equipamiento</Label>
      <p className="text-[11px] text-white/40">
        Todas aparecen precargadas e incluidas. Haz clic en una para excluirla (o volver a incluirla).
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {value.map((c, i) => (
          <Chip
            key={`${c.label}-${i}`}
            activo={c.incluido}
            texto={c.label}
            onClick={() => onChange(value.map((it, j) => (j === i ? { ...it, incluido: !it.incluido } : it)))}
          />
        ))}
      </div>
      <div className="flex gap-2 pt-1">
        <TextInput
          value={nueva}
          placeholder="Agregar otra característica…"
          onChange={(e) => setNueva(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              agregar();
            }
          }}
        />
        <Btn type="button" variant="soft" onClick={agregar}>
          Añadir
        </Btn>
      </div>
    </div>
  );
}

/**
 * Checklist precargado de amenidades a partir de un catálogo (por defecto
 * `CATALOGOS.amenidadesBase`): un clic agrega o quita la amenidad del
 * arreglo guardado.
 */
export function AmenidadesField({
  value,
  onChange,
  catalogo: catalogoBase = CATALOGOS.amenidadesBase,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  /** Catálogo precargado a mostrar (por defecto, el de propiedades). */
  catalogo?: string[];
}) {
  const [nueva, setNueva] = useState("");
  const catalogo = [
    ...catalogoBase,
    ...value.filter((v) => !catalogoBase.includes(v)),
  ];

  const agregar = () => {
    const item = nueva.trim();
    if (!item || value.includes(item)) return;
    onChange([...value, item]);
    setNueva("");
  };

  return (
    <div className="space-y-3">
      <Label>Amenidades</Label>
      <p className="text-[11px] text-white/40">
        Todas las amenidades del catálogo aparecen precargadas. Haz clic en una para quitarla (o volver a agregarla).
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {catalogo.map((item) => {
          const activo = value.includes(item);
          return (
            <Chip
              key={item}
              activo={activo}
              texto={item}
              onClick={() => onChange(activo ? value.filter((v) => v !== item) : [...value, item])}
            />
          );
        })}
      </div>
      <div className="flex gap-2 pt-1">
        <TextInput
          value={nueva}
          placeholder="Agregar otra amenidad…"
          onChange={(e) => setNueva(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              agregar();
            }
          }}
        />
        <Btn type="button" variant="soft" onClick={agregar}>
          Añadir
        </Btn>
      </div>
    </div>
  );
}
