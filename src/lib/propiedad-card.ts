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
  detalle: string[];
  precio: string;
};

/** Convierte una fila de la base de datos en los datos de la tarjeta pública. */
export function fichaDeFila(f: FilaPropiedad): FichaPropiedadCard {
  const d = (f.data ?? {}) as Partial<Propiedad>;
  const par = (lista?: [string, string][], clave?: string) =>
    lista?.find((t) => t?.[0]?.toLowerCase() === clave)?.[1];

  // Campos con etiqueta propia (Terreno, Construcción…) en vez del string
  // abreviado anterior ("3 rec · 200 m²"); cada uno se omite si la ficha no
  // lo tiene capturado, así que la tarjeta se adapta sola por categoría sin
  // lógica especial (terrenos no tienen recámaras, departamentos no tienen
  // "Terreno", etc.).
  const terreno = par(d.medidas, "terreno") ?? par(d.medidas, "dimensión");
  const construccion = par(d.medidas, "construcción") ?? par(d.medidas, "construcción interior");
  const frente = par(d.medidas, "frente");
  const fondo = par(d.medidas, "fondo");
  const recamaras = par(d.distribucion, "recámaras");
  const banos = par(d.distribucion, "baños");
  const medioBano = par(d.distribucion, "medio baño");

  const detalle = [
    terreno && `Terreno: ${terreno}`,
    construccion && `Construcción: ${construccion}`,
    frente && `Frente: ${frente}`,
    fondo && `Fondo: ${fondo}`,
    recamaras && `${recamaras} recámaras`,
    banos && `${banos} baños`,
    medioBano && `${medioBano} medio baño`,
  ].filter((v): v is string => Boolean(v));

  // Terrenos residenciales y macrolotes permiten elegir, por ficha, si la
  // tarjeta pública muestra el precio total o el precio por m².
  const esTerreno = d.categoria === "Terreno residencial" || d.categoria === "Terreno macrolote";
  const precio =
    esTerreno && d.precioMostrar === "precioM2" && d.precioM2
      ? `${d.precioM2} POR M²`
      : d.precio || "";

  return {
    slug: f.slug,
    nombre: d.nombre || f.nombre,
    tipo: d.tipoPropiedad || d.categoria || "",
    operacion: d.tipoOferta || "Venta",
    imagen: sanitizeImg((d as Record<string, unknown>).imagenPortada as string) ?? sanitizeImg(d.galeria?.find((g) => g?.src)?.src),
    zona: d.desarrollo || d.zonaAbierta || "",
    detalle,
    precio,
  };
}