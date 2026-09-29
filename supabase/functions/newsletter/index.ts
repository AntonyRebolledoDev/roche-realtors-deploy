import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILCHIMP_API_KEY = Deno.env.get("MAILCHIMP_API_KEY")!;
const MAILCHIMP_LIST_ID = "97b633f233";
const MAILCHIMP_DC = "us8";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const { email, origen = "sitio web" } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const auth = btoa(`anystring:${MAILCHIMP_API_KEY}`);
    const res = await fetch(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          email_address: email.toLowerCase().trim(),
          status: "subscribed",
          tags: [origen],
        }),
      }
    );

    const data = await res.json();

    // 400 con title "Member Exists" = ya estaba suscrito, lo tratamos como éxito
    if (!res.ok && data?.title !== "Member Exists") {
      return new Response(JSON.stringify({ error: data?.detail ?? "Error Mailchimp" }), {
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
