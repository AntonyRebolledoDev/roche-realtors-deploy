import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(context: { supabase: { rpc: unknown }; userId: string }) {
  const sb = context.supabase as unknown as {
    from: (t: string) => {
      select: (c: string) => {
        eq: (a: string, b: string) => { eq: (a: string, b: string) => Promise<{ data: unknown[] | null }> };
      };
    };
  };
  const { data } = await sb.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin");
  if (!data || data.length === 0) throw new Error("Solo un administrador puede realizar esta acción.");
}

export const crearUsuario = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        email: z.string().trim().email().max(255),
        nombre: z.string().trim().max(120).optional(),
        rol: z.enum(["admin", "editor"]),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: creado, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(data.email, {
      data: { nombre: data.nombre ?? null },
    });
    if (error || !creado.user) throw new Error(error?.message ?? "No se pudo crear el usuario");
    await supabaseAdmin
      .from("profiles")
      .upsert({ id: creado.user.id, email: data.email, nombre: data.nombre ?? null });
    await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: creado.user.id, role: data.rol }, { onConflict: "user_id,role" });
    return { ok: true };
  });

export const restablecerContrasena = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ email: z.string().trim().email() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email: data.email,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
