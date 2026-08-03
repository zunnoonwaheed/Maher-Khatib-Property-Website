import { supabase } from "@/lib/supabase";

export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string;
};

const LIST_COLUMNS =
  "id, title, slug, excerpt, content, featured_image_url, status, published_at, created_at";

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(LIST_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(LIST_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data;
}

export function formatPostDate(post: Pick<BlogPost, "published_at" | "created_at">): string {
  const date = new Date(post.published_at ?? post.created_at);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
