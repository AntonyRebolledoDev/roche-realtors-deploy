import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Breadcrumb,
  BtnPH,
  ImagePH,
  SectionBand,
  SectionHeader,
} from "@/components/wireframe/primitives";
import { AgendaCita } from "@/components/wireframe/AgendaCita";
import { SocialList } from "@/components/wireframe/SocialIcons";
import { useSiteContent } from "@/lib/site-content";

const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contacto`;

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Roche Realtors" },
      { name: "description", content: "WhatsApp, videollamada y mail. Formulario, FAQ y agendamiento en una sola página." },
      { property: "og:title", content: "Contacto — Roche Realtors" },
      { property: "og:description", content: "Escríbanos por WhatsApp, agende una videollamada o envíenos un correo." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const c = useSiteContent("contacto");
  const f = c.formulario;

  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErrorEnvio(null);
    try {
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(EDGE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": anonKey,
          "Authorization": `Bearer ${anonKey}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setExito(true);
      setForm({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
    } catch {
      setErrorEnvio("No se pudo enviar el mensaje. Intente de nuevo o escríbanos directamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-6">
        <Breadcrumb items={["Inicio", "Contacto"]} />
        <h1 className="mt-3 page-title font-semibold">{c.portada.titulo}</h1>
        <p className="mt-3 text-sm text-foreground max-w-2xl">{c.portada.texto}</p>
      </div>

      {/* 3 vías */}
      <SectionBand>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.vias.map((v, i) => {
            const href =
              i === 0 ? c.redes.whatsapp :
              i === 1 ? "https://cal.com/rocherealtorsyucatan" :
              `mailto:${c.datos.email}`;
            return (
              <div key={v.title} className="border border-border bg-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <img src={v.icon} alt="" aria-hidden className="h-14 w-14 object-contain" />
                </div>
                <div className="text-lg font-semibold mb-2">{v.title}</div>
                <p className="text-xs text-muted-foreground mb-5">{v.desc}</p>
                <a
                  href={href}
                  target={i < 2 ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C6A35A] px-6 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
                >
                  {v.btn} →
                </a>
              </div>
            );
          })}
        </div>
      </SectionBand>

      {/* Formulario + datos */}
      <SectionBand bg="gray">
        <div className="grid md:grid-cols-2 gap-10">
          <form className="border border-border bg-card p-6 space-y-4" onSubmit={enviar}>
            <div className="text-sm font-semibold">{f.titulo}</div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Nombre completo *</label>
              <input required className="w-full border border-border bg-background px-3 py-2 text-sm" placeholder="Nombre completo"
                value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Email *</label>
              <input required type="email" className="w-full border border-border bg-background px-3 py-2 text-sm" placeholder="Email"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Teléfono *</label>
              <input required className="w-full border border-border bg-background px-3 py-2 text-sm" placeholder="Teléfono"
                value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                {f.etiquetaAsunto}
              </label>
              <select required className="w-full border border-border px-3 py-2 text-sm bg-card"
                value={form.asunto} onChange={(e) => setForm({ ...form, asunto: e.target.value })}>
                <option value="">Selecciona una opción</option>
                {f.opciones.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                {f.etiquetaMensaje}
              </label>
              <textarea required rows={5} className="w-full border border-border bg-background px-3 py-2 text-sm"
                placeholder={f.placeholderMensaje}
                value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} />
            </div>

            {exito && (
              <p className="text-sm text-green-400">✓ Mensaje enviado. Le responderemos a la brevedad.</p>
            )}
            {errorEnvio && (
              <p className="text-sm text-red-400">{errorEnvio}</p>
            )}

            <button
              type="submit"
              disabled={enviando || exito}
              className="inline-flex items-center gap-2 rounded-full bg-[#C6A35A] px-7 py-3 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
            >
              {enviando ? "Enviando…" : exito ? "Enviado ✓" : `${f.textoBoton} →`}
            </button>
            <div className="text-[10px] text-muted-foreground pt-1">{f.nota}</div>
          </form>

          <div className="space-y-4">
            <div className="border border-border bg-card p-6 space-y-3">
              <div className="text-sm font-semibold">{c.datosTitulo}</div>
              <div className="text-xs text-foreground space-y-2">
                <div>📍 {c.datos.direccion}</div>
                <div>📞 {c.datos.telefono}</div>
                <div>✉ {c.datos.email}</div>
                <div>🕐 {c.datos.horario}</div>
              </div>
            </div>
            <div className="border border-border bg-card p-6">
              <div className="text-sm font-semibold mb-3">{c.redesTitulo}</div>
              <SocialList />
            </div>
          </div>
        </div>
      </SectionBand>

      {/* Agendamiento central */}
      <AgendaCita />

      {/* Mapa */}
      <SectionBand>
        <ImagePH label="MAPA / UBICACIÓN" height={380} />
      </SectionBand>

      {/* FAQ antes del footer */}
      <SectionBand bg="gray">
        <SectionHeader title={c.faq.titulo} intro={c.faq.intro} center />
        <div className="max-w-3xl mx-auto border border-border bg-card divide-y divide-border">
          {c.faq.items.map((q, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 text-sm font-semibold">
                <span>{q.q}</span>
                <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm leading-7 text-foreground">{q.a}</div>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/empresa" hash="faq">
            <BtnPH label={c.faq.textoBoton} variant="outline" />
          </Link>
        </div>
      </SectionBand>
    </>
  );
}
