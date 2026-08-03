alter table public.blog_posts enable row level security;

-- Public/anon: read only published posts.
create policy "Public can read published posts"
  on public.blog_posts
  for select
  to anon
  using (status = 'published');

-- Authenticated (any logged-in Supabase Auth user — no roles table):
-- full read/write. This also implicitly covers reading drafts in /admin.
create policy "Authenticated users can read all posts"
  on public.blog_posts
  for select
  to authenticated
  using (true);

create policy "Authenticated users can insert posts"
  on public.blog_posts
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update posts"
  on public.blog_posts
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete posts"
  on public.blog_posts
  for delete
  to authenticated
  using (true);
