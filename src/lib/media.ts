import { supabase } from "@/integrations/supabase/client";

export const TIPOS_IMAGEN = ["image/jpeg", "image/png", "image/webp"];

/** Sube una imagen al almacenamiento y devuelve una URL pública permanente. */
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
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
