import { useState, type ChangeEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, ImagePlus, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Listing, ListingStatus } from "@/lib/listings";

type Props = {
  initialListing?: Listing;
};

const STATUS_OPTIONS: { value: ListingStatus; label: string }[] = [
  { value: "for_sale", label: "For Sale" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
];

export function ListingEditorForm({ initialListing }: Props) {
  const navigate = useNavigate();
  const [address, setAddress] = useState(initialListing?.address ?? "");
  const [cityState, setCityState] = useState(initialListing?.city_state ?? "");
  const [status, setStatus] = useState<ListingStatus>(initialListing?.status ?? "for_sale");
  const [price, setPrice] = useState(initialListing ? String(initialListing.price) : "");
  const [beds, setBeds] = useState(initialListing ? String(initialListing.beds) : "");
  const [baths, setBaths] = useState(initialListing ? String(initialListing.baths) : "");
  const [sqft, setSqft] = useState(initialListing ? String(initialListing.sqft) : "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    initialListing?.featured_image_url ?? "",
  );
  const [tag, setTag] = useState(initialListing?.tag ?? "");
  const [featured, setFeatured] = useState(initialListing?.featured ?? false);
  const [published, setPublished] = useState(initialListing?.published ?? false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFeaturedImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingImage(true);
    setError(null);
    try {
      const path = `listings/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("blog-images").upload(path, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      setFeaturedImageUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const save = async () => {
    if (!address.trim() || !cityState.trim()) {
      setError("Address and City/State are required.");
      return;
    }
    const priceNum = Number(price);
    const bedsNum = Number(beds);
    const bathsNum = Number(baths);
    const sqftNum = Number(sqft);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      setError("Price must be a valid number.");
      return;
    }
    if (!Number.isInteger(bedsNum) || bedsNum < 0) {
      setError("Beds must be a whole number.");
      return;
    }
    if (!Number.isFinite(bathsNum) || bathsNum < 0) {
      setError("Baths must be a valid number.");
      return;
    }
    if (!Number.isInteger(sqftNum) || sqftNum < 0) {
      setError("Sqft must be a whole number.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      address: address.trim(),
      city_state: cityState.trim(),
      status,
      price: priceNum,
      beds: bedsNum,
      baths: bathsNum,
      sqft: sqftNum,
      featured_image_url: featuredImageUrl || null,
      tag: tag.trim() || null,
      featured,
      published,
    };

    const { error: saveError } = initialListing
      ? await supabase.from("listings").update(payload).eq("id", initialListing.id)
      : await supabase.from("listings").insert(payload);

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    navigate({ to: "/admin/listings" });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
            Address
          </span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Sunset Avenue"
            className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-serif text-lg text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
            City, State
          </span>
          <input
            value={cityState}
            onChange={(e) => setCityState(e.target.value)}
            placeholder="Longmeadow, MA"
            className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-serif text-lg text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
            Status
          </span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ListingStatus)}
            className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white focus:border-gold focus:outline-none"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-black">
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
            Price (USD)
          </span>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="925000"
            className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-serif text-lg text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
            Beds
          </span>
          <input
            type="number"
            min={0}
            step={1}
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-lg text-white focus:border-gold focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
            Baths
          </span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-lg text-white focus:border-gold focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
            Sqft
          </span>
          <input
            type="number"
            min={0}
            step={1}
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-lg text-white focus:border-gold focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          Featured Image
        </span>
        {featuredImageUrl ? (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img src={featuredImageUrl} alt="" className="h-64 w-full object-cover" />
          </div>
        ) : null}
        <label className="mt-2 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70 hover:border-white/40 hover:text-white">
          {uploadingImage ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {featuredImageUrl ? "Replace Image" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFeaturedImageChange}
            disabled={uploadingImage}
          />
        </label>
      </div>

      <label className="mt-6 flex flex-col gap-2">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          Tag (optional)
        </span>
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Coastal, Downtown, New Build…"
          className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
        />
      </label>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Toggle
          label="Show in homepage Featured Listings"
          checked={featured}
          onChange={setFeatured}
        />
        <Toggle label="Published (live on the site)" checked={published} onChange={setPublished} />
      </div>

      {error ? <p className="mt-6 text-sm text-red-400">{error}</p> : null}

      <div className="mt-10">
        <button
          type="button"
          disabled={saving}
          onClick={save}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save Listing
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/40 px-5 py-4">
      <span className="text-sm text-white">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-gold" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
