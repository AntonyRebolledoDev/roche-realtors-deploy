import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Rol = "admin" | "editor";

export type Cuenta = {
  session: Session | null;
  rol: Rol | null;
  activo: boolean;
  cargando: boolean;
};

export function useCuenta(): Cuenta {
  const [session, setSession] = useState<Session | null>(null);
  const [rol, setRol] = useState<Rol | null>(null);
  const [activo, setActivo] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let vivo = true;

    const cargar = async (s: Session | null) => {
      if (!vivo) return;
      setSession(s);
      if (!s) {
        setRol(null);
        setActivo(false);
        setCargando(false);
        return;
      }
      const [{ data: roles }, { data: perfil }] = await Promise.all([
        supabase.from("user_roles").select("role").eq("user_id", s.user.id),
        supabase.from("profiles").select("activo").eq("id", s.user.id).maybeSingle(),
      ]);
      if (!vivo) return;
      const lista = (roles ?? []).map((r) => r.role as Rol);
      setRol(lista.includes("admin") ? "admin" : (lista[0] ?? null));
      setActivo(perfil?.activo ?? false);
      setCargando(false);
    };

    supabase.auth.getSession().then(({ data }) => cargar(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setCargando(true);
      cargar(s);
    });
    return () => {
      vivo = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, rol, activo, cargando };
}
