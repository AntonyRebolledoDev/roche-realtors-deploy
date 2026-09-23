import { supabase } from "@/integrations/supabase/client";

export const TIPOS_IMAGEN = ["image/jpeg", "image/png", "image/webp"];

const DIEZ_ANIOS = 60 * 60 * 24 * 365 * 10;

/** Sube una imagen al almacenamiento y devuelve una URL estable. */
export async function subirImagen(file: File, carpeta = "general"): Promise<string> {
  if (!TIPOS_IMAGEN.includes(file.type)) {
    throw new Error("Formato no válido. Use JPG, PNG o WebP.");
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${carpeta}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from("media")
    .createSignedUrl(path, DIEZ_ANIOS);
  if (signErr || !data) throw signErr ?? new Error("No se pudo generar el enlace");
  return data.signedUrl;
}
