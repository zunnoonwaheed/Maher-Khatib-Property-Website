-- Spanish-language overrides for admin-managed content. All nullable —
-- an empty/unset _es value means the frontend falls back to the English
-- column rather than blocking publish or showing nothing.

alter table public.blog_posts
  add column if not exists title_es text,
  add column if not exists excerpt_es text,
  add column if not exists content_es text,
  add column if not exists seo_title_es text,
  add column if not exists seo_description_es text;

alter table public.listings
  add column if not exists address_es text,
  add column if not exists city_state_es text,
  add column if not exists status_es text,
  add column if not exists tag_es text;

alter table public.faqs
  add column if not exists question_es text,
  add column if not exists answer_es text;
