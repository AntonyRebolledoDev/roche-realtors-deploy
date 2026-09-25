import type { FilaPropiedad } from "@/lib/catalogos";
import type { Propiedad } from "@/content/fichas";

function sanitizeImg(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.includes("/__l5e/assets-v1/")) return undefined;
  if (url.startsWith("/src/assets/")) return undefined;
  return url;
}

export type FichaPropiedadCard = {
  slug: string;
  nombre: string;
  tipo: string;
  operacion: string;
  imagen?: string;
  zona: string;
  detalle: string;
  precio: string;
};

/** Convierte una fila de la base de datos en los datos de la tarjeta pública. */
export function fichaDeFila(f: FilaPropiedad): FichaPropiedadCard {
  const d = (f.data ?? {}) as Partial<Propiedad>;
  const par = (lista?: [string, string][], clave?: string) =>
    lista?.find(([k]) => k.toLowerCase() === clave)?.[1];

  const detalle = [
    par(d.distribucion, "recámaras") && `${par(d.distribucion, "recámaras")} rec`,
    par(d.distribucion, "baños") && `${par(d.distribucion, "baños")} baños`,
    par(d.medidas, "construcción") ?? par(d.medidas, "terreno") ?? par(d.medidas, "dimensión"),
  ]
    .filter(Boolean)
    .join(" · ");

  return {
    slug: f.slug,
    nombre: d.nombre || f.nombre,
    tipo: d.tipoPropiedad || d.categoria || "",
    operacion: d.tipoOferta || "Venta",
    imagen: sanitizeImg(d.galeria?.find((g) => g.src)?.src),
    zona: d.desarrollo || d.zonaAbierta || "",
    detalle,
    precio: d.precio || "",
  };
}