-- Permite al personal (staff) eliminar definitivamente propiedades.
-- La política "prop_staff_write" (FOR ALL) ya restringe esto a is_staff();
-- faltaba el privilegio DELETE a nivel de tabla para el rol authenticated.
GRANT DELETE ON public.propiedades TO authenticated;
