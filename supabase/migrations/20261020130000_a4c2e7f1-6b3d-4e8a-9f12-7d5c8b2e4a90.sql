-- Mismo patrón que para "propiedades": desacopla el orden de "Desarrollos
-- destacados" en Inicio del orden de catálogo (columna "orden"). Se
-- inicializa con el valor de "orden" para no alterar el orden visible hoy.
--
-- Envuelto en IF NOT EXISTS: seguro de re-ejecutar (p. ej. con
-- `supabase db push`) sin pisar un reordenamiento manual ya guardado.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'desarrollos' AND column_name = 'orden_destacada'
  ) THEN
    ALTER TABLE public.desarrollos ADD COLUMN orden_destacada integer NOT NULL DEFAULT 0;
    UPDATE public.desarrollos SET orden_destacada = orden;
  END IF;
END $$;
