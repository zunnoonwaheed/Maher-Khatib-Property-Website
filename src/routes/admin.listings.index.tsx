import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminNav } from "@/components/admin/admin-nav";
import { supabase } from "@/lib/supabase";
import { formatPrice, statusLabel, type Listing } from "@/lib/listings";

export const Route = createFileRoute("/admin/listings/")({
  component: () => (
    <AdminGuard>
      <AdminListingsList />
    </AdminGuard>
  ),
});

function AdminListingsList() {
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const loadListings = async () => {
    const { data, error: fetchError } = await supabase
      .from("listings")
      .select(
        "id, address, city_state, status, price, beds, baths, sqft, featured_image_url, tag, featured, sort_order, published, created_at",
      )
      .order("sort_order", { ascending: true });
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setListings(data ?? []);
  };

  useEffect(() => {
    loadListings();
  }, []);

  const onDelete = async (listing: Listing) => {
    if (!window.confirm(`Delete "${listing.address}"? This cannot be undone.`)) return;
    setDeletingId(listing.id);
    const { error: deleteError } = await supabase.from("listings").delete().eq("id", listing.id);
    setDeletingId(null);
    if (deleteError) {
      window.alert(`Failed to delete: ${deleteError.message}`);
      return;
    }
    setListings((prev) => prev?.filter((l) => l.id !== listing.id) ?? null);
  };

  const onTogglePublished = async (listing: Listing) => {
    setTogglingId(listing.id);
    const { error: updateError } = await supabase
      .from("listings")
      .update({ published: !listing.published })
      .eq("id", listing.id);
    setTogglingId(null);
    if (updateError) {
      window.alert(`Failed to update: ${updateError.message}`);
      return;
    }
    setListings(
      (prev) =>
        prev?.map((l) => (l.id === listing.id ? { ...l, published: !l.published } : l)) ?? null,
    );
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <main className="min-h-screen bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                Admin
              </span>
            </div>
            <h1 className="mt-4 font-serif text-4xl text-white">Listings</h1>
          </div>
          <div className="flex flex-col items-end gap-3">
            <AdminNav />
            <div className="flex items-center gap-3">
              <Link
                to="/admin/listings/new"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5"
              >
                <Plus className="h-4 w-4" /> New Listing
              </Link>
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70 hover:border-white/40 hover:text-white"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
          {error ? (
            <p className="p-8 text-sm text-red-400">{error}</p>
          ) : listings === null ? (
            <p className="p-8 text-sm text-white/50">Loading…</p>
          ) : listings.length === 0 ? (
            <p className="p-8 text-sm text-white/50">
              No listings yet — click "New Listing" to add your first one.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
                  <th className="px-6 py-4 font-semibold">Photo</th>
                  <th className="px-6 py-4 font-semibold">Address</th>
                  <th className="px-6 py-4 font-semibold">City, State</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Published</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-4">
                      <div className="h-12 w-16 overflow-hidden rounded-lg bg-white/5">
                        {listing.featured_image_url ? (
                          <img
                            src={listing.featured_image_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-serif text-lg text-white">{listing.address}</td>
                    <td className="px-6 py-4 text-sm text-white/60">{listing.city_state}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                        {statusLabel(listing.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">
                      {formatPrice(listing.price)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={listing.published}
                        disabled={togglingId === listing.id}
                        onClick={() => onTogglePublished(listing)}
                        className={`relative h-6 w-11 rounded-full transition-colors disabled:opacity-40 ${
                          listing.published ? "bg-gold" : "bg-white/15"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                            listing.published ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to="/admin/listings/$id/edit"
                          params={{ id: listing.id }}
                          aria-label="Edit"
                          className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:border-gold hover:text-gold"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          aria-label="Delete"
                          disabled={deletingId === listing.id}
                          onClick={() => onDelete(listing)}
                          className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:border-red-400 hover:text-red-400 disabled:opacity-40"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
