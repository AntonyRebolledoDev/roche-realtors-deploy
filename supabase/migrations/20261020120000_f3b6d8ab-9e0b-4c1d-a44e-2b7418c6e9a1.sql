-- Desacopla el orden de "Propiedades destacadas" en Inicio del orden de
-- catálogo (columna "orden", usada por categoría en /propiedades). Se
-- inicializa con el valor de "orden" para no alterar el orden visible hoy;
-- a partir de aquí el admin la reordena de forma independiente desde el
-- nuevo panel de destacadas.
--
-- Envuelto en IF NOT EXISTS: si esta migración ya se aplicó a mano desde el
-- SQL Editor del dashboard, correrla de nuevo (p. ej. con `supabase db push`)
-- no debe repetir el UPDATE y borrar un reordenamiento manual ya guardado.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'propiedades' AND column_name = 'orden_destacada'
  ) THEN
    ALTER TABLE public.propiedades ADD COLUMN orden_destacada integer NOT NULL DEFAULT 0;
    UPDATE public.propiedades SET orden_destacada = orden;
  END IF;
END $$;
