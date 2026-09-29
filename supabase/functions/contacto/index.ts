import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM = "contacto@rocherealtors.com";
const TO = "ventas@rocherealtors.com.mx";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const { nombre, email, telefono, asunto, mensaje } = await req.json();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Contacto web: ${asunto}`,
        html: `
          <h2 style="font-family:sans-serif;color:#1a1a1a">Nuevo mensaje desde rocherealtors.com</h2>
          <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;color:#555;width:120px"><strong>Nombre</strong></td><td style="padding:8px">${nombre}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;color:#555"><strong>Email</strong></td><td style="padding:8px">${email}</td></tr>
            <tr><td style="padding:8px;color:#555"><strong>Teléfono</strong></td><td style="padding:8px">${telefono}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;color:#555"><strong>Asunto</strong></td><td style="padding:8px">${asunto}</td></tr>
            <tr><td style="padding:8px;color:#555;vertical-align:top"><strong>Mensaje</strong></td><td style="padding:8px;white-space:pre-line">${mensaje}</td></tr>
          </table>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
