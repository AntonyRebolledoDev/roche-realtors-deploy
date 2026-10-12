import { Btn, Label, TextInput, UnitInput } from "./ui";

/** Campos de "Medidas" que representan una superficie y por lo tanto usan m². */
const AREA_RE = /terreno|construcci|dimensi|superficie/i;

type Tupla = [string, string];

export function MedidasField({
  value,
  onChange,
}: {
  value: Tupla[];
  onChange: (v: Tupla[]) => void;
}) {
  const set = (i: number, campo: 0 | 1, v: string) => {
    const next = value.map((fila) => [...fila] as Tupla);
    next[i] = next[i] ?? ["", ""];
    next[i][campo] = v;
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <Label>Medidas</Label>
      {value.map((fila, i) => {
        const [etiquetaFila, valorFila] = fila ?? ["", ""];
        const esArea = AREA_RE.test(etiquetaFila ?? "");
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
                <Btn type="button" variant="ghost" onClick={() => onChange(value.filter((_, j) => j !== i))}>
                  Quitar
                </Btn>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Campo</Label>
                <TextInput
                  value={etiquetaFila ?? ""}
                  placeholder="p. ej. Terreno"
                  onChange={(e) => set(i, 0, e.target.value)}
                />
              </div>
              <div>
                <Label>Valor</Label>
                {esArea ? (
                  <UnitInput
                    value={valorFila ?? ""}
                    suffix="m²"
                    placeholder="300"
                    onChange={(v) => set(i, 1, v)}
                  />
                ) : (
                  <TextInput
                    value={valorFila ?? ""}
                    placeholder="valor"
                    onChange={(e) => set(i, 1, e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
      <Btn type="button" variant="soft" onClick={() => onChange([...value, ["", ""]])}>
        Añadir elemento
      </Btn>
    </div>
  );
}
