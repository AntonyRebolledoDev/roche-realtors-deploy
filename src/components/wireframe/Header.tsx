import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-navbar.png";

const NAV = [
  { to: "/propiedades", label: "Propiedades" },
  { to: "/desarrollos", label: "Desarrollos" },
  { to: "/por-que-yucatan", label: "Por qué Yucatán" },
  { to: "/inteligencia-de-mercado", label: "Inteligencia de Mercado" },
  { to: "/recursos", label: "Recursos" },
  { to: "/empresa", label: "Empresa" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-ink border-b border-gold-soft/30 shadow-[0_10px_30px_-20px_oklch(0_0_0/0.9)]"
          : "bg-ink border-b border-gold-soft/15"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Roche Realtors Yucatán"
            className={`w-auto object-contain transition-all duration-500 ${
              scrolled ? "h-9" : "h-12"
            }`}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative text-[13px] tracking-tight text-muted-foreground transition-colors duration-300 hover:text-foreground data-[status=active]:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 data-[status=active]:after:origin-left data-[status=active]:after:scale-x-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          className="lg:hidden w-11 h-11 rounded-full bg-secondary flex flex-col items-center justify-center gap-1.5"
          aria-label="Menú"
          onClick={() => setOpen((s) => !s)}
        >
          <span
            className={`w-4 h-px bg-foreground transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`w-4 h-px bg-foreground transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <nav
        className={`lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-5 py-2">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                onClick={() => setOpen(false)}
                className="block py-3.5 text-base tracking-tight text-foreground"
                activeProps={{
                  className:
                    "block py-3.5 text-base tracking-tight text-gold border-l-2 border-gold pl-3",
                }}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
