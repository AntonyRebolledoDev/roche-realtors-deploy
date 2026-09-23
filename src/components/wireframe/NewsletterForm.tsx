import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.string().trim().email().max(255);

/** Formulario de suscripción: guarda el correo en la base del sitio. */
export function NewsletterForm({
  variant = "pill",
  textoBoton = "Enviar",
  etiqueta = "Correo electrónico",
  origen = "sitio web",
  onDone,
}: {
  variant?: "pill" | "block" | "hero";
  textoBoton?: string;
  etiqueta?: string;
  origen?: string;
  onDone?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(email);
    if (!parsed.success) {
      setEstado("error");
      setMsg("Escriba un correo válido.");
      return;
    }
    setEstado("enviando");
    const { error } = await supabase
      .from("suscriptores")
      .insert({ email: parsed.data.toLowerCase(), origen });
    if (error && !error.message.includes("duplicate")) {
      setEstado("error");
      setMsg("No pudimos registrar su correo. Intente de nuevo.");
      return;
    }
    setEstado("ok");
    setMsg("¡Gracias! Su suscripción ha sido registrada.");
    setEmail("");
    onDone?.();
  };

  if (variant === "hero") {
    return (
      <form onSubmit={enviar}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={etiqueta}
            aria-label={etiqueta}
            className="flex-1 rounded-[4px] border border-border bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-hidden focus:border-gold-soft"
          />
          <button type="submit" disabled={estado === "enviando"} className="btn-solid-gold">
            {estado === "enviando" ? "Enviando…" : textoBoton}
          </button>
        </div>
        {msg && (
          <p className={`mt-3 text-xs ${estado === "ok" ? "text-gold" : "text-red-400"}`}>{msg}</p>
        )}
      </form>
    );
  }

  if (variant === "block") {
    return (
      <form onSubmit={enviar} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          className="w-full border border-border bg-card px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="rounded-full bg-gold px-5 py-2 text-xs font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          {estado === "enviando" ? "Enviando…" : textoBoton}
        </button>
        {msg && (
          <p className={`text-xs ${estado === "ok" ? "text-gold" : "text-red-400"}`}>{msg}</p>
        )}
      </form>
    );
  }

  return (
    <div>
      <form onSubmit={enviar} className="flex rounded-full bg-background/10 p-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          className="flex-1 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-foreground/40 outline-hidden"
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="rounded-full bg-gold px-4 py-2 text-xs font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          {estado === "enviando" ? "…" : textoBoton}
        </button>
      </form>
      {msg && <p className={`mt-2 text-xs ${estado === "ok" ? "text-gold" : "text-red-400"}`}>{msg}</p>}
    </div>
  );
}
