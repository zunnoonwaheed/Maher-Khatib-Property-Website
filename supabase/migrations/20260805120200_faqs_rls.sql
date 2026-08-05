alter table public.faqs enable row level security;

-- Public/anon: read only FAQs whose post is actually publicly visible right
-- now — published AND not still scheduled for the future. Mirrors the
-- status/scheduled_at check applied to blog_posts itself, so a scheduled
-- post's FAQs can't be read early via a direct faqs query.
create policy "Public can read faqs of visible posts"
  on public.faqs
  for select
  to anon
  using (
    exists (
      select 1
      from public.blog_posts p
      where p.id = faqs.post_id
        and p.status = 'published'
        and (p.scheduled_at is null or p.scheduled_at <= now())
    )
  );

-- Authenticated (any logged-in Supabase Auth user — no roles table, same as
-- blog_posts): full read/write, covering the admin panel.
create policy "Authenticated users can read all faqs"
  on public.faqs
  for select
  to authenticated
  using (true);

create policy "Authenticated users can insert faqs"
  on public.faqs
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update faqs"
  on public.faqs
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete faqs"
  on public.faqs
  for delete
  to authenticated
  using (true);
