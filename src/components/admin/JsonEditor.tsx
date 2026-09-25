import { Btn, ImageField, Label, TextArea, TextInput } from "./ui";

const IMAGEN_RE = /(imagen|portada|foto|banner|logo|icon|thumb|src|mapa|desktop|mobile)/i;
const LARGO_RE = /(texto|descripcion|parrafo|resumen|nota|contenido|bio|intro|cuerpo|desc)/i;

const etiqueta = (k: string) =>
  k
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

function nuevoComo(ejemplo: unknown): unknown {
  if (Array.isArray(ejemplo)) return [];
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

  if (Array.isArray(value)) {
    const modelo = value[0];
    return (
      <div className="space-y-3">
        {nombre && <Label>{etiqueta(nombre)}</Label>}
        {value.map((item, i) => (
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
              value={item}
              nivel={nivel + 1}
              onChange={(v) => {
                const next = [...value];
                next[i] = v;
                onChange(next);
              }}
            />
          </div>
        ))}
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
