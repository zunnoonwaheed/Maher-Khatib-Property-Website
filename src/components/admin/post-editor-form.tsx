import { useState, type ChangeEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, ImagePlus, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { BlogPost } from "@/lib/blog";

type Props = {
  initialPost?: BlogPost;
};

export function PostEditorForm({ initialPost }: Props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost));
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(initialPost?.featured_image_url ?? "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      const path = `${crypto.randomUUID()}-${file.name}`;
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

  const save = async (status: "draft" | "published") => {
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

    setSaving(status);
    setError(null);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      featured_image_url: featuredImageUrl || null,
      status,
    };

    const { error: saveError } = initialPost
      ? await supabase.from("blog_posts").update(payload).eq("id", initialPost.id)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(null);

    if (saveError) {
      setError(saveError.message);
      return;
    }

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
