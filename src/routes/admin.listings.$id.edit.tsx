import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminNav } from "@/components/admin/admin-nav";
import { ListingEditorForm } from "@/components/admin/listing-editor-form";
import { supabase } from "@/lib/supabase";
import type { Listing } from "@/lib/listings";

export const Route = createFileRoute("/admin/listings/$id/edit")({
  component: () => (
    <AdminGuard>
      <EditListingPage />
    </AdminGuard>
  ),
});

function EditListingPage() {
  const { id } = Route.useParams();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    supabase
      .from("listings")
      .select(
        "id, address, city_state, status, price, beds, baths, sqft, featured_image_url, tag, featured, sort_order, published, created_at",
      )
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setListing(data);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto mb-10 flex max-w-2xl items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Admin
            </span>
          </div>
          <h1 className="mt-4 font-serif text-4xl text-white">Edit Listing</h1>
        </div>
        <AdminNav />
      </div>

      {listing === undefined ? (
        <p className="text-center text-sm text-white/50">Loading…</p>
      ) : listing === null ? (
        <p className="text-center text-sm text-red-400">Listing not found.</p>
      ) : (
        <ListingEditorForm key={listing.id} initialListing={listing} />
      )}
    </main>
  );
}
