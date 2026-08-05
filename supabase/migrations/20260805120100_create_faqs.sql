-- faqs: per-post Q&A list, rendered near the end of a blog post and emitted
-- as FAQPage JSON-LD when non-empty.

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order integer not null default 0
);

comment on table public.faqs is 'FAQ entries attached to a blog post.';

create index if not exists faqs_post_id_idx on public.faqs (post_id);
