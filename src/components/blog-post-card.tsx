import { Link } from "@tanstack/react-router";
import { formatPostDate, type BlogPost } from "@/lib/blog";

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] card-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl leading-snug text-white transition-colors group-hover:text-gold">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/55">{post.excerpt}</p>
        ) : null}
        <div className="mt-auto pt-6 text-[0.65rem] uppercase tracking-[0.2em] text-white/45">
          {formatPostDate(post)}
        </div>
      </div>
    </Link>
  );
}
