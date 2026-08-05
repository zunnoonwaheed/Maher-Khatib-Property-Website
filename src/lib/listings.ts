import { supabase } from "@/lib/supabase";

export type ListingStatus = "for_sale" | "pending" | "sold";

export type Listing = {
  id: string;
  address: string;
  city_state: string;
  status: ListingStatus;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  featured_image_url: string | null;
  tag: string | null;
  featured: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
};

const COLUMNS =
  "id, address, city_state, status, price, beds, baths, sqft, featured_image_url, tag, featured, sort_order, published, created_at";

export async function getFeaturedListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select(COLUMNS)
    .eq("published", true)
    .eq("featured", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getPublishedListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select(COLUMNS)
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

const STATUS_LABELS: Record<ListingStatus, string> = {
  for_sale: "For Sale",
  pending: "Pending",
  sold: "Sold",
};

export function statusLabel(status: ListingStatus): string {
  return STATUS_LABELS[status];
}

// Preserves each listing's exact current display badge (e.g. "New Build",
// "Investment") when a custom tag is set; falls back to the status label
// for any future listing created without one.
export function badgeLabel(listing: Pick<Listing, "tag" | "status">): string {
  return listing.tag ?? statusLabel(listing.status);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatBaths(baths: number): string {
  return Number.isInteger(baths) ? String(baths) : baths.toFixed(1);
}

export function formatSqft(sqft: number): string {
  return sqft.toLocaleString("en-US");
}
