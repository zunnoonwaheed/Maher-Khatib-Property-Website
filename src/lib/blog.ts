import { supabase } from "@/lib/supabase";

export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  alt_text: string | null;
  image_1_url: string | null;
  image_1_alt: string | null;
  image_2_url: string | null;
  image_2_alt: string | null;
  image_3_url: string | null;
  image_3_alt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  keywords: string | null;
  noindex: boolean;
  scheduled_at: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string;
};

export type Faq = {
  id: string;
  post_id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export type BlogPostWithFaqs = BlogPost & { faqs: Faq[] };

export const BLOG_POST_COLUMNS =
  "id, title, slug, excerpt, content, featured_image_url, alt_text, image_1_url, image_1_alt, image_2_url, image_2_alt, image_3_url, image_3_alt, seo_title, seo_description, keywords, noindex, scheduled_at, status, published_at, created_at" as const;

// A post is publicly visible once it's published AND, if scheduled, its
// scheduled_at time has passed — applied identically to the index and the
// single-post fetch so a scheduled post can't be reached early via direct URL.
const visibleNowFilter = () => `scheduled_at.is.null,scheduled_at.lte.${new Date().toISOString()}`;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(BLOG_POST_COLUMNS)
    .eq("status", "published")
    .or(visibleNowFilter())
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPostWithFaqs | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(BLOG_POST_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .or(visibleNowFilter())
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const faqs = await getFaqsForPost(data.id);
  return { ...data, faqs };
}

export async function getFaqsForPost(postId: string): Promise<Faq[]> {
  const { data, error } = await supabase
    .from("faqs")
    .select("id, post_id, question, answer, sort_order")
    .eq("post_id", postId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export function formatPostDate(post: Pick<BlogPost, "published_at" | "created_at">): string {
  const date = new Date(post.published_at ?? post.created_at);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
