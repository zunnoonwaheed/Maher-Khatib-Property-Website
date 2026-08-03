-- blog_posts: single-table blog backing the /blog and /admin pages.
-- No roles table — any authenticated Supabase Auth user can manage posts.

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  featured_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.blog_posts is 'Blog posts for the Maher Khatib Group site.';

-- Stamp published_at the first time a post becomes 'published' — whether
-- that's a brand-new post created directly as published (INSERT), or an
-- existing draft transitioning to published (UPDATE). Never overwrites an
-- already-set published_at.
create or replace function public.set_blog_post_published_at()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published' and new.published_at is null then
    if TG_OP = 'INSERT' or old.status is distinct from 'published' then
      new.published_at := now();
    end if;
  end if;
  return new;
end;
$$;

create trigger blog_posts_set_published_at
  before insert or update on public.blog_posts
  for each row
  execute function public.set_blog_post_published_at();
