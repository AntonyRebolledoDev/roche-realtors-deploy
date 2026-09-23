import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard, Btn, ImageField, Label, TextArea, TextInput } from "@/components/admin/ui";
import { ARTICULOS, VIDEOS_TERMOMETRO, ESTILO_DE_VIDA } from "@/content/textos";

export const Route = createFileRoute("/admin/recursos")({
  component: AdminRecursos,
});

const TABS = [
  ["articulos", "Artículos"],
  ["videos", "Termómetro (videos)"],
  ["estilo", "Estilo de vida"],
] as const;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Extrae el identificador de YouTube desde cualquier formato de enlace. */
export function youtubeId(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/|live\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : url.trim();
}

function useTabla<T>(tabla: string, orden: string) {
  return useQuery({
    queryKey: ["admin", tabla],
    queryFn: async () => {
      const { data, error } = await supabase.from(tabla as never).select("*").order(orden as never);
      if (error) throw error;
      return (data ?? []) as unknown as T[];
    },
  });
}

type Articulo = {
  id: string;
  slug: string;
  titulo: string;
  categoria: string;
  estado: string;
  archivado: boolean;
  fecha: string;
  orden: number;
  data: { resumen?: string; cuerpo?: string; imagen?: string; fuente?: string; url?: string };
};

type Video = {
  id: string;
  youtube_id: string;
  titulo: string;
  duracion: string | null;
  fecha: string | null;
  orden: number;
  archivado: boolean;
};

type EstiloVida = {
  id: string;
  titulo: string;
  texto: string | null;
  url: string;
  fuente: string | null;
  imagen: string | null;
  orden: number;
  archivado: boolean;
};

function AdminRecursos() {
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("articulos");
  const qc = useQueryClient();
  const refrescar = (t: string) => qc.invalidateQueries({ queryKey: ["admin", t] });

  return (
    <div>
      <h1 className="section-title text-white">Recursos</h1>
      <nav className="mt-4 flex flex-wrap gap-2">
        {TABS.map(([v, l]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              tab === v ? "border-gold/50 text-gold" : "border-white/10 text-white/60"
            }`}
          >
            {l}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        {tab === "articulos" && <Articulos onChange={() => refrescar("articulos")} />}
        {tab === "videos" && <Videos onChange={() => refrescar("videos")} />}
        {tab === "estilo" && <Estilo onChange={() => refrescar("estilo_vida")} />}
      </div>
    </div>
  );
}

function Importar({ onClick, texto }: { onClick: () => void; texto: string }) {
  return (
    <Btn variant="soft" onClick={onClick}>
      {texto}
    </Btn>
  );
}

function Articulos({ onChange }: { onChange: () => void }) {
  const { data } = useTabla<Articulo>("articulos", "fecha");
  const [ed, setEd] = useState<Articulo | null>(null);
  const filas = [...(data ?? [])].reverse();

  const guardar = async () => {
    if (!ed) return;
    const payload = {
      slug: ed.slug || slugify(ed.titulo),
      titulo: ed.titulo,
      categoria: ed.categoria,
      estado: ed.estado,
      archivado: ed.archivado,
      fecha: ed.fecha,
      orden: ed.orden,
      data: ed.data as never,
    };
    if (ed.id) await supabase.from("articulos").update(payload).eq("id", ed.id);
    else await supabase.from("articulos").insert(payload);
    setEd(null);
    onChange();
  };

  if (ed) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end gap-2">
          <Btn variant="ghost" onClick={() => setEd(null)}>Cancelar</Btn>
          <Btn onClick={guardar}>Guardar</Btn>
        </div>
        <AdminCard className="space-y-4">
          <div>
            <Label>Título</Label>
            <TextInput value={ed.titulo} onChange={(e) => setEd({ ...ed, titulo: e.target.value })} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Categoría</Label>
              <select
                value={ed.categoria}
                onChange={(e) => setEd({ ...ed, categoria: e.target.value })}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
              >
                <option value="noticias" className="bg-black">Noticias</option>
                <option value="ley" className="bg-black">Ley y normatividad</option>
              </select>
            </div>
            <div>
              <Label>Fecha</Label>
              <TextInput type="date" value={ed.fecha} onChange={(e) => setEd({ ...ed, fecha: e.target.value })} />
            </div>
            <div>
              <Label>Estado</Label>
              <select
                value={ed.estado}
                onChange={(e) => setEd({ ...ed, estado: e.target.value })}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
              >
                <option value="borrador" className="bg-black">Borrador</option>
                <option value="publicado" className="bg-black">Publicado</option>
              </select>
            </div>
          </div>
          <div>
            <Label>Imagen de portada</Label>
            <ImageField
              carpeta="recursos"
              hint="1200×675 px (16:9)"
              value={ed.data.imagen}
              onChange={(url) => setEd({ ...ed, data: { ...ed.data, imagen: url } })}
            />
          </div>
          <div>
            <Label>Resumen</Label>
            <TextArea
              rows={3}
              value={ed.data.resumen ?? ""}
              onChange={(e) => setEd({ ...ed, data: { ...ed.data, resumen: e.target.value } })}
            />
          </div>
          <div>
            <Label>Contenido</Label>
            <TextArea
              rows={12}
              value={ed.data.cuerpo ?? ""}
              onChange={(e) => setEd({ ...ed, data: { ...ed.data, cuerpo: e.target.value } })}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Fuente (opcional)</Label>
              <TextInput
                value={ed.data.fuente ?? ""}
                onChange={(e) => setEd({ ...ed, data: { ...ed.data, fuente: e.target.value } })}
              />
            </div>
            <div>
              <Label>Enlace externo (opcional)</Label>
              <TextInput
                value={ed.data.url ?? ""}
                onChange={(e) => setEd({ ...ed, data: { ...ed.data, url: e.target.value } })}
              />
            </div>
          </div>
        </AdminCard>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Btn
          onClick={() =>
            setEd({
              id: "",
              slug: "",
              titulo: "",
              categoria: "noticias",
              estado: "borrador",
              archivado: false,
              fecha: new Date().toISOString().slice(0, 10),
              orden: 0,
              data: {},
            })
          }
        >
          Nuevo artículo
        </Btn>
        {filas.length === 0 && (
          <Importar
            texto="Importar artículos actuales del sitio"
            onClick={async () => {
              const rows = (ARTICULOS as unknown as Record<string, unknown>[]).map((a, i) => ({
                slug: String(a.slug ?? slugify(String(a.titulo ?? `articulo-${i}`))),
                titulo: String(a.titulo ?? ""),
                categoria: String(a.categoria ?? "noticias"),
                estado: "publicado",
                orden: i,
                data: a as never,
              }));
              await supabase.from("articulos").upsert(rows, { onConflict: "slug" });
              onChange();
            }}
          />
        )}
      </div>
      <div className="mt-6 space-y-2">
        {filas.map((f) => (
          <AdminCard key={f.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <div className="text-sm text-white">{f.titulo}</div>
              <div className="text-xs text-white/45">
                {f.categoria} · {f.fecha} · {f.estado}
                {f.archivado ? " · archivado" : ""}
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="soft" onClick={() => setEd(f)}>Editar</Btn>
              <Btn
                variant="ghost"
                onClick={async () => {
                  await supabase.from("articulos").update({ archivado: !f.archivado }).eq("id", f.id);
                  onChange();
                }}
              >
                {f.archivado ? "Restaurar" : "Archivar"}
              </Btn>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

function Videos({ onChange }: { onChange: () => void }) {
  const { data } = useTabla<Video>("videos", "orden");
  const [ed, setEd] = useState<(Video & { url?: string }) | null>(null);
  const filas = data ?? [];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Btn
          onClick={() =>
            setEd({
              id: "",
              youtube_id: "",
              titulo: "",
              duracion: "",
              fecha: new Date().toISOString().slice(0, 10),
              orden: filas.length,
              archivado: false,
              url: "",
            })
          }
        >
          Nuevo video
        </Btn>
        {filas.length === 0 && (
          <Importar
            texto="Importar videos actuales"
            onClick={async () => {
              const rows = (VIDEOS_TERMOMETRO as unknown as Record<string, unknown>[]).map((v, i) => ({
                youtube_id: String(v.id ?? ""),
                titulo: String(v.titulo ?? ""),
                duracion: (v.duracion as string) ?? null,
                fecha: (v.fechaISO as string) ?? null,
                orden: i,
              }));
              await supabase.from("videos").insert(rows);
              onChange();
            }}
          />
        )}
      </div>

      {ed && (
        <AdminCard className="mt-6 space-y-4">
          <div>
            <Label>Enlace de YouTube</Label>
            <TextInput
              placeholder="https://www.youtube.com/watch?v=…"
              value={ed.url ?? ed.youtube_id}
              onChange={(e) => setEd({ ...ed, url: e.target.value, youtube_id: youtubeId(e.target.value) })}
            />
            <p className="mt-1 text-[11px] text-white/40">
              La portada se toma automáticamente de YouTube.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Título</Label>
              <TextInput value={ed.titulo} onChange={(e) => setEd({ ...ed, titulo: e.target.value })} />
            </div>
            <div>
              <Label>Duración</Label>
              <TextInput
                placeholder="12:04"
                value={ed.duracion ?? ""}
                onChange={(e) => setEd({ ...ed, duracion: e.target.value })}
              />
            </div>
            <div>
              <Label>Fecha</Label>
              <TextInput
                type="date"
                value={ed.fecha ?? ""}
                onChange={(e) => setEd({ ...ed, fecha: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Btn variant="ghost" onClick={() => setEd(null)}>Cancelar</Btn>
            <Btn
              onClick={async () => {
                const payload = {
                  youtube_id: ed.youtube_id,
                  titulo: ed.titulo,
                  duracion: ed.duracion,
                  fecha: ed.fecha || null,
                  orden: ed.orden,
                  archivado: ed.archivado,
                };
                if (ed.id) await supabase.from("videos").update(payload).eq("id", ed.id);
                else await supabase.from("videos").insert(payload);
                setEd(null);
                onChange();
              }}
            >
              Guardar
            </Btn>
          </div>
        </AdminCard>
      )}

      <div className="mt-6 space-y-2">
        {filas.map((f) => (
          <AdminCard key={f.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="flex items-center gap-3">
              <img
                src={`https://img.youtube.com/vi/${f.youtube_id}/hqdefault.jpg`}
                alt=""
                className="h-12 w-20 rounded object-cover"
              />
              <div>
                <div className="text-sm text-white">{f.titulo}</div>
                <div className="text-xs text-white/45">
                  {f.fecha} {f.duracion ? `· ${f.duracion}` : ""}
                  {f.archivado ? " · archivado" : ""}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="soft" onClick={() => setEd(f)}>Editar</Btn>
              <Btn
                variant="ghost"
                onClick={async () => {
                  await supabase.from("videos").update({ archivado: !f.archivado }).eq("id", f.id);
                  onChange();
                }}
              >
                {f.archivado ? "Restaurar" : "Archivar"}
              </Btn>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

function Estilo({ onChange }: { onChange: () => void }) {
  const { data } = useTabla<EstiloVida>("estilo_vida", "orden");
  const [ed, setEd] = useState<EstiloVida | null>(null);
  const filas = data ?? [];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Btn
          onClick={() =>
            setEd({
              id: "",
              titulo: "",
              texto: "",
              url: "",
              fuente: "",
              imagen: "",
              orden: filas.length,
              archivado: false,
            })
          }
        >
          Nueva tarjeta
        </Btn>
        {filas.length === 0 && (
          <Importar
            texto="Importar tarjetas actuales"
            onClick={async () => {
              const rows = (ESTILO_DE_VIDA as unknown as Record<string, unknown>[]).map((e, i) => ({
                titulo: String(e.titulo ?? ""),
                texto: (e.texto as string) ?? (e.resumen as string) ?? null,
                url: String(e.url ?? ""),
                fuente: (e.fuente as string) ?? null,
                imagen: (e.imagen as string) ?? null,
                orden: i,
              }));
              await supabase.from("estilo_vida").insert(rows);
              onChange();
            }}
          />
        )}
      </div>

      {ed && (
        <AdminCard className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Título</Label>
              <TextInput value={ed.titulo} onChange={(e) => setEd({ ...ed, titulo: e.target.value })} />
            </div>
            <div>
              <Label>Fuente</Label>
              <TextInput
                value={ed.fuente ?? ""}
                onChange={(e) => setEd({ ...ed, fuente: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>Enlace oficial</Label>
            <TextInput value={ed.url} onChange={(e) => setEd({ ...ed, url: e.target.value })} />
          </div>
          <div>
            <Label>Texto introductorio</Label>
            <TextArea rows={3} value={ed.texto ?? ""} onChange={(e) => setEd({ ...ed, texto: e.target.value })} />
          </div>
          <div>
            <Label>Imagen de portada</Label>
            <ImageField
              carpeta="estilo-vida"
              hint="1200×675 px (16:9)"
              value={ed.imagen ?? ""}
              onChange={(url) => setEd({ ...ed, imagen: url })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Btn variant="ghost" onClick={() => setEd(null)}>Cancelar</Btn>
            <Btn
              onClick={async () => {
                const payload = {
                  titulo: ed.titulo,
                  texto: ed.texto,
                  url: ed.url,
                  fuente: ed.fuente,
                  imagen: ed.imagen,
                  orden: ed.orden,
                  archivado: ed.archivado,
                };
                if (ed.id) await supabase.from("estilo_vida").update(payload).eq("id", ed.id);
                else await supabase.from("estilo_vida").insert(payload);
                setEd(null);
                onChange();
              }}
            >
              Guardar
            </Btn>
          </div>
        </AdminCard>
      )}

      <div className="mt-6 space-y-2">
        {filas.map((f) => (
          <AdminCard key={f.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <div className="text-sm text-white">{f.titulo}</div>
              <div className="text-xs text-white/45">
                {f.fuente}
                {f.archivado ? " · archivado" : ""}
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="soft" onClick={() => setEd(f)}>Editar</Btn>
              <Btn
                variant="ghost"
                onClick={async () => {
                  await supabase.from("estilo_vida").update({ archivado: !f.archivado }).eq("id", f.id);
                  onChange();
                }}
              >
                {f.archivado ? "Restaurar" : "Archivar"}
              </Btn>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
