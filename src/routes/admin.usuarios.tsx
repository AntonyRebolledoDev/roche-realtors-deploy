import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard, Btn, Label, TextInput } from "@/components/admin/ui";
import { useCuenta } from "@/lib/admin/session";
import { crearUsuario, restablecerContrasena } from "@/lib/admin/usuarios.functions";

export const Route = createFileRoute("/admin/usuarios")({
  component: Usuarios,
});

type Perfil = { id: string; email: string; nombre: string | null; activo: boolean };

function Usuarios() {
  const qc = useQueryClient();
  const { rol, session } = useCuenta();
  const crear = useServerFn(crearUsuario);
  const reset = useServerFn(restablecerContrasena);
  const [nuevo, setNuevo] = useState({ email: "", nombre: "", rol: "editor" as "admin" | "editor" });
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [pass, setPass] = useState({ actual: "", nueva: "" });

  const { data } = useQuery({
    queryKey: ["admin", "usuarios"],
    queryFn: async () => {
      const [{ data: perfiles }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at"),
        supabase.from("user_roles").select("user_id, role"),
      ]);
      return ((perfiles ?? []) as unknown as Perfil[]).map((p) => ({
        ...p,
        rol: (roles ?? []).find((r) => r.user_id === p.id)?.role ?? null,
      }));
    },
  });

  const refrescar = () => qc.invalidateQueries({ queryKey: ["admin", "usuarios"] });
  const esAdmin = rol === "admin";

  return (
    <div>
      <h1 className="section-title text-white">Usuarios y accesos</h1>

      <AdminCard className="mt-6 max-w-lg space-y-4">
        <div className="text-sm text-white">Cambiar mi contraseña</div>
        <div>
          <Label>Contraseña actual</Label>
          <TextInput
            type="password"
            value={pass.actual}
            onChange={(e) => setPass({ ...pass, actual: e.target.value })}
          />
        </div>
        <div>
          <Label>Nueva contraseña</Label>
          <TextInput
            type="password"
            value={pass.nueva}
            onChange={(e) => setPass({ ...pass, nueva: e.target.value })}
          />
        </div>
        <Btn
          onClick={async () => {
            setMsg(null);
            setErr(null);
            const { error } = await supabase.auth.updateUser({
              password: pass.nueva,
              // Lovable Cloud exige la contraseña actual al cambiarla en sesión
              current_password: pass.actual,
            });
            if (error) setErr(error.message);
            else {
              setMsg("Contraseña actualizada.");
              setPass({ actual: "", nueva: "" });
            }
          }}
        >
          Actualizar contraseña
        </Btn>
      </AdminCard>

      {esAdmin && (
        <AdminCard className="mt-6 max-w-lg space-y-4">
          <div className="text-sm text-white">Invitar a un usuario</div>
          <div>
            <Label>Correo</Label>
            <TextInput value={nuevo.email} onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })} />
          </div>
          <div>
            <Label>Nombre</Label>
            <TextInput value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
          </div>
          <div>
            <Label>Rol</Label>
            <select
              value={nuevo.rol}
              onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value as "admin" | "editor" })}
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            >
              <option value="editor" className="bg-black">Editor</option>
              <option value="admin" className="bg-black">Administrador</option>
            </select>
          </div>
          <Btn
            onClick={async () => {
              setMsg(null);
              setErr(null);
              try {
                await crear({ data: nuevo });
                setMsg("Invitación enviada.");
                setNuevo({ email: "", nombre: "", rol: "editor" });
                refrescar();
              } catch (e) {
                setErr(e instanceof Error ? e.message : "No se pudo invitar al usuario");
              }
            }}
          >
            Enviar invitación
          </Btn>
        </AdminCard>
      )}

      {msg && <p className="mt-4 text-sm text-gold">{msg}</p>}
      {err && <p className="mt-4 text-sm text-red-400">{err}</p>}

      <div className="mt-8 space-y-2">
        {(data ?? []).map((u) => (
          <AdminCard key={u.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <div className="text-sm text-white">{u.nombre || u.email}</div>
              <div className="text-xs text-white/45">
                {u.email} · {u.rol === "admin" ? "Administrador" : u.rol === "editor" ? "Editor" : "Sin rol"}
                {u.activo ? "" : " · desactivado"}
              </div>
            </div>
            {esAdmin && u.id !== session?.user.id && (
              <div className="flex flex-wrap gap-2">
                <Btn
                  variant="soft"
                  onClick={async () => {
                    await supabase.from("profiles").update({ activo: !u.activo }).eq("id", u.id);
                    refrescar();
                  }}
                >
                  {u.activo ? "Desactivar" : "Activar"}
                </Btn>
                <Btn
                  variant="ghost"
                  onClick={async () => {
                    setMsg(null);
                    setErr(null);
                    try {
                      await reset({ data: { email: u.email } });
                      setMsg("Enviamos el correo para restablecer la contraseña.");
                    } catch (e) {
                      setErr(e instanceof Error ? e.message : "No se pudo enviar");
                    }
                  }}
                >
                  Restablecer contraseña
                </Btn>
              </div>
            )}
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
