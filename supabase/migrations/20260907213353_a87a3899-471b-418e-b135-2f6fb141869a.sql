CREATE TYPE public.app_role AS ENUM ('admin','editor');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  nombre text,
  activo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.profiles p ON p.id = ur.user_id
    WHERE ur.user_id = _user_id AND p.activo
  )
$$;

CREATE POLICY "profiles_select_staff" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "profiles_update_self" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "roles_select_staff" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "roles_admin_all" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nombre)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'nombre', NEW.raw_user_meta_data->>'full_name'))
  ON CONFLICT (id) DO NOTHING;
  IF NOT EXISTS (SELECT 1 FROM public.user_roles) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "content_public_read" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "content_staff_write" ON public.site_content FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER site_content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.propiedades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  nombre text NOT NULL,
  categoria text NOT NULL,
  estado text NOT NULL DEFAULT 'borrador',
  destacada boolean NOT NULL DEFAULT false,
  archivada boolean NOT NULL DEFAULT false,
  orden integer NOT NULL DEFAULT 0,
  desarrollo_id uuid,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.propiedades TO anon;
GRANT SELECT, INSERT, UPDATE ON public.propiedades TO authenticated;
GRANT ALL ON public.propiedades TO service_role;
ALTER TABLE public.propiedades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "prop_public_read" ON public.propiedades FOR SELECT TO anon USING (estado = 'publicada' AND archivada = false);
CREATE POLICY "prop_staff_read" ON public.propiedades FOR SELECT TO authenticated USING (public.is_staff(auth.uid()) OR (estado = 'publicada' AND archivada = false));
CREATE POLICY "prop_staff_write" ON public.propiedades FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER propiedades_updated BEFORE UPDATE ON public.propiedades FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.desarrollos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  nombre text NOT NULL,
  estado text NOT NULL DEFAULT 'borrador',
  destacado boolean NOT NULL DEFAULT false,
  archivado boolean NOT NULL DEFAULT false,
  orden integer NOT NULL DEFAULT 0,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.desarrollos TO anon;
GRANT SELECT, INSERT, UPDATE ON public.desarrollos TO authenticated;
GRANT ALL ON public.desarrollos TO service_role;
ALTER TABLE public.desarrollos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "des_public_read" ON public.desarrollos FOR SELECT TO anon USING (estado = 'publicado' AND archivado = false);
CREATE POLICY "des_staff_read" ON public.desarrollos FOR SELECT TO authenticated USING (public.is_staff(auth.uid()) OR (estado = 'publicado' AND archivado = false));
CREATE POLICY "des_staff_write" ON public.desarrollos FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER desarrollos_updated BEFORE UPDATE ON public.desarrollos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.propiedades ADD CONSTRAINT propiedades_desarrollo_fk FOREIGN KEY (desarrollo_id) REFERENCES public.desarrollos(id) ON DELETE SET NULL;

CREATE TABLE public.articulos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  titulo text NOT NULL,
  categoria text NOT NULL DEFAULT 'noticias',
  estado text NOT NULL DEFAULT 'borrador',
  archivado boolean NOT NULL DEFAULT false,
  fecha date NOT NULL DEFAULT current_date,
  orden integer NOT NULL DEFAULT 0,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.articulos TO anon;
GRANT SELECT, INSERT, UPDATE ON public.articulos TO authenticated;
GRANT ALL ON public.articulos TO service_role;
ALTER TABLE public.articulos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "art_public_read" ON public.articulos FOR SELECT TO anon USING (estado = 'publicado' AND archivado = false);
CREATE POLICY "art_staff_read" ON public.articulos FOR SELECT TO authenticated USING (public.is_staff(auth.uid()) OR (estado = 'publicado' AND archivado = false));
CREATE POLICY "art_staff_write" ON public.articulos FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER articulos_updated BEFORE UPDATE ON public.articulos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_id text NOT NULL,
  titulo text NOT NULL,
  duracion text,
  fecha date,
  orden integer NOT NULL DEFAULT 0,
  archivado boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.videos TO anon;
GRANT SELECT, INSERT, UPDATE ON public.videos TO authenticated;
GRANT ALL ON public.videos TO service_role;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vid_public_read" ON public.videos FOR SELECT TO anon USING (archivado = false);
CREATE POLICY "vid_staff_read" ON public.videos FOR SELECT TO authenticated USING (public.is_staff(auth.uid()) OR archivado = false);
CREATE POLICY "vid_staff_write" ON public.videos FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER videos_updated BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.estilo_vida (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  texto text,
  url text NOT NULL,
  fuente text,
  imagen text,
  orden integer NOT NULL DEFAULT 0,
  archivado boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.estilo_vida TO anon;
GRANT SELECT, INSERT, UPDATE ON public.estilo_vida TO authenticated;
GRANT ALL ON public.estilo_vida TO service_role;
ALTER TABLE public.estilo_vida ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ev_public_read" ON public.estilo_vida FOR SELECT TO anon USING (archivado = false);
CREATE POLICY "ev_staff_read" ON public.estilo_vida FOR SELECT TO authenticated USING (public.is_staff(auth.uid()) OR archivado = false);
CREATE POLICY "ev_staff_write" ON public.estilo_vida FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER estilo_vida_updated BEFORE UPDATE ON public.estilo_vida FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.suscriptores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  origen text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.suscriptores TO anon;
GRANT SELECT, INSERT, UPDATE ON public.suscriptores TO authenticated;
GRANT ALL ON public.suscriptores TO service_role;
ALTER TABLE public.suscriptores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sus_public_insert" ON public.suscriptores FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "sus_staff_read" ON public.suscriptores FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));