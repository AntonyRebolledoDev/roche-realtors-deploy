import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Btn, TextInput } from "@/components/admin/ui";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Restablecer contraseña — Roche Realtors" },
      { name: "description", content: "Defina una nueva contraseña para su cuenta." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Restablecer contraseña — Roche Realtors" },
      { property: "og:description", content: "Defina una nueva contraseña para su cuenta." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6">
      <h1 className="section-title text-white">Nueva contraseña</h1>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setErr(null);
          const { error } = await supabase.auth.updateUser({ password: pass });
          if (error) return setErr(error.message);
          setMsg("Contraseña actualizada. Redirigiendo…");
          setTimeout(() => router.navigate({ to: "/admin", replace: true }), 1200);
        }}
      >
        <TextInput
          type="password"
          required
          minLength={8}
          placeholder="Nueva contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {err && <p className="text-sm text-red-400">{err}</p>}
        {msg && <p className="text-sm text-gold">{msg}</p>}
        <Btn type="submit" className="w-full">
          Guardar
        </Btn>
      </form>
    </div>
  );
}
