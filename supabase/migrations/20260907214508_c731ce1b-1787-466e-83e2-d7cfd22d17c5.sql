CREATE OR REPLACE FUNCTION public.hay_usuarios()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles)
$$;
REVOKE EXECUTE ON FUNCTION public.hay_usuarios() FROM public;
GRANT EXECUTE ON FUNCTION public.hay_usuarios() TO anon, authenticated;