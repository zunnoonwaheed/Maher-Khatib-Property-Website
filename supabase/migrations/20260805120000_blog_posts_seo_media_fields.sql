-- Featured-image alt text, three fixed in-article images (each with its own
-- alt text), SEO overrides, and scheduling for blog_posts.

alter table public.blog_posts
  add column if not exists alt_text text,
  add column if not exists image_1_url text,
  add column if not exists image_1_alt text,
  add column if not exists image_2_url text,
  add column if not exists image_2_alt text,
  add column if not exists image_3_url text,
  add column if not exists image_3_alt text,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists keywords text,
  add column if not exists noindex boolean not null default false,
  add column if not exists scheduled_at timestamptz;

comment on column public.blog_posts.seo_title is 'Falls back to title when empty.';
comment on column public.blog_posts.seo_description is 'Falls back to excerpt when empty.';
comment on column public.blog_posts.keywords is 'Comma-separated. Own reference/meta-keywords only, not a ranking factor.';
comment on column public.blog_posts.scheduled_at is 'If set in the future, the post stays hidden from the public site until this time even when status=published.';
