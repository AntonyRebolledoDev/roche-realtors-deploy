import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  ARTICULOS,
  ESTILO_DE_VIDA,
  VIDEOS_TERMOMETRO,
  type Articulo,
  type Bloque,
  type RecursoEstiloVida,
  type VideoTermometro,
} from "@/content/textos";

/**
 * Lectura pública de los catálogos administrables (artículos, videos,
 * tarjetas de estilo de vida, propiedades y desarrollos).
 * Mientras la base de datos no responde, se usan los valores iniciales del
 * sitio para que la página no cambie durante la carga.
 */

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** Convierte 2026-07-27 en "27 jul 2026". */
export function fechaES(iso?: string | null): string {
  if (!iso) return "";
  const [a, m, d] = iso.split("-").map(Number);
  if (!a || !m || !d) return "";
  return `${d} ${MESES[m - 1]} ${a}`;
}

const CATEGORIA_PUBLICA: Record<string, string> = {
  noticias: "Noticias",
  ley: "Ley y normatividad",
};

function textoABloques(texto?: string): Bloque[] {
  if (!texto) return [];
  return texto
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => (p.startsWith("## ") ? { h: p.slice(3).trim() } : { p }));
}

type FilaArticulo = {
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string | null;
  data: Record<string, unknown>;
};

function aArticulo(f: FilaArticulo): Articulo & { fecha?: string } {
  const d = f.data ?? {};
  return {
    slug: f.slug,
    categoria: CATEGORIA_PUBLICA[f.categoria] ?? f.categoria,
    titulo: f.titulo,
    entradilla: String(d['entradilla'] ?? d['resumen'] ?? ""),
    imagen: (d['imagen'] as string) || undefined,
    bloques: (d['bloques'] as Bloque[]) ?? textoABloques(d['cuerpo'] as string),
    referencias: d['referencias'] as string[] | undefined,
    fecha: f.fecha ? fechaES(f.fecha) : "",
  };
}

export function useArticulos(): (Articulo & { fecha?: string })[] {
  const { data } = useQuery({
    queryKey: ["pub", "articulos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articulos")
        .select("slug,titulo,categoria,fecha,data")
        .eq("estado", "publicado")
        .eq("archivado", false)
        .order("orden");
      if (error) throw error;
      return (data ?? []) as unknown as FilaArticulo[];
    },
    staleTime:
      typeof window !== "undefined" && (window as unknown as Record<string, unknown>).__E2E_TEST
        ? 0
        : 30_000,
  });
  if (!data || data.length === 0) return ARTICULOS;
  return data.map(aArticulo);
}

export function useArticulosRecientes(limit = 3): (Articulo & { fecha?: string })[] {
  const { data } = useQuery({
    queryKey: ["pub", "articulos-recientes", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articulos")
        .select("slug,titulo,categoria,fecha,data")
        .eq("estado", "publicado")
        .eq("archivado", false)
        .order("fecha", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as unknown as FilaArticulo[];
    },
    staleTime:
      typeof window !== "undefined" && (window as unknown as Record<string, unknown>).__E2E_TEST
        ? 0
        : 30_000,
  });
  if (!data || data.length === 0) return ARTICULOS.slice(0, limit);
  return data.map(aArticulo);
}

export function useVideos(): VideoTermometro[] {
  const { data } = useQuery({
    queryKey: ["pub", "videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("youtube_id,titulo,duracion,fecha,orden")
        .eq("archivado", false)
        .order("orden");
      if (error) throw error;
      return data ?? [];
    },
    staleTime:
      typeof window !== "undefined" && (window as unknown as Record<string, unknown>).__E2E_TEST
        ? 0
        : 30_000,
  });
  if (!data || data.length === 0) return VIDEOS_TERMOMETRO;
  return data.map((v) => ({
    id: v.youtube_id,
    titulo: v.titulo,
    url: `https://www.youtube.com/watch?v=${v.youtube_id}`,
    duracion: v.duracion ?? "",
    fecha: fechaES(v.fecha),
  }));
}

export function useEstiloVida(): RecursoEstiloVida[] {
  const { data } = useQuery({
    queryKey: ["pub", "estilo_vida"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("estilo_vida")
        .select("id,titulo,texto,url,fuente,imagen,orden")
        .eq("archivado", false)
        .order("orden");
      if (error) throw error;
      return data ?? [];
    },
    staleTime:
      typeof window !== "undefined" && (window as unknown as Record<string, unknown>).__E2E_TEST
        ? 0
        : 30_000,
  });
  if (!data || data.length === 0) return ESTILO_DE_VIDA;
  return data.map((r) => ({
    id: r.id,
    titulo: r.titulo,
    texto: r.texto ?? "",
    url: r.url,
    fuente: r.fuente ?? "",
    imagen: r.imagen ?? "",
  }));
}

export type FilaPropiedad = {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  destacada: boolean;
  data: Record<string, unknown>;
};

export function usePropiedades(categoria?: string): FilaPropiedad[] {
  const { data } = useQuery({
    queryKey: ["pub", "propiedades"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("propiedades")
        .select("id,slug,nombre,categoria,destacada,data")
        .eq("estado", "publicada")
        .eq("archivada", false)
        .order("orden");
      if (error) throw error;
      return (data ?? []) as unknown as FilaPropiedad[];
    },
    staleTime:
      typeof window !== "undefined" && (window as unknown as Record<string, unknown>).__E2E_TEST
        ? 0
        : 30_000,
  });
  const filas = data ?? [];
  return categoria ? filas.filter((p) => p.categoria === categoria) : filas;
}

export function usePropiedad(slug: string): FilaPropiedad | null {
  const { data } = useQuery({
    queryKey: ["pub", "propiedad", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("propiedades")
        .select("id,slug,nombre,categoria,destacada,data")
        .eq("slug", slug)
        .eq("estado", "publicada")
        .eq("archivada", false)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as unknown as FilaPropiedad | null;
    },
    staleTime:
      typeof window !== "undefined" && (window as unknown as Record<string, unknown>).__E2E_TEST
        ? 0
        : 30_000,
  });
  return data ?? null;
}

export type FilaDesarrollo = {
  id: string;
  slug: string;
  nombre: string;
  destacado: boolean;
  data: Record<string, unknown>;
};

export function useDesarrollos(): FilaDesarrollo[] {
  const { data } = useQuery({
    queryKey: ["pub", "desarrollos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("desarrollos")
        .select("id,slug,nombre,destacado,data")
        .eq("estado", "publicado")
        .eq("archivado", false)
        .order("orden");
      if (error) throw error;
      return (data ?? []) as unknown as FilaDesarrollo[];
    },
    staleTime:
      typeof window !== "undefined" && (window as unknown as Record<string, unknown>).__E2E_TEST
        ? 0
        : 30_000,
  });
  return data ?? [];
}
