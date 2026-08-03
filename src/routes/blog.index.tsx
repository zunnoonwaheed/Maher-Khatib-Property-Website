import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { AskMe } from "@/components/ask-me";
import { PageHero } from "@/components/page-hero";
import { BlogPostCard } from "@/components/blog-post-card";
import { getPublishedPosts, formatPostDate } from "@/lib/blog";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_URL } from "@/lib/site";

const BLOG_DESCRIPTION =
  "Straight answers on selling, buying, and investing across Massachusetts and Connecticut, from Maher Khatib.";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Blog | Maher Khatib Group",
  description: BLOG_DESCRIPTION,
  url: `${SITE_URL}/blog`,
  isPartOf: { "@type": "WebSite", name: "Maher Khatib Group", url: `${SITE_URL}/` },
};

export const Route = createFileRoute("/blog/")({
  loader: () => getPublishedPosts(),
  head: () => ({
    meta: [
      { title: "Blog | Insights for MA & CT Homeowners — Maher Khatib Group" },
      { name: "description", content: BLOG_DESCRIPTION },
      { property: "og:title", content: "Blog — Maher Khatib Group" },
      { property: "og:description", content: BLOG_DESCRIPTION },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(collectionSchema) }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { t } = useLanguage();
  const posts = Route.useLoaderData();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main className="relative bg-black">
      <SiteHeader transparentOnTop />

      <PageHero
        eyebrow={t("blog.eyebrow")}
        title={t("blog.heroTitle")}
        subtitle={t("blog.heroSubtitle")}
        media="/investment-hero.jpg"
      />

      {featured ? (
        <section className="relative bg-black pt-16 lg:pt-20">
          <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group relative block overflow-hidden rounded-3xl border border-white/10 card-lift"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0a] lg:aspect-[21/9]">
                {featured.featured_image_url ? (
                  <img
                    src={featured.featured_image_url}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-14">
                <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {featured.title}
                </h2>
                {featured.excerpt ? (
                  <p className="mt-4 max-w-xl text-white/60">{featured.excerpt}</p>
                ) : null}
                <div className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                  {formatPostDate(featured)}
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-black px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          {posts.length === 0 ? (
            <p className="py-16 text-center text-white/50">No posts yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <AskMe />
      <Footer />
    </main>
  );
}
