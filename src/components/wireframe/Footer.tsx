import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/site-content";
import { SocialIcons } from "./SocialIcons";
import { NewsletterForm } from "./NewsletterForm";
import logo from "@/assets/logo-footer.png";

const NAV = [
  { to: "/propiedades", label: "Propiedades" },
  { to: "/desarrollos", label: "Desarrollos" },
  { to: "/por-que-yucatan", label: "Por qué Yucatán" },
  { to: "/inteligencia-de-mercado", label: "Inteligencia de Mercado" },
  { to: "/recursos", label: "Recursos" },
  { to: "/empresa", label: "Empresa" },
  { to: "/contacto", label: "Contacto" },
] as const;

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.28em] text-gold mb-5">{children}</div>
  );
}

export function Footer() {
  const g = useSiteContent("global").footer;
  const contacto = useSiteContent("contacto").datos;
  const legales = useSiteContent("legales").paginas;

  return (
    <footer className="w-full bg-ink text-foreground">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-1">
          <img
            src={logo}
            alt="Roche Realtors Yucatán"
            className="h-20 w-auto object-contain mb-5"
          />
          <p className="text-sm leading-6 text-foreground/60">{g.descripcion}</p>
        </div>

        <div>
          <ColTitle>{g.tituloNavegacion}</ColTitle>
          <ul className="space-y-3 text-sm text-foreground/70">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition-colors duration-300 hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColTitle>{g.tituloAtencion}</ColTitle>
          <ul className="space-y-3 text-sm text-foreground/70 leading-6">
            <li>{contacto.direccion}</li>
            <li>{contacto.telefono}</li>
            <li>{contacto.email}</li>
            <li>{contacto.horario}</li>
          </ul>
        </div>

        <div>
          <ColTitle>{g.tituloLegal}</ColTitle>
          <ul className="space-y-3 text-sm text-foreground/70">
            {legales.map((l) => (
              <li key={l.slug}>
                <Link
                  to="/legal/$slug"
                  params={{ slug: l.slug }}
                  className="transition-colors duration-300 hover:text-gold"
                >
                  {l.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColTitle>{g.tituloNewsletter}</ColTitle>
          <p className="text-sm text-foreground/60 mb-4 leading-6">{g.textoNewsletter}</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/50">
          <span>{g.copyright}</span>
          <div className="flex items-center gap-4 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_a:hover_svg]:scale-110">
            <SocialIcons size={28} />
          </div>
        </div>
      </div>
    </footer>
  );
}
