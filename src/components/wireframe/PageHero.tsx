import { Link } from "@tanstack/react-router";

type CTA = { label: string; to: string };

export function PageHero({
  image,
  imageMobile,
  alt,
  eyebrow,
  title,
  subtitle,
  ctas = [],
}: {
  image: string;
  imageMobile?: string;
  alt: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctas?: CTA[];
}) {
  return (
    <section className="relative w-full overflow-hidden min-h-[100svh] flex items-end">
      <img
        src={image}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${imageMobile ? "hidden md:block" : ""}`}
      />
      {imageMobile && (
        <img
          src={imageMobile}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/55 to-ink/30" />
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-ink/40" />

      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl animate-float-up">
          <h1 className="hero-title">{title}</h1>
          <div className="mt-7 h-px w-24 bg-gold-soft" />
          {eyebrow && (
            <p className="mt-6 text-[11px] md:text-xs uppercase tracking-[0.28em] text-gold-soft">
              {eyebrow}
            </p>
          )}
          {subtitle && (
            <p className="mt-5 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
          {ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-4">
              {ctas.map((c) => (
                <Link key={c.to + c.label} to={c.to}>
                  <span className="btn-ghost-gold">
                    {c.label} <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
