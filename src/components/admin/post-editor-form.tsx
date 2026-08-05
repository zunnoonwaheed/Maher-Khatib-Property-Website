import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, ImagePlus, Loader2, Plus, X, ChevronUp, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { getFaqsForPost, type BlogPost, type BlogPostStatus } from "@/lib/blog";

type Props = {
  initialPost?: BlogPost;
};

type ImageSlot = {
  url: string;
  alt: string;
  uploading: boolean;
  dims: { w: number; h: number } | null;
};

type FaqDraft = {
  key: string;
  question: string;
  answer: string;
};

const EMPTY_SLOT: ImageSlot = { url: "", alt: "", uploading: false, dims: null };

const SLOT_LABELS = [
  "Image 1 (early in the post)",
  "Image 2 (middle of the post)",
  "Image 3 (near the end)",
];

const INDEX_OPTIONS: { value: "index" | "noindex"; label: string }[] = [
  { value: "index", label: "Yes — index normally" },
  { value: "noindex", label: "No — noindex this page" },
];

function toDatetimeLocalValue(iso: string | null): string {
  const d = iso ? new Date(iso) : new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

async function uploadBlogImage(file: File): Promise<string> {
  const path = `${crypto.randomUUID()}-${file.name}`;
  const { error: uploadError } = await supabase.storage.from("blog-images").upload(path, file);
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
}

export function PostEditorForm({ initialPost }: Props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost));
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(initialPost?.featured_image_url ?? "");
  const [altText, setAltText] = useState(initialPost?.alt_text ?? "");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [images, setImages] = useState<ImageSlot[]>([
    { ...EMPTY_SLOT, url: initialPost?.image_1_url ?? "", alt: initialPost?.image_1_alt ?? "" },
    { ...EMPTY_SLOT, url: initialPost?.image_2_url ?? "", alt: initialPost?.image_2_alt ?? "" },
    { ...EMPTY_SLOT, url: initialPost?.image_3_url ?? "", alt: initialPost?.image_3_alt ?? "" },
  ]);

  const [faqs, setFaqs] = useState<FaqDraft[]>([]);

  const [seoTitle, setSeoTitle] = useState(initialPost?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(initialPost?.seo_description ?? "");
  const [keywords, setKeywords] = useState(initialPost?.keywords ?? "");
  const [indexing, setIndexing] = useState<"index" | "noindex">(
    initialPost?.noindex ? "noindex" : "index",
  );
  const [scheduledAt, setScheduledAt] = useState(
    toDatetimeLocalValue(initialPost?.scheduled_at ?? null),
  );

  const [saving, setSaving] = useState<BlogPostStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialPost) return;
    let active = true;
    getFaqsForPost(initialPost.id).then((rows) => {
      if (!active) return;
      setFaqs(rows.map((f) => ({ key: f.id, question: f.question, answer: f.answer })));
    });
    return () => {
      active = false;
    };
  }, [initialPost]);

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const onFeaturedImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingImage(true);
    setError(null);
    try {
      setFeaturedImageUrl(await uploadBlogImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSlotFileChange = (index: number) => async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setImages((prev) => prev.map((s, i) => (i === index ? { ...s, uploading: true } : s)));
    setError(null);
    try {
      const url = await uploadBlogImage(file);
      setImages((prev) =>
        prev.map((s, i) => (i === index ? { ...s, url, uploading: false, dims: null } : s)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
      setImages((prev) => prev.map((s, i) => (i === index ? { ...s, uploading: false } : s)));
    }
  };

  const onSlotRemove = (index: number) => {
    setImages((prev) => prev.map((s, i) => (i === index ? { ...EMPTY_SLOT } : s)));
  };

  const onSlotAltChange = (index: number, alt: string) => {
    setImages((prev) => prev.map((s, i) => (i === index ? { ...s, alt } : s)));
  };

  const onSlotImgLoad = (index: number) => (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const dims = { w: img.naturalWidth, h: img.naturalHeight };
    setImages((prev) => prev.map((s, i) => (i === index ? { ...s, dims } : s)));
  };

  const addFaq = () => {
    setFaqs((prev) => [...prev, { key: crypto.randomUUID(), question: "", answer: "" }]);
  };

  const removeFaq = (key: string) => {
    setFaqs((prev) => prev.filter((f) => f.key !== key));
  };

  const updateFaq = (key: string, field: "question" | "answer", value: string) => {
    setFaqs((prev) => prev.map((f) => (f.key === key ? { ...f, [field]: value } : f)));
  };

  const moveFaq = (index: number, direction: -1 | 1) => {
    setFaqs((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const save = async (status: BlogPostStatus) => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required.");
      return;
    }
    if (!content.trim()) {
      setError("Content is required.");
      return;
    }
    for (let i = 0; i < images.length; i++) {
      if (images[i].url && !images[i].alt.trim()) {
        setError(`Alt text is required for ${SLOT_LABELS[i]}.`);
        return;
      }
    }

    setSaving(status);
    setError(null);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      featured_image_url: featuredImageUrl || null,
      alt_text: altText.trim() || null,
      image_1_url: images[0].url || null,
      image_1_alt: images[0].alt.trim() || null,
      image_2_url: images[1].url || null,
      image_2_alt: images[1].alt.trim() || null,
      image_3_url: images[2].url || null,
      image_3_alt: images[2].alt.trim() || null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      keywords: keywords.trim() || null,
      noindex: indexing === "noindex",
      scheduled_at: new Date(scheduledAt).toISOString(),
      status,
    };

    const { data: savedPost, error: saveError } = initialPost
      ? await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", initialPost.id)
          .select("id")
          .single()
      : await supabase.from("blog_posts").insert(payload).select("id").single();

    if (saveError || !savedPost) {
      setSaving(null);
      setError(saveError?.message ?? "Failed to save post.");
      return;
    }

    const { error: deleteFaqsError } = await supabase
      .from("faqs")
      .delete()
      .eq("post_id", savedPost.id);
    if (deleteFaqsError) {
      setSaving(null);
      setError(deleteFaqsError.message);
      return;
    }

    const faqRows = faqs
      .filter((f) => f.question.trim() && f.answer.trim())
      .map((f, i) => ({
        post_id: savedPost.id,
        question: f.question.trim(),
        answer: f.answer.trim(),
        sort_order: i,
      }));

    if (faqRows.length > 0) {
      const { error: faqInsertError } = await supabase.from("faqs").insert(faqRows);
      if (faqInsertError) {
        setSaving(null);
        setError(faqInsertError.message);
        return;
      }
    }

    setSaving(null);
    navigate({ to: "/admin" });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <label className="flex flex-col gap-2">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          Title
        </span>
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Post title"
          className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-serif text-2xl text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
        />
      </label>

      <label className="mt-6 flex flex-col gap-2">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          Slug
        </span>
        <input
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          placeholder="post-slug"
          className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-mono text-sm text-white/80 placeholder:text-white/25 focus:border-gold focus:outline-none"
        />
      </label>

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
        {featuredImageUrl ? (
          <input
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Alt text for the featured image"
            className="mt-2 rounded-xl border border-white/10 bg-black/40 px-5 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
          />
        ) : null}
      </div>

      <label className="mt-6 flex flex-col gap-2">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          Excerpt
        </span>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          placeholder="One or two sentences summarizing the post"
          className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
        />
      </label>

      <div className="mt-6 flex flex-col gap-2">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          Content
        </span>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      {/* In-Article Images — optional, rendered at fixed points through the post body */}
      <div className="mt-10">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          In-Article Images (optional)
        </span>
        <div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {images.map((slot, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs text-white/60">{SLOT_LABELS[i]}</p>
              {slot.url ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={slot.url}
                    alt=""
                    onLoad={onSlotImgLoad(i)}
                    className="h-32 w-full object-cover"
                  />
                </div>
              ) : null}
              {slot.dims ? (
                <p className="mt-2 text-[0.65rem] text-white/40">
                  Current: {slot.dims.w}×{slot.dims.h}px
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70 hover:border-white/40 hover:text-white">
                  {slot.uploading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <ImagePlus className="h-3.5 w-3.5" />
                  )}
                  {slot.url ? "Replace" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onSlotFileChange(i)}
                    disabled={slot.uploading}
                  />
                </label>
                {slot.url ? (
                  <button
                    type="button"
                    onClick={() => onSlotRemove(i)}
                    className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-red-400"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <input
                value={slot.alt}
                onChange={(e) => onSlotAltChange(i, e.target.value)}
                placeholder="Alt text (required if image uploaded)"
                className="mt-3 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* FAQs — optional, rendered near the end of the post + FAQPage JSON-LD */}
      <div className="mt-10">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          FAQs (optional)
        </span>
        <div className="mt-3 flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={faq.key}
              className="relative rounded-2xl border border-white/10 bg-black/40 p-6"
            >
              <button
                type="button"
                aria-label="Remove FAQ"
                onClick={() => removeFaq(faq.key)}
                className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full border border-white/15 text-white/50 hover:border-red-400 hover:text-red-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex flex-col gap-4 pr-10">
                <label className="flex flex-col gap-2">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Question
                  </span>
                  <input
                    value={faq.question}
                    onChange={(e) => updateFaq(faq.key, "question", e.target.value)}
                    placeholder="What buyers ask most…"
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Answer
                  </span>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(faq.key, "answer", e.target.value)}
                    rows={4}
                    placeholder="A clear, direct answer."
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
                  />
                </label>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Move up"
                  disabled={i === 0}
                  onClick={() => moveFaq(i, -1)}
                  className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-white/50 hover:border-white/40 hover:text-white disabled:opacity-30"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  disabled={i === faqs.length - 1}
                  onClick={() => moveFaq(i, 1)}
                  className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-white/50 hover:border-white/40 hover:text-white disabled:opacity-30"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addFaq}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70 hover:border-white/40 hover:text-white"
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      {/* SEO */}
      <div className="mt-10">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          SEO
        </span>
        <div className="mt-3 flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
              SEO Title
            </span>
            <input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder={title || "Falls back to the post title if left blank"}
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
              SEO Description
            </span>
            <input
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder={excerpt || "Falls back to the post excerpt if left blank"}
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
              Keywords
            </span>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. sell my house fast, longmeadow ma real estate"
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
              Allow search engines to index this post?
            </span>
            <select
              value={indexing}
              onChange={(e) => setIndexing(e.target.value as "index" | "noindex")}
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white focus:border-gold focus:outline-none"
            >
              {INDEX_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-black">
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
              Publish Date
            </span>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white focus:border-gold focus:outline-none"
            />
            <p className="text-xs text-white/40">
              Leave this at the current time to publish immediately. Set it in the future to
              schedule — the post stays hidden on the site until that moment.
            </p>
          </label>
        </div>
      </div>

      {error ? <p className="mt-6 text-sm text-red-400">{error}</p> : null}

      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={saving !== null}
          onClick={() => save("draft")}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white hover:border-white/50 disabled:opacity-50"
        >
          {saving === "draft" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save as Draft
        </button>
        <button
          type="button"
          disabled={saving !== null}
          onClick={() => save("published")}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {saving === "published" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Publish
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
