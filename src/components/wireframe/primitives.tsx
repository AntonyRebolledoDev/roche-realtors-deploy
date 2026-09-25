import { type ReactNode, type CSSProperties } from "react";
import { Reveal } from "./Reveal";

// Sistema visual: negro, blanco y dorado. Minimalista, mucho aire,
// tipografía Outfit (títulos) + Figtree (texto), movimiento suave.

export function ImagePH({
  label = "IMAGEN",
  height,
  aspect,
  className = "",
  style,
}: {
  label?: string;
  height?: number | string;
  aspect?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const useAspect = aspect !== undefined;
  const finalHeight = useAspect ? undefined : (height ?? 240);
  return (
    <div
      className={`flex items-center justify-center bg-secondary text-muted-foreground text-[10px] tracking-[0.2em] uppercase w-full ${className}`}
      style={{ height: finalHeight, aspectRatio: aspect, ...style }}
    >
      <span className="px-2 text-center">{label}</span>
    </div>
  );
}

export function LinePH({ w = "100%" }: { w?: string | number }) {
  return <div className="h-2 bg-secondary rounded-full" style={{ width: w }} />;
}

export function ParaPH({ lines = 3 }: { lines?: number }) {
  const widths = ["100%", "97%", "94%", "88%", "92%", "78%"];
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <LinePH key={i} w={widths[i % widths.length]} />
      ))}
    </div>
  );
}

export function BtnPH({
  label,
  variant = "solid",
  size = "md",
}: {
  label: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight text-sm transition-all duration-300 ease-out";
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants = {
    solid:
      "bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[0_16px_40px_-16px_oklch(0_0_0/0.5)] hover:-translate-y-0.5",
    outline:
      "border border-border bg-transparent text-foreground hover:border-gold hover:bg-gold/10 hover:text-gold hover:-translate-y-0.5",
    ghost: "bg-transparent text-foreground hover:text-gold",
  };
  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {label}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-12 ${center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}`}>
      {eyebrow && (
        <div className={`mb-4 ${center ? "text-center" : ""}`}>
          <span className="block text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="section-title font-semibold text-foreground text-balance-tight">
        {title}
      </h2>
      <div className={`mt-5 h-px w-16 bg-gold-soft ${center ? "mx-auto" : ""}`} />
      {intro && (
        <p className="mt-4 whitespace-pre-line text-base md:text-lg text-muted-foreground leading-relaxed">{intro}</p>
      )}
    </Reveal>
  );
}

export function SectionBand({
  children,
  bg = "white",
  className = "",
}: {
  children: ReactNode;
  bg?: "white" | "gray" | "darker";
  className?: string;
}) {
  const bgClass =
    bg === "gray" ? "bg-surface" : bg === "darker" ? "bg-secondary" : "bg-background";
  return (
    <section className={`w-full ${bgClass} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function CTABand({
  title,
  support,
  btn,
}: {
  title: string;
  support: string;
  btn: string;
}) {
  return (
    <section className="w-full bg-ink text-foreground">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 text-center">
        <Reveal>
          <h2 className="section-title font-semibold text-balance-tight">{title}</h2>
          <p className="mt-4 text-base text-foreground/70 max-w-xl mx-auto leading-relaxed">
            {support}
          </p>
          <div className="mt-8 inline-flex">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5">
              {btn} <span>→</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div className="text-xs tracking-wide text-muted-foreground">
      {items.map((it, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1.5 text-gold">/</span>}
          <span className={i === items.length - 1 ? "text-foreground" : ""}>{it}</span>
        </span>
      ))}
    </div>
  );
}

export function IconPH({ size = 40 }: { size?: number }) {
  return (
    <div
      className="rounded-2xl bg-secondary text-gold flex items-center justify-center text-lg transition-colors duration-300"
      style={{ width: size, height: size }}
    >
      ◆
    </div>
  );
}

export function Chip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-4 py-2 text-xs rounded-full transition-all duration-300 ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </span>
  );
}

export function Tab({
  label,
  active = false,
  dashed = false,
}: {
  label: string;
  active?: boolean;
  dashed?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center px-5 py-2.5 text-sm rounded-full whitespace-nowrap transition-all duration-300 ${
        active
          ? "bg-primary text-primary-foreground shadow-[0_10px_30px_-14px_oklch(0_0_0/0.6)]"
          : dashed
            ? "bg-transparent text-muted-foreground hover:text-foreground"
            : "bg-secondary text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </span>
  );
}

export function PropertyCard({
  title = "Nombre de la propiedad",
  tipo = "Casa",
  operacion = "Venta",
  imagen,
  zona = "Zona / Colonia",
  detalle = "3 rec · 2 baños · 200 m²",
  precio = "$00,000,000 MXN",
}: {
  title?: string;
  tipo?: string;
   operacion?: string;
  imagen?: string;
  zona?: string;
  detalle?: string;
  precio?: string;
}) {
  return (
    <div className="group rounded-3xl bg-card overflow-hidden hover-lift border border-border transition-colors hover:border-gold-soft/50">
      <div className="relative media-zoom">
        {imagen ? (
          <img
            src={imagen}
            alt={title}
            loading="lazy"
            className="w-full object-cover"
            style={{ aspectRatio: "16 / 9" }}
          />
        ) : (
          <ImagePH label="IMAGEN" aspect="16 / 9" />
        )}
        <span className="absolute top-4 left-4 rounded-full border border-gold-soft/50 bg-background/80 backdrop-blur-md text-[11px] px-3 py-1 text-gold-soft">
          {operacion}
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-md w-9 h-9 flex items-center justify-center text-muted-foreground transition-colors group-hover:text-gold">
          ♡
        </span>
      </div>
      <div className="p-6 space-y-2.5">
        <div className="text-lg font-semibold text-foreground tracking-tight">{title}</div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-gold-soft">{tipo}</div>
        <div className="text-sm text-muted-foreground">{zona}</div>
        <div className="text-[11px] text-muted-foreground">{detalle}</div>
        <div className="text-xl font-semibold pt-1 tracking-tight">{precio}</div>
        <div className="pt-2">
          <BtnPH label="Ver propiedad" variant="outline" size="sm" />
        </div>
      </div>
    </div>
  );
}

export function ResourceCard({ hasPlay = false }: { hasPlay?: boolean }) {
  return (
    <div className="group rounded-3xl bg-card overflow-hidden hover-lift border border-border">
      <div className="relative media-zoom">
        <ImagePH label={hasPlay ? "IMAGEN ▷" : "IMAGEN"} aspect="16 / 9" />
      </div>
      <div className="p-6 space-y-3">
        <span className="card-label">Categoría</span>
        <div className="text-lg font-semibold text-foreground tracking-tight">
          Título del recurso
        </div>
        <ParaPH lines={2} />
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>DD MMM AAAA</span>
          <span className="transition-colors group-hover:text-gold">Leer más →</span>
        </div>
      </div>
    </div>
  );
}

export function Carousel({ label, height = 480 }: { label: string; height?: number }) {
  return (
    <div className="relative rounded-3xl overflow-hidden">
      <ImagePH label={label} height={height} />
      <button
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 backdrop-blur-md text-lg transition-transform hover:scale-105"
      >
        ‹
      </button>
      <button
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 backdrop-blur-md text-lg transition-transform hover:scale-105"
      >
        ›
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        <span className="w-6 h-1.5 rounded-full bg-gold" />
        <span className="w-1.5 h-1.5 rounded-full bg-background/70" />
        <span className="w-1.5 h-1.5 rounded-full bg-background/70" />
      </div>
    </div>
  );
}

export function StatCard({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="flex h-full min-h-[13rem] flex-col items-center justify-center rounded-3xl bg-card border border-gold-soft/25 p-8 text-center hover-lift">
      <div className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
        {valor}
      </div>
      <div className="mt-3 mx-auto gold-rule" style={{ background: "var(--gold)" }} />
      <div className="text-sm text-muted-foreground mt-3 leading-relaxed">{label}</div>
    </div>
  );
}

export function StatGrid({ stats }: { stats: { valor: string; label: string }[] }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 90}>
          <StatCard valor={s.valor} label={s.label} />
        </Reveal>
      ))}
    </div>
  );
}

/** Bloque de párrafos cortos con interlineado amplio, con frase-resumen opcional. */
export function Prose({
  resumen,
  parrafos,
  className = "",
}: {
  resumen?: string;
  parrafos: string[];
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {resumen && (
        <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground text-balance-tight">
          {resumen}
        </p>
      )}
      {parrafos.map((t, i) => (
        <p key={i} className="text-[15px] leading-7 text-muted-foreground">
          {t}
        </p>
      ))}
    </div>
  );
}

export function BulletList({ title, items }: { title?: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-card border border-border p-7">
      {title && (
        <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
          {title}
        </div>
      )}
      <ul className="space-y-3 text-base leading-7 text-muted-foreground">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span className="text-gold mt-0.5">—</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Resumen visible + detalle colapsable ("Leer más"). */
export function LeerMas({ children, label = "Leer más" }: { children: ReactNode; label?: string }) {
  return (
    <details className="group mt-5">
      <summary className="cursor-pointer text-sm tracking-tight text-foreground list-none inline-flex items-center gap-2 transition-colors hover:text-gold">
        <span className="group-open:hidden">{label}</span>
        <span className="hidden group-open:inline">Leer menos</span>
        <span className="transition-transform duration-300 group-open:rotate-180">⌄</span>
      </summary>
      <div className="mt-5 animate-float-up">{children}</div>
    </details>
  );
}

export { Reveal };
