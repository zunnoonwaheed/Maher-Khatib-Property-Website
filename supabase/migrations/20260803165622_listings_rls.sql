alter table public.listings enable row level security;

create policy "Public can read published listings"
  on public.listings
  for select
  to anon
  using (published = true);

create policy "Authenticated users can read all listings"
  on public.listings
  for select
  to authenticated
  using (true);

create policy "Authenticated users can insert listings"
  on public.listings
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update listings"
  on public.listings
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete listings"
  on public.listings
  for delete
  to authenticated
  using (true);
