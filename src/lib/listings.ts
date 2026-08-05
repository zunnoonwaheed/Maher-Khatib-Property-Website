import { supabase } from "@/lib/supabase";

export type ListingStatus = "for_sale" | "pending" | "sold";

export type Listing = {
  id: string;
  address: string;
  address_es: string | null;
  city_state: string;
  city_state_es: string | null;
  status: ListingStatus;
  status_es: string | null;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  featured_image_url: string | null;
  featured: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
};

export const LISTING_COLUMNS =
  "id, address, address_es, city_state, city_state_es, status, status_es, price, beds, baths, sqft, featured_image_url, featured, sort_order, published, created_at" as const;
const COLUMNS = LISTING_COLUMNS;

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

type Lang = "en" | "es";

const STATUS_LABELS: Record<ListingStatus, string> = {
  for_sale: "For Sale",
  pending: "Pending",
  sold: "Sold",
};

// Default Spanish status labels, used whenever a listing has no per-row
// status_es override set — so ES mode never has to fall back to raw
// English for something as basic as the status badge.
const STATUS_LABELS_ES: Record<ListingStatus, string> = {
  for_sale: "En Venta",
  pending: "Pendiente",
  sold: "Vendido",
};

export function statusLabel(
  listing: Pick<Listing, "status" | "status_es">,
  language: Lang = "en",
): string {
  if (language === "es") return listing.status_es || STATUS_LABELS_ES[listing.status];
  return STATUS_LABELS[listing.status];
}

export function localizedAddress(
  listing: Pick<Listing, "address" | "address_es">,
  language: Lang,
): string {
  return (language === "es" && listing.address_es) || listing.address;
}

export function localizedCityState(
  listing: Pick<Listing, "city_state" | "city_state_es">,
  language: Lang,
): string {
  return (language === "es" && listing.city_state_es) || listing.city_state;
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
