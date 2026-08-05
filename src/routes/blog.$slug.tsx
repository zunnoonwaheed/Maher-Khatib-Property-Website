import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { AskMe } from "@/components/ask-me";
import { BlogPostBody } from "@/components/blog-post-body";
import { BlogFaqs } from "@/components/blog-faqs";
import { getPublishedPostBySlug, formatPostDate } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPublishedPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const post = loaderData;
    const path = `/blog/${post.slug}`;
    const publishedAt = post.published_at ?? post.created_at;
    const seoTitle = post.seo_title || post.title;
    const seoDescription = post.seo_description || post.excerpt || "";

    const meta = [
      { title: seoTitle },
      { name: "description", content: seoDescription },
      { property: "og:title", content: seoTitle },
      { property: "og:description", content: seoDescription },
      { property: "og:type", content: "article" },
    ];
    if (post.keywords) {
      meta.push({ name: "keywords", content: post.keywords });
    }
    if (post.noindex) {
      meta.push({ name: "robots", content: "noindex" });
    }
    if (post.featured_image_url) {
      meta.push({ property: "og:image", content: post.featured_image_url });
    }

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt ?? undefined,
      image: post.featured_image_url ? [post.featured_image_url] : undefined,
      datePublished: publishedAt,
      dateModified: publishedAt,
      author: { "@type": "Person", name: "Maher Khatib" },
      publisher: {
        "@type": "Organization",
        name: "Maher Khatib Group",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}${path}` },
      ],
    };

    const scripts = [
      { type: "application/ld+json", children: JSON.stringify(articleSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
    ];

    if (post.faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      };
      scripts.push({ type: "application/ld+json", children: JSON.stringify(faqSchema) });
    }

    return { meta, scripts };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();

  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      {/* Hero — full-width featured image, same treatment as listing heroes */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-black">
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url}
            alt={post.alt_text || post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-16 pt-40 lg:px-12 lg:pb-20 lg:pt-48">
          <h1 className="max-w-4xl font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
            {post.title}
          </h1>
          <div className="mt-8 text-[0.7rem] uppercase tracking-[0.28em] text-white/60">
            {formatPostDate(post)}
          </div>
        </div>
      </section>

      <section className="bg-black py-24 lg:py-32">
        <div className="mx-auto max-w-[800px] px-6 lg:px-12">
          <BlogPostBody
            html={post.content}
            images={[
              { url: post.image_1_url ?? "", alt: post.image_1_alt ?? "" },
              { url: post.image_2_url ?? "", alt: post.image_2_alt ?? "" },
              { url: post.image_3_url ?? "", alt: post.image_3_alt ?? "" },
            ]}
          />
          <BlogFaqs faqs={post.faqs} />
        </div>
      </section>

      <AskMe />
      <Footer />
    </main>
  );
}
