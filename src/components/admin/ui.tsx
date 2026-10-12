import { useRef, useState, type ReactNode } from "react";
import { subirImagen } from "@/lib/media";
import { cn } from "@/lib/utils";

export function AdminCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-white/10 bg-white/[0.03] p-5", className)}>
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <span className="block text-xs uppercase tracking-[0.18em] text-white/50 mb-2">{children}</span>;
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-hidden focus:border-gold",
        props.className,
      )}
    />
  );
}

/**
 * Campo de texto con un prefijo y/o sufijo fijos (p. ej. "$" … "MXN", o
 * … "m²") para que no haya que escribir el símbolo cada vez. El valor que
 * se entrega a `onChange` ya incluye el prefijo/sufijo compuesto.
 */
export function UnitInput({
  value,
  onChange,
  prefix = "",
  suffix,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix: string;
  placeholder?: string;
}) {
  let nucleo = (value ?? "").trim();
  if (prefix && nucleo.startsWith(prefix)) nucleo = nucleo.slice(prefix.length);
  if (nucleo.endsWith(suffix)) nucleo = nucleo.slice(0, -suffix.length);
  nucleo = nucleo.trim();

  return (
    <div className="flex items-stretch rounded-md border border-white/15 bg-black/40 focus-within:border-gold">
      {prefix && <span className="flex items-center pl-3 text-sm text-white/40">{prefix}</span>}
      <input
        value={nucleo}
        placeholder={placeholder}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v ? `${prefix}${v} ${suffix}` : "");
        }}
        className="w-full bg-transparent px-2 py-2 text-sm text-white outline-hidden"
      />
      <span className="flex items-center pr-3 text-sm text-white/40">{suffix}</span>
    </div>
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-hidden focus:border-gold",
        props.className,
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm leading-6 text-white outline-hidden focus:border-gold",
        props.className,
      )}
    />
  );
}

export function Btn({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "soft" }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50",
        variant === "primary" && "bg-gold text-ink hover:bg-gold/90",
        variant === "soft" && "border border-white/15 bg-white/5 text-white hover:border-gold/60",
        variant === "ghost" && "text-white/60 hover:text-gold",
        className,
      )}
    />
  );
}

export function ImageField({
  value,
  onChange,
  hint,
  carpeta = "general",
}: {
  value?: string;
  onChange: (url: string) => void;
  hint?: string;
  carpeta?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="h-20 w-32 shrink-0 overflow-hidden rounded-md border border-white/10 bg-black/40">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-white/30">Sin imagen</div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <TextInput
            value={value ?? ""}
            placeholder="URL de la imagen"
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Btn type="button" variant="soft" disabled={busy} onClick={() => ref.current?.click()}>
              {busy ? "Subiendo…" : "Subir imagen"}
            </Btn>
            {value && (
              <Btn type="button" variant="ghost" onClick={() => onChange("")}>
                Quitar
              </Btn>
            )}
          </div>
          <p className="text-[11px] text-white/40">
            JPG, PNG o WebP · máx. 10 MB{hint ? ` · recomendado ${hint}` : ""}
          </p>
          {error && <p className="text-[11px] text-red-400">{error}</p>}
        </div>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setBusy(true);
          setError(null);
          try {
            onChange(await subirImagen(file, carpeta));
          } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo subir la imagen");
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}
