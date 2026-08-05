import { supabase } from "@/lib/supabase";

export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  title_es: string | null;
  slug: string;
  excerpt: string | null;
  excerpt_es: string | null;
  content: string;
  content_es: string | null;
  featured_image_url: string | null;
  alt_text: string | null;
  image_1_url: string | null;
  image_1_alt: string | null;
  image_2_url: string | null;
  image_2_alt: string | null;
  image_3_url: string | null;
  image_3_alt: string | null;
  seo_title: string | null;
  seo_title_es: string | null;
  seo_description: string | null;
  seo_description_es: string | null;
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
  question_es: string | null;
  answer: string;
  answer_es: string | null;
  sort_order: number;
};

export type BlogPostWithFaqs = BlogPost & { faqs: Faq[] };

export const BLOG_POST_COLUMNS =
  "id, title, title_es, slug, excerpt, excerpt_es, content, content_es, featured_image_url, alt_text, image_1_url, image_1_alt, image_2_url, image_2_alt, image_3_url, image_3_alt, seo_title, seo_title_es, seo_description, seo_description_es, keywords, noindex, scheduled_at, status, published_at, created_at" as const;

type Lang = "en" | "es";

export function localizedTitle(post: Pick<BlogPost, "title" | "title_es">, language: Lang): string {
  return (language === "es" && post.title_es) || post.title;
}

export function localizedExcerpt(
  post: Pick<BlogPost, "excerpt" | "excerpt_es">,
  language: Lang,
): string | null {
  return (language === "es" && post.excerpt_es) || post.excerpt;
}

export function localizedContent(
  post: Pick<BlogPost, "content" | "content_es">,
  language: Lang,
): string {
  return (language === "es" && post.content_es) || post.content;
}

export function localizedSeoTitle(
  post: Pick<BlogPost, "title" | "title_es" | "seo_title" | "seo_title_es">,
  language: Lang,
): string {
  if (language === "es") return post.seo_title_es || post.title_es || post.seo_title || post.title;
  return post.seo_title || post.title;
}

export function localizedSeoDescription(
  post: Pick<BlogPost, "excerpt" | "excerpt_es" | "seo_description" | "seo_description_es">,
  language: Lang,
): string {
  if (language === "es") {
    return post.seo_description_es || post.excerpt_es || post.seo_description || post.excerpt || "";
  }
  return post.seo_description || post.excerpt || "";
}

export function localizedQuestion(
  faq: Pick<Faq, "question" | "question_es">,
  language: Lang,
): string {
  return (language === "es" && faq.question_es) || faq.question;
}

export function localizedAnswer(faq: Pick<Faq, "answer" | "answer_es">, language: Lang): string {
  return (language === "es" && faq.answer_es) || faq.answer;
}

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

export const FAQ_COLUMNS =
  "id, post_id, question, question_es, answer, answer_es, sort_order" as const;

export async function getFaqsForPost(postId: string): Promise<Faq[]> {
  const { data, error } = await supabase
    .from("faqs")
    .select(FAQ_COLUMNS)
    .eq("post_id", postId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export function formatPostDate(post: Pick<BlogPost, "published_at" | "created_at">): string {
  const date = new Date(post.published_at ?? post.created_at);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
