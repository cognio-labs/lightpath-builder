
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE POLICY "users see their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admins see all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- First-user auto-admin trigger
CREATE OR REPLACE FUNCTION public.grant_first_user_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_first_admin
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.grant_first_user_admin();

-- Updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ COURSES ============
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  tagline text,
  description text,
  image_url text,
  price_inr integer,
  duration text,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads published courses" ON public.courses FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins write courses" ON public.courses FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ EVENTS ============
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  location text,
  starts_at timestamptz,
  ends_at timestamptz,
  register_url text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads published events" ON public.events FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins write events" ON public.events FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ TESTIMONIALS ============
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_title text,
  quote text,
  youtube_id text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads published testimonials" ON public.testimonials FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins write testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ SOLUTION PAGES ============
CREATE TABLE public.solution_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  tagline text,
  intro text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.solution_pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.solution_pages TO authenticated;
GRANT ALL ON public.solution_pages TO service_role;
ALTER TABLE public.solution_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads solution pages" ON public.solution_pages FOR SELECT USING (true);
CREATE POLICY "admins write solution pages" ON public.solution_pages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER solution_pages_updated_at BEFORE UPDATE ON public.solution_pages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.solution_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  solution_slug text NOT NULL REFERENCES public.solution_pages(slug) ON DELETE CASCADE,
  title text NOT NULL,
  excerpt text,
  body text,
  link_url text,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.solution_articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.solution_articles TO authenticated;
GRANT ALL ON public.solution_articles TO service_role;
ALTER TABLE public.solution_articles ENABLE ROW LEVEL SECURITY;
CREATE INDEX ON public.solution_articles(solution_slug);
CREATE POLICY "anyone reads published articles" ON public.solution_articles FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins write articles" ON public.solution_articles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER solution_articles_updated_at BEFORE UPDATE ON public.solution_articles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ FORM SUBMISSIONS ============
CREATE TYPE public.submission_type AS ENUM ('book_session', 'contact', 'callback');
CREATE TYPE public.submission_status AS ENUM ('new', 'contacted', 'closed');

CREATE TABLE public.form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type submission_type NOT NULL,
  status submission_status NOT NULL DEFAULT 'new',
  name text NOT NULL,
  email text,
  phone text,
  message text,
  meta jsonb,
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.form_submissions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.form_submissions TO authenticated;
GRANT ALL ON public.form_submissions TO service_role;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit" ON public.form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "admins read submissions" ON public.form_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update submissions" ON public.form_submissions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete submissions" ON public.form_submissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER form_submissions_updated_at BEFORE UPDATE ON public.form_submissions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ SEED SOLUTION PAGES ============
INSERT INTO public.solution_pages (slug, title, tagline, intro) VALUES
  ('stress', 'Stress', 'Boost Your Energy and Tackle Tasks Easily', 'Stress is a natural response, but chronic stress drains your vitality. Learn ancient techniques adapted for modern life to release tension, restore energy, and meet each day with steadiness.'),
  ('anxiety', 'Anxiety', 'Beating Anxiety Together: Simple Steps to Calm', 'Anxiety clouds clarity and steals presence. Discover breath, meditation, and mindset practices to soothe the nervous system and return to calm.'),
  ('depression', 'Depression', 'Step by Step: Beating Depression', 'Depression is not a life sentence. Through consistent practice, guided wisdom, and community, light returns — one conscious step at a time.'),
  ('parenting', 'Parenting', 'Sakshi Shree''s Guide to Parenting Through the Ages', 'Raise conscious, resilient children with wisdom rooted in ancient values and modern understanding of the child''s mind.'),
  ('addictions', 'Addictions', 'Find Your Freedom: Overcoming Addiction', 'Addictions are patterns the mind runs on autopilot. Meditation restores choice — freedom is available in every present moment.'),
  ('overthinking', 'Overthinking', 'Overthinking No More: Techniques for Clarity', 'The mind loops when it lacks direction. Learn to witness thoughts without being consumed by them, and reclaim mental space.'),
  ('meditation', 'Meditation', 'Start Meditating Today: A Guide to Health and Happiness', 'Meditation is not escape — it is the direct path to knowing yourself. Begin today with time-tested techniques.'),
  ('manifestation', 'Manifestation', 'Manifest Your Success: Unleash Your Potential', 'Consciousness shapes reality. When intention, emotion, and action align, the universe conspires to deliver.'),
  ('finding-purpose', 'Finding Purpose', 'Finding Your Purpose: A Journey to Self-Discovery', 'Purpose is discovered, not decided. Turn inward and let your true calling emerge naturally.'),
  ('yoga', 'Yoga', 'Easy Yoga for Everyday Peace', 'Yoga is union — of body, breath, and being. Simple asanas practiced daily transform how you inhabit your life.'),
  ('gratitude', 'Gratitude', 'Finding Light in the Storm: The Transformative Power of Gratitude', 'Gratitude rewires perception. It shifts you from what''s missing to what''s already miraculous.'),
  ('mindfulness', 'Mindfulness', 'Unlock the Mind''s True Potential', 'Mindfulness is presence — the art of being fully here. It is the doorway to everything spirituality promises.'),
  ('positive-thinking', 'Positive Thinking', 'The Power of Positive Thinking', 'Positive thinking is not denial — it''s the disciplined choice to focus on what serves your highest good.');

-- ============ SEED COURSES ============
INSERT INTO public.courses (slug, title, tagline, description, image_url, price_inr, duration, sort_order) VALUES
  ('design-your-destiny', 'Design Your Destiny', 'Rewrite the script you are living', 'Break free from inherited patterns and consciously design the life you truly want to live.', 'https://sciencedivine.org/wp-content/uploads/2024/04/pexels-tomfisk-2894524-1-1.png', 499, '6 weeks', 1),
  ('science-of-joyful-living', 'Science of Joyful Living', 'Joy is your baseline, not your goal', 'Reconnect with the natural joy that is your birthright through daily practices rooted in ancient wisdom.', 'https://sciencedivine.org/wp-content/uploads/2024/04/pexels-chetanvlad-2923157-1.png', 999, '8 weeks', 2),
  ('mind-power-meditation', 'Mind Power Meditation', 'Direct the mind, direct the life', 'Master the tools that turn scattered thought into focused creative power.', 'https://sciencedivine.org/wp-content/uploads/2024/04/pexels-eberhardgross-1367192.png', 499, '4 weeks', 3),
  ('sanjeevni-kriya', 'Sanjeevani Kriya', 'The ancient technique of aliveness', 'A time-tested kriya that restores vitality at the cellular and energetic level.', 'https://sciencedivine.org/wp-content/uploads/2024/04/pexels-min-an-1234035-1-1.png', 999, '5 weeks', 4);

-- ============ SEED TESTIMONIALS ============
INSERT INTO public.testimonials (author_name, author_title, quote, youtube_id, sort_order) VALUES
  ('Ritu Sharma', 'Student, Delhi', 'One session with Sakshi Shree changed the direction of my life. The clarity was unmistakable.', 'TIeoLbW_Tms', 1),
  ('Arjun Verma', 'Entrepreneur, Mumbai', 'The Design Your Destiny course gave me tools I use every single day. Nothing has been the same since.', 'M_bO-m-sG1Q', 2),
  ('Anita Rao', 'Educator, Bangalore', 'I came for stress relief and left with a completely new relationship with my own mind.', 'okTnWaUrrcc', 3);
