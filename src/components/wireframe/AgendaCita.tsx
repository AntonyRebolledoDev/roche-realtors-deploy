import { useState } from "react";
import { BtnPH, SectionBand, SectionHeader } from "./primitives";
import { useSiteContent } from "@/lib/site-content";

const TIPOS = ["WhatsApp", "Videollamada", "Presencial"] as const;
const HORARIOS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "16:00", "16:30", "17:00"];
const DIAS_SEMANA = ["L", "M", "M", "J", "V", "S", "D"];

export function AgendaCita() {
  const c = useSiteContent("global").agendaCita;
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>("Videollamada");
  const [dia, setDia] = useState<number>(15);
  const [hora, setHora] = useState<string>("10:00");

  // 35 días para el grid (5 semanas)
  const dias = Array.from({ length: 35 }, (_, i) => i - 2); // offset para simular mes

  return (
    <SectionBand bg="gray">
      <SectionHeader
        title={c.titulo}
        intro={c.intro}
        center
      />

      <div className="border border-dashed border-border bg-card p-4 md:p-6">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">
          Placeholder · Embed Cal.com (pendiente configuración)
        </div>

        {/* Paso 1 · Tipo de cita */}
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            Paso 1 · Tipo de cita
          </div>
          <div className="inline-flex border border-border bg-secondary p-1">
            {TIPOS.map((t) => (
              <button
                key={t}
                onClick={() => setTipo(t)}
                className={`px-4 py-2 text-xs uppercase tracking-wider ${
                  tipo === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-foreground hover:bg-card"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Paso 2 · Calendario + horarios */}
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            Paso 2 · Elija día y hora
          </div>
          <div className="grid md:grid-cols-3 gap-6 border border-border p-4 bg-secondary">
            {/* Calendario */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <button className="w-8 h-8 border border-border bg-card">‹</button>
                <div className="text-sm font-semibold text-foreground">
                  Mes AAAA
                </div>
                <button className="w-8 h-8 border border-border bg-card">›</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-[10px] uppercase text-muted-foreground mb-1">
                {DIAS_SEMANA.map((d, i) => (
                  <div key={i} className="text-center py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {dias.map((d, i) => {
                  const valid = d > 0 && d <= 30;
                  const isSelected = valid && d === dia;
                  const isDisabled = !valid || d < 5 || d % 7 === 0;
                  return (
                    <button
                      key={i}
                      disabled={isDisabled}
                      onClick={() => valid && setDia(d)}
                      className={`aspect-square text-xs border ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-foreground"
                          : isDisabled
                          ? "border-border text-muted-foreground bg-card"
                          : "border-border bg-card text-foreground hover:border-border"
                      }`}
                    >
                      {valid ? d : ""}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Horarios */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                Horarios disponibles
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-h-72 overflow-auto pr-1">
                {HORARIOS.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHora(h)}
                    className={`text-xs px-3 py-2 border text-left ${
                      hora === h
                        ? "bg-primary text-primary-foreground border-foreground"
                        : "bg-card text-foreground border-border hover:border-border"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Paso 3 · Datos */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            Paso 3 · Sus datos
          </div>
          <form className="grid md:grid-cols-2 gap-4 border border-border p-4 bg-secondary">
            {[
              { l: "Nombre *", req: true },
              { l: "Email *", req: true },
              { l: "WhatsApp / Teléfono *", req: true },
              { l: "Añadir invitados (emails separados por coma)", req: false },
            ].map((f) => (
              <div key={f.l} className={f.l.startsWith("Añadir") ? "md:col-span-2" : ""}>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  {f.l}
                </label>
                <input
                  className="w-full border border-border bg-card px-3 py-2 text-sm"
                  placeholder={f.l.replace(" *", "")}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                Notas adicionales
              </label>
              <textarea
                rows={3}
                className="w-full border border-border bg-card px-3 py-2 text-sm"
                placeholder="Cuéntenos brevemente el motivo de la cita"
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-muted-foreground">
                Selección actual: <strong>{tipo}</strong> · Día {dia} · {hora} h
              </div>
              <BtnPH label="Confirmar cita" size="lg" />
            </div>
          </form>
        </div>
      </div>
    </SectionBand>
  );
}
