import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BtnPH,
  ImagePH,
  PropertyCard,
  ResourceCard,
  SectionBand,
  SectionHeader,
  Prose,
  Reveal,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { NewsletterModal } from "@/components/wireframe/NewsletterModal";
import { NewsletterForm } from "@/components/wireframe/NewsletterForm";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inicio — Roche Realtors" },
      { name: "description", content: "Inmobiliaria boutique en Yucatán. Asesoría e inteligencia de mercado." },
      { property: "og:title", content: "Inicio — Roche Realtors" },
      { property: "og:description", content: "Inmobiliaria boutique en Yucatán. Asesoría e inteligencia de mercado." },
    ],
  }),
  component: Home,
});

function Home() {
  const c = useSiteContent("inicio");
  const heroImages = c.hero.imagenes;
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroImages.length), 6000);
    return () => clearInterval(t);
  }, [heroImages.length]);

  return (
    <>
      <NewsletterModal />

      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden min-h-[88vh] flex items-center">
        {heroImages.map((img, i) => (
          <picture key={img.desktop}>
            <source media="(max-width: 767px)" srcSet={img.mobile} />
            <img
              src={img.desktop}
              alt="Roche Realtors"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1600ms] ease-out ${
                i === slide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </picture>
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/55 to-ink/30" />
        <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-ink/40" />

        <div className="relative mx-auto max-w-7xl w-full px-5 md:px-8 py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl animate-float-up">
              <h1 className="hero-title">{c.hero.titulo}</h1>
              <div className="mt-7 h-px w-24 bg-gold-soft" />
              <p className="mt-6 text-[11px] md:text-xs uppercase tracking-[0.28em] text-gold-soft">
                {c.hero.lema.split("·").map((parte, i, arr) => (
                  <span key={parte}>
                    {parte.trim()}
                    {i < arr.length - 1 && <span className="text-gold"> · </span>}
                  </span>
                ))}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/propiedades">
                  <span className="btn-ghost-gold">
                    {c.hero.botonPropiedades} <span aria-hidden>→</span>
                  </span>
                </Link>
                <Link to="/contacto">
                  <span className="btn-ghost-gold">
                    {c.hero.botonCita} <span aria-hidden>→</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Bloque newsletter */}
            <div className="w-full lg:w-[26rem] rounded-[6px] border border-gold-soft/40 bg-ink/75 backdrop-blur-xl px-8 py-6">
              <div className="text-[10px] uppercase tracking-[0.28em] text-foreground">
                {c.hero.newsletterTitulo}
              </div>
              <div className="mt-4">
                <NewsletterForm
                  variant="hero"
                  etiqueta={c.hero.newsletterEtiqueta}
                  textoBoton={c.hero.newsletterBoton}
                  origen="hero"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((img, i) => (
            <button
              key={img.desktop}
              aria-label={`Ir a imagen ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === slide ? "w-8 bg-gold" : "w-1.5 bg-foreground/40 hover:bg-foreground/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. LOGOS */}
      <SectionBand bg="gray" className="!py-14">
        <Reveal>
          <div className="text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-8">
            {c.aliados.titulo}
          </div>
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
            {c.aliados.logos.map((l) => (
              <img
                key={l.alt}
                src={l.src}
                alt={l.alt}
                className="h-10 md:h-14 w-auto object-contain opacity-80 transition-all duration-500 hover:opacity-100"
                loading="lazy"
              />
            ))}
          </div>
        </Reveal>
      </SectionBand>

      {/* 3. BIENVENIDA */}
      <SectionBand>
        <div className="grid md:grid-cols-2 gap-14 items-stretch">
          <Reveal className="media-zoom rounded-3xl h-full min-h-[260px] md:min-h-0">
            <img
              src={c.bienvenida.imagen}
              alt={c.bienvenida.imagenAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Reveal>

          <div>
            <SectionHeader eyebrow={c.bienvenida.eyebrow} title={c.bienvenida.titulo} />
            <Reveal delay={120}>
              <Prose resumen={c.bienvenida.resumen} parrafos={c.bienvenida.parrafos} />
              <div className="mt-8">
                <BtnPH label={c.bienvenida.textoBoton} variant="outline" />
              </div>
            </Reveal>
          </div>
        </div>
      </SectionBand>

      {/* 4. PROPIEDADES DESTACADAS */}
      <SectionBand bg="gray">
        <SectionHeader title={c.destacadas.titulo} intro={c.destacadas.intro} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Reveal key={i} delay={i * 90}>
              <PropertyCard />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/propiedades"><BtnPH label={c.destacadas.textoBoton} /></Link>
        </div>
      </SectionBand>

      {/* 5. DESARROLLOS DESTACADOS */}
      <SectionBand>
        <SectionHeader
          title={c.desarrollosDestacados.titulo}
          intro={c.desarrollosDestacados.intro}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Reveal key={i} delay={(i % 2) * 90}>
              <Link
                to="/desarrollos/$id"
                params={{ id: String(i + 1) }}
                className="group block rounded-3xl border border-border bg-card overflow-hidden hover-lift transition-colors hover:border-gold-soft/50"
              >
                <div className="relative media-zoom">
                  <ImagePH label="IMAGEN DESARROLLO" aspect="16 / 9" />
                  <span className="absolute top-4 left-4 rounded-full bg-background/80 backdrop-blur-md text-[11px] px-3 py-1">
                    Preventa
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-lg font-semibold tracking-tight">Nombre del desarrollo</div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-soft">
                    {["Residencial", "Comercial", "Logístico/Industrial"][i % 3]}
                  </div>
                  <div className="text-sm text-muted-foreground">Zona / Municipio</div>
                  <div className="text-sm text-muted-foreground">
                    Lotes residenciales · Casas · Departamentos
                  </div>
                  <div className="flex gap-2 text-[11px] text-muted-foreground flex-wrap pt-1">
                    <span>Desde $000,000 · Alberca · Seguridad</span>
                  </div>
                  <div className="pt-3"><BtnPH label="Ver desarrollo" variant="outline" size="sm" /></div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/desarrollos"><BtnPH label={c.desarrollosDestacados.textoBoton} /></Link>
        </div>
      </SectionBand>

      {/* 6. POR QUÉ YUCATÁN (invertido) */}
      <SectionBand bg="gray">
        <div className="grid md:grid-cols-2 gap-14 items-stretch">
          <div className="md:order-1 order-2">
            <SectionHeader eyebrow={c.yucatanTeaser.eyebrow} title={c.yucatanTeaser.titulo} />
            <Reveal delay={120}>
              <Prose resumen={c.yucatanTeaser.resumen} parrafos={c.yucatanTeaser.parrafos} />
              <div className="mt-8">
                <Link to="/por-que-yucatan">
                  <BtnPH label={c.yucatanTeaser.textoBoton} variant="outline" />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="md:order-2 order-1 media-zoom rounded-3xl h-full min-h-[260px] md:min-h-0">
            <img
              src={c.yucatanTeaser.imagen}
              alt={c.yucatanTeaser.imagenAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>
      </SectionBand>

      {/* 7. SERVICIOS */}
      <SectionBand>
        <SectionHeader title={c.serviciosTitulo} center />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.servicios.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 hover-lift">
                <div className="mb-5 w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                  <img src={s.icon} alt="" aria-hidden className="w-8 h-8 object-contain" loading="lazy" />
                </div>
                <div className="text-lg font-semibold mb-3 tracking-tight">{s.title}</div>
                <p className="text-sm leading-7 text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionBand>

      {/* 8. RECURSOS */}
      <SectionBand bg="gray">
        <SectionHeader title={c.recursos.titulo} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Reveal key={i} delay={i * 90}>
              <ResourceCard />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/recursos"><BtnPH label={c.recursos.textoBoton} /></Link>
        </div>
      </SectionBand>

      {/* 9. AGENDA UNA CITA */}
      <AgendaCita />
    </>
  );
}
