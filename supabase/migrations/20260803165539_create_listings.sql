-- listings: property listings shown on the homepage "Featured Listings"
-- section and the /listings page, replacing hardcoded arrays.
--
-- `featured` is an addition beyond the originally specified column list:
-- the homepage and /listings page currently show two different,
-- non-overlapping sets of properties. Without a way to distinguish "shows
-- on homepage" from "shows on /listings", one shared `published` flag would
-- force both pages to render the exact same set, changing either page's
-- current appearance. `featured = true` -> homepage; the rest -> /listings.

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  city_state text not null,
  status text not null default 'for_sale' check (status in ('for_sale', 'pending', 'sold')),
  price numeric not null,
  beds integer not null,
  baths numeric not null,
  sqft integer not null,
  featured_image_url text,
  tag text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.listings is 'Property listings for the Maher Khatib Group site.';
comment on column public.listings.tag is 'Optional display label, e.g. "Coastal" or "Downtown" — shown on the card badge when set.';
comment on column public.listings.featured is 'True = surfaced in the homepage "Featured Listings" section. False = shown on the /listings page.';
