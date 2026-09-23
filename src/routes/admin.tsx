import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCuenta } from "@/lib/admin/session";
import { Btn, TextInput } from "@/components/admin/ui";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Panel de administración — Roche Realtors" },
      { name: "description", content: "Acceso al panel de contenido de Roche Realtors." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Panel de administración — Roche Realtors" },
      { property: "og:description", content: "Acceso al panel de contenido de Roche Realtors." },
    ],
  }),
  component: AdminLayout,
});

type Item = { to: string; params?: Record<string, string>; label: string; exact?: boolean };

const CUENTA_INICIAL = "ventas@chichenrealty.com";

const MENU: Item[] = [
  { to: "/admin", label: "Resumen", exact: true },
  { to: "/admin/contenido/$modulo", params: { modulo: "inicio" }, label: "Inicio" },
  { to: "/admin/propiedades", label: "Propiedades" },
  { to: "/admin/contenido/$modulo", params: { modulo: "propiedades" }, label: "Página de Propiedades" },
  { to: "/admin/desarrollos", label: "Desarrollos" },
  { to: "/admin/contenido/$modulo", params: { modulo: "desarrollos" }, label: "Página de Desarrollos" },
  { to: "/admin/contenido/$modulo", params: { modulo: "yucatan" }, label: "Por qué Yucatán" },
  { to: "/admin/contenido/$modulo", params: { modulo: "mercado" }, label: "Inteligencia de mercado" },
  { to: "/admin/recursos", label: "Recursos" },
  { to: "/admin/contenido/$modulo", params: { modulo: "recursos" }, label: "Página de Recursos" },
  { to: "/admin/newsletter", label: "Suscriptores" },
  { to: "/admin/contenido/$modulo", params: { modulo: "empresa" }, label: "Contenido general" },
  { to: "/admin/usuarios", label: "Usuarios y accesos" },
];

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6">
      <h1 className="section-title text-white">Panel de administración</h1>
      <p className="mt-2 mb-8 text-sm text-white/50">Ingrese con su correo y contraseña.</p>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError(null);
          const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
          if (error) setError("Correo o contraseña incorrectos.");
          setBusy(false);
        }}
      >
        <TextInput
          type="email"
          required
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          required
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        {aviso && <p className="text-sm text-gold">{aviso}</p>}
        <Btn type="submit" disabled={busy} className="w-full">
          {busy ? "Entrando…" : "Entrar"}
        </Btn>
      </form>
      <button
        className="mt-6 text-xs text-white/40 hover:text-gold"
        onClick={async () => {
          setError(null);
          setAviso(null);
          if (email.trim().toLowerCase() !== CUENTA_INICIAL) {
            setError("Solo la cuenta principal puede activarse aquí.");
            return;
          }
          if (pass.length < 8) {
            setError("Use una contraseña de al menos 8 caracteres.");
            return;
          }
          const { error } = await supabase.auth.signUp({
            email: email.trim(),
            password: pass,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
          if (error) setError(error.message);
          else setAviso("Le enviamos un correo de confirmación. Ábralo para activar su acceso.");
        }}
      >
        Activar la cuenta principal por primera vez
      </button>
      <button
        className="mt-3 text-xs text-white/40 hover:text-gold"
        onClick={async () => {
          if (!email) return setError("Escriba su correo para recuperar la contraseña.");
          await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          });
          setAviso("Le enviamos un correo para restablecer su contraseña.");
        }}
      >
        ¿Olvidó su contraseña?
      </button>
    </div>
  );
}

function AdminLayout() {
  const { session, rol, activo, cargando } = useCuenta();
  const router = useRouter();

  if (cargando) {
    return <div className="p-12 text-sm text-white/50">Cargando…</div>;
  }
  if (!session) return <Login />;
  if (!rol || !activo) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="text-sm text-white/70">
          Su cuenta no tiene acceso al panel o está desactivada. Contacte a un administrador.
        </p>
        <Btn variant="soft" className="mt-6" onClick={() => supabase.auth.signOut()}>
          Salir
        </Btn>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:px-8 lg:flex-row">
      <aside className="lg:w-60 lg:shrink-0">
        <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">Panel</div>
        <nav className="flex flex-wrap gap-1 lg:flex-col">
          {MENU.map((m) => (
            <Link
              key={m.label}
              to={m.to as never}
              params={m.params as never}
              activeOptions={{ exact: m.exact ?? false }}
              className="rounded-md px-3 py-2 text-sm text-white/60 transition-colors hover:text-gold"
              activeProps={{ className: "bg-white/5 text-gold" }}
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-white/10 pt-4 text-xs text-white/40">
          <div className="mb-3 break-all">{session.user.email}</div>
          <Btn
            variant="ghost"
            className="px-0"
            onClick={async () => {
              await supabase.auth.signOut();
              router.navigate({ to: "/admin", replace: true });
            }}
          >
            Cerrar sesión
          </Btn>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
