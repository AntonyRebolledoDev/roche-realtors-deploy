import { Btn, ImageField, Label, Select, TextArea, TextInput } from "./ui";
import { GaleriaField } from "./GaleriaField";

const IMAGEN_RE = /(imagen|portada|foto|banner|logo|icon|thumb|src|desktop|mobile)/i;
const MAPA_RE = /^mapa$/i;
const LARGO_RE = /(texto|descripcion|parrafo|resumen|nota|contenido|bio|intro|cuerpo|desc)/i;

// Opciones fijas para el campo `estatus` (par label/valor administrado como select)
const ESTATUS_OPCIONES: Record<string, string[]> = {
  Estatus: ["Disponible", "Apartado(a)", "Vendido", "Rentado"],
  "Estado de conservación": ["Nuevo", "Regular", "Por remodelar", "Bueno", "Excelente"],
};

// Etiquetas legibles alineadas con los títulos de la página pública
const LABEL_MAP: Record<string, string> = {
  // Mercado — secciones (coinciden con los títulos de /inteligencia-de-mercado)
  etiquetas: "Títulos de sección (página pública)",
  kpisHorizontal: "KPIs — Vivienda horizontal",
  kpisVertical: "KPIs — Vivienda vertical",
  demograficos: "01 · Datos demográficos",
  nse: "01 · Nivel socioeconómico — composición del mercado",
  lecturaNSE: "01 · Lectura — Nivel socioeconómico",
  precioHorizontal: "02 · Evolución del precio — Horizontal",
  precioVertical: "02 · Evolución del precio — Vertical",
  variaciones: "02 · Variaciones de precio",
  precioSegmento: "02 · Precio por segmento",
  destacadoVertical: "02 · Destacado vivienda vertical",
  absorcion: "03 · Absorción según tipo de producto",
  proyectosMunicipio: "04 · Proyectos por municipio",
  notaMunicipios: "04 · Nota sobre municipios",
  callouts: "04 · Datos destacados por municipio",
};

const etiqueta = (k: string) =>
  LABEL_MAP[k] ??
  k
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

function nuevoComo(ejemplo: unknown): unknown {
  // Para tuplas (p. ej. ["Construcción", "180 m²"]) se conserva la forma —
  // mismo número de campos, vacíos — en vez de devolver un arreglo vacío,
  // que al guardarse como elemento "roto" hacía fallar la ficha pública.
  if (Array.isArray(ejemplo)) return ejemplo.map((v) => nuevoComo(v));
  if (ejemplo && typeof ejemplo === "object") {
    return Object.fromEntries(Object.entries(ejemplo).map(([k, v]) => [k, nuevoComo(v)]));
  }
  if (typeof ejemplo === "number") return 0;
  if (typeof ejemplo === "boolean") return false;
  return "";
}

/**
 * Editor de contenido genérico: muestra los campos del módulo con etiquetas
 * legibles. No expone diseño, orden de secciones ni estilos.
 */
export function JsonEditor({
  value,
  onChange,
  nombre,
  nivel = 0,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  nombre?: string;
  nivel?: number;
}) {
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 text-sm text-white/80">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-[#C6A35A]"
        />
        {nombre ? etiqueta(nombre) : "Activado"}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <div>
        {nombre && <Label>{etiqueta(nombre)}</Label>}
        <TextInput
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    );
  }

  if (typeof value === "string" || value === null || value === undefined) {
    const v = (value ?? "") as string;
    const key = nombre ?? "";
    if (IMAGEN_RE.test(key)) {
      return (
        <div>
          <Label>{etiqueta(key)}</Label>
          <ImageField value={v} onChange={onChange} />
        </div>
      );
    }
    if (MAPA_RE.test(key)) {
      return (
        <div>
          <Label>Mapa (URL embed de Google Maps)</Label>
          <TextInput
            value={v}
            placeholder="https://www.google.com/maps/embed?pb=…"
            onChange={(e) => onChange(e.target.value)}
          />
          <p className="mt-1 text-[11px] text-white/40">
            En Google Maps → Compartir → Insertar mapa → copiar solo la URL del src del iframe
          </p>
        </div>
      );
    }
    const largo = LARGO_RE.test(key) || v.length > 90;
    return (
      <div>
        {nombre && <Label>{etiqueta(nombre)}</Label>}
        {largo ? (
          <TextArea rows={Math.min(10, Math.max(3, Math.ceil(v.length / 90)))} value={v} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <TextInput value={v} onChange={(e) => onChange(e.target.value)} />
        )}
      </div>
    );
  }

  if (nombre === "estatus" && Array.isArray(value)) {
    const tuplas = value as [string, string][];
    const setValor = (label: string, valor: string) => {
      const labels = Object.keys(ESTATUS_OPCIONES);
      const siguiente = labels.map((l) => {
        if (l === label) return [l, valor] as [string, string];
        const existente = tuplas.find((t) => t[0] === l);
        return [l, existente?.[1] ?? ESTATUS_OPCIONES[l][0]] as [string, string];
      });
      onChange(siguiente);
    };
    return (
      <div className="space-y-4">
        {Object.entries(ESTATUS_OPCIONES).map(([label, opciones]) => {
          const actual = tuplas.find((t) => t[0] === label)?.[1] ?? "";
          return (
            <div key={label}>
              <Label>{label}</Label>
              <Select value={actual} onChange={(e) => setValor(label, e.target.value)}>
                {!opciones.includes(actual) && <option value="">— Seleccionar —</option>}
                {opciones.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Select>
            </div>
          );
        })}
      </div>
    );
  }

  if (nombre === "galeria" && Array.isArray(value)) {
    return (
      <GaleriaField
        value={value as { src?: string; alt: string }[]}
        onChange={(v) => onChange(v)}
      />
    );
  }

  if (Array.isArray(value)) {
    const modelo = value[0];
    const plantilla: Record<string, unknown> | null =
      modelo && typeof modelo === "object" && !Array.isArray(modelo)
        ? (nuevoComo(modelo) as Record<string, unknown>)
        : null;
    return (
      <div className="space-y-3">
        {nombre && <Label>{etiqueta(nombre)}</Label>}
        {value.map((item, i) => {
          const itemCompleto =
            plantilla && typeof item === "object" && item !== null && !Array.isArray(item)
              ? { ...plantilla, ...(item as Record<string, unknown>) }
              : item;
          return (
          <div key={i} className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold">#{i + 1}</span>
              <div className="flex gap-1">
                <Btn
                  type="button"
                  variant="ghost"
                  disabled={i === 0}
                  onClick={() => {
                    const next = [...value];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    onChange(next);
                  }}
                >
                  ↑
                </Btn>
                <Btn
                  type="button"
                  variant="ghost"
                  disabled={i === value.length - 1}
                  onClick={() => {
                    const next = [...value];
                    [next[i + 1], next[i]] = [next[i], next[i + 1]];
                    onChange(next);
                  }}
                >
                  ↓
                </Btn>
                <Btn
                  type="button"
                  variant="ghost"
                  onClick={() => onChange(value.filter((_, j) => j !== i))}
                >
                  Quitar
                </Btn>
              </div>
            </div>
            <JsonEditor
              value={itemCompleto}
              nivel={nivel + 1}
              onChange={(v) => {
                const next = [...value];
                next[i] = v;
                onChange(next);
              }}
            />
          </div>
          );
        })}
        <Btn
          type="button"
          variant="soft"
          onClick={() => onChange([...value, nuevoComo(modelo ?? "")])}
        >
          Añadir elemento
        </Btn>
      </div>
    );
  }

  const entries = Object.entries(value as Record<string, unknown>);
  return (
    <div className={nivel === 0 ? "space-y-6" : "space-y-4"}>
      {nombre && nivel > 0 && (
        <div className="text-sm font-medium text-white/80">{etiqueta(nombre)}</div>
      )}
      {entries.map(([k, v]) => (
        <div
          key={k}
          className={
            v && typeof v === "object" ? "rounded-lg border border-white/10 p-4" : undefined
          }
        >
          <JsonEditor
            value={v}
            nombre={k}
            nivel={nivel + 1}
            onChange={(nv) => onChange({ ...(value as object), [k]: nv })}
          />
        </div>
      ))}
    </div>
  );
}
