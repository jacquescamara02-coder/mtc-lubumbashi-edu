
-- Étendre site_texts pour le CMS pro
ALTER TABLE public.site_texts
  ADD COLUMN IF NOT EXISTS label text,
  ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'text',
  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX IF NOT EXISTS site_texts_key_unique ON public.site_texts(key);

-- Nouvelle table site_images
CREATE TABLE IF NOT EXISTS public.site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  section text NOT NULL,
  label text NOT NULL,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_images TO authenticated;
GRANT ALL ON public.site_images TO service_role;

ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site images viewable by all"
  ON public.site_images FOR SELECT USING (true);

CREATE POLICY "Site images manageable by admin"
  ON public.site_images FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_site_images_updated_at
  BEFORE UPDATE ON public.site_images
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed des slots de TEXTES
INSERT INTO public.site_texts (key, section, label, kind, value, sort_order) VALUES
  ('hero.eyebrow', 'hero', 'Étiquette au-dessus du titre', 'text', 'Centre de Formation Professionnelle', 1),
  ('hero.title_line1', 'hero', 'Titre — ligne 1', 'text', 'MAMRE TRAINING', 2),
  ('hero.title_line2', 'hero', 'Titre — ligne 2 (en rouge)', 'text', 'CENTER', 3),
  ('hero.subtitle', 'hero', 'Sous-titre', 'richtext', 'Formez-vous aux métiers d''avenir avec MTC. Une formation de qualité pour un avenir professionnel réussi à Lubumbashi et dans le Haut-Katanga.', 4),
  ('hero.cta_primary', 'hero', 'Bouton principal', 'text', 'Nos Formations', 5),
  ('hero.cta_secondary', 'hero', 'Bouton secondaire', 'text', 'Nous Contacter', 6),

  ('about.eyebrow', 'about', 'Étiquette section', 'text', 'Qui sommes-nous ?', 1),
  ('about.title', 'about', 'Titre principal', 'text', 'Un centre d''excellence pour votre formation professionnelle', 2),
  ('about.paragraph_1', 'about', 'Paragraphe 1', 'richtext', 'Le Centre de Formation Professionnelle Mamre Training Center (MTC) est un établissement agréé dédié à l''acquisition de compétences pratiques et professionnelles. Situé au cœur de Lubumbashi avec des antennes à Kolwezi et Likasi, MTC offre plus de 50 formations certifiantes adaptées aux besoins du marché.', 3),
  ('about.paragraph_2', 'about', 'Paragraphe 2', 'richtext', 'Nos formations couvrent 9 domaines d''expertise : informatique et multimédia, mode et beauté, hôtellerie, métiers techniques, management, entrepreneuriat, langues, sécurité au travail, et conduite d''engins lourds.', 4),
  ('about.paragraph_3', 'about', 'Paragraphe 3', 'richtext', 'Chaque parcours combine formation théorique, pratique encadrée, stage professionnel et délivrance d''un brevet reconnu.', 5),
  ('about.stat_1_value', 'about', 'Statistique 1 — valeur', 'text', '1000+', 6),
  ('about.stat_1_label', 'about', 'Statistique 1 — libellé', 'text', 'Étudiants formés', 7),
  ('about.stat_2_value', 'about', 'Statistique 2 — valeur', 'text', '50+', 8),
  ('about.stat_2_label', 'about', 'Statistique 2 — libellé', 'text', 'Formations', 9),
  ('about.stat_3_value', 'about', 'Statistique 3 — valeur', 'text', '100%', 10),
  ('about.stat_3_label', 'about', 'Statistique 3 — libellé', 'text', 'Brevets délivrés', 11),
  ('about.stat_4_value', 'about', 'Statistique 4 — valeur', 'text', '85%', 12),
  ('about.stat_4_label', 'about', 'Statistique 4 — libellé', 'text', 'Taux d''insertion', 13),

  ('courses.eyebrow', 'courses', 'Étiquette section', 'text', 'Nos programmes', 1),
  ('courses.title', 'courses', 'Titre principal', 'text', 'Plus de 100 Formations Professionnelles', 2),
  ('courses.subtitle', 'courses', 'Sous-titre', 'richtext', 'Des formations pratiques et certifiantes dans 9 domaines d''expertise. Chaque parcours inclut une formation théorique, une pratique encadrée et un brevet reconnu.', 3),
  ('courses.cta_title', 'courses', 'Bandeau CTA — titre', 'text', 'Intéressé par une formation ?', 4),
  ('courses.cta_subtitle', 'courses', 'Bandeau CTA — sous-titre', 'richtext', 'Contactez-nous pour obtenir plus d''informations sur les inscriptions, les horaires et les modalités de paiement.', 5),

  ('gallery.eyebrow', 'gallery', 'Étiquette section', 'text', 'Galerie', 1),
  ('gallery.title', 'gallery', 'Titre principal', 'text', 'Nos Activités en Images', 2),
  ('gallery.subtitle', 'gallery', 'Sous-titre', 'richtext', 'Découvrez l''environnement d''apprentissage, les ateliers pratiques et la vie au sein du centre MTC.', 3),

  ('video.eyebrow', 'video', 'Étiquette section', 'text', 'Découvrez MTC', 1),
  ('video.title', 'video', 'Titre principal', 'text', 'Notre Centre en Vidéo', 2),
  ('video.subtitle', 'video', 'Sous-titre', 'richtext', 'Plongez au cœur de Mamre Training Center et découvrez nos installations, nos formations et l''ambiance qui fait notre force.', 3),

  ('testimonials.eyebrow', 'testimonials', 'Étiquette section', 'text', 'Témoignages', 1),
  ('testimonials.title', 'testimonials', 'Titre principal', 'text', 'Ce que disent nos anciens étudiants', 2),
  ('testimonials.subtitle', 'testimonials', 'Sous-titre', 'richtext', 'Découvrez les parcours inspirants de ceux qui ont été formés chez MTC.', 3),

  ('payment.eyebrow', 'payment', 'Étiquette section', 'text', 'Paiement', 1),
  ('payment.title', 'payment', 'Titre principal', 'text', 'Effectuez Votre Paiement', 2),
  ('payment.subtitle', 'payment', 'Sous-titre', 'richtext', 'Suivez les étapes ci-dessous pour régler vos frais de formation en toute simplicité.', 3),

  ('sites.eyebrow', 'sites', 'Étiquette section', 'text', 'Nos implantations', 1),
  ('sites.title', 'sites', 'Titre principal', 'text', 'Nos Sites', 2),
  ('sites.subtitle', 'sites', 'Sous-titre', 'richtext', 'Présents dans les principales villes du Haut-Katanga pour vous former au plus près.', 3),

  ('faq.eyebrow', 'faq', 'Étiquette section', 'text', 'FAQ', 1),
  ('faq.title', 'faq', 'Titre principal', 'text', 'Questions Fréquentes', 2),
  ('faq.subtitle', 'faq', 'Sous-titre', 'text', 'Tout ce que vous devez savoir avant de vous inscrire.', 3),

  ('contact.eyebrow', 'contact', 'Étiquette section', 'text', 'Contactez-nous', 1),
  ('contact.title', 'contact', 'Titre principal', 'text', 'Restons en Contact', 2),
  ('contact.subtitle', 'contact', 'Sous-titre', 'richtext', 'Demandez des informations sur nos formations ou inscrivez-vous directement en ligne.', 3),
  ('contact.address_line_1', 'contact', 'Adresse — ligne 1', 'text', 'Q. Makomeno, Av. Lomami coin des Usines, N°04', 4),
  ('contact.address_line_2', 'contact', 'Adresse — ligne 2', 'text', 'Commune de Lubumbashi, Haut-Katanga, RDC', 5),
  ('contact.phone_1', 'contact', 'Téléphone principal', 'text', '+243 816 029 419', 6),
  ('contact.phone_2', 'contact', 'Téléphone secondaire', 'text', '+243 993 132 628', 7),
  ('contact.whatsapp', 'contact', 'Numéro WhatsApp (sans espaces)', 'text', '243816029419', 8),
  ('contact.rccm', 'contact', 'RCCM', 'text', 'CD/L''SHI/24-B-01324', 9),
  ('contact.id_nat', 'contact', 'ID NAT', 'text', '05-P8501-N55251L', 10),
  ('contact.impot', 'contact', 'N° Impôt', 'text', 'A2425544S', 11),

  ('footer.tagline', 'footer', 'Slogan du pied de page', 'richtext', 'Centre de Formation Professionnelle Mamre Training Center. Former pour transformer.', 1),
  ('footer.facebook_url', 'footer', 'URL Facebook', 'text', 'https://www.facebook.com/share/p/1EVc8mDhaw/', 2),
  ('footer.tiktok_url', 'footer', 'URL TikTok', 'text', 'https://www.tiktok.com/@mamretrainingcenter', 3),

  ('navbar.brand_line_1', 'navbar', 'Nom (ligne 1)', 'text', 'MAMRE TRAINING CENTER', 1),
  ('navbar.brand_line_2', 'navbar', 'Sous-titre (ligne 2)', 'text', 'Centre de Formation Professionnelle', 2),
  ('navbar.cta', 'navbar', 'Bouton CTA', 'text', 'Appelez-nous', 3)
ON CONFLICT (key) DO NOTHING;

-- Seed des slots d'IMAGES (image_url null = utilise le fallback du code)
INSERT INTO public.site_images (key, section, label, sort_order) VALUES
  ('hero.background', 'hero', 'Image de fond du Hero', 1),
  ('about.photo', 'about', 'Photo / Logo À propos', 1),
  ('brand.logo', 'navbar', 'Logo MTC (Navbar + Footer)', 1),
  ('video.main', 'video', 'Vidéo principale (présentation du centre)', 1),
  ('courses.cat_informatique', 'courses', 'Catégorie — Informatique & Multimédia', 1),
  ('courses.cat_mode', 'courses', 'Catégorie — Mode & Beauté', 2),
  ('courses.cat_hotellerie', 'courses', 'Catégorie — Hôtellerie & Restauration', 3),
  ('courses.cat_technique', 'courses', 'Catégorie — Métiers Techniques', 4),
  ('courses.cat_management', 'courses', 'Catégorie — Management & Gestion', 5),
  ('courses.cat_entrepreneuriat', 'courses', 'Catégorie — Entrepreneuriat & Commerce', 6),
  ('courses.cat_langues', 'courses', 'Catégorie — Langues & Communication', 7),
  ('courses.cat_securite', 'courses', 'Catégorie — Sécurité & Réglementation', 8),
  ('courses.cat_autoecole', 'courses', 'Catégorie — Auto-École & Engins Lourds', 9),
  ('testimonials.photo_1', 'testimonials', 'Photo témoignage 1', 1),
  ('testimonials.photo_2', 'testimonials', 'Photo témoignage 2', 2),
  ('testimonials.photo_3', 'testimonials', 'Photo témoignage 3', 3),
  ('testimonials.photo_4', 'testimonials', 'Photo témoignage 4', 4)
ON CONFLICT (key) DO NOTHING;
