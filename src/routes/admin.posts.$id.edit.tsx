import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminNav } from "@/components/admin/admin-nav";
import { PostEditorForm } from "@/components/admin/post-editor-form";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/lib/blog";

export const Route = createFileRoute("/admin/posts/$id/edit")({
  component: () => (
    <AdminGuard>
      <EditPostPage />
    </AdminGuard>
  ),
});

function EditPostPage() {
  const { id } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    supabase
      .from("blog_posts")
      .select(
        "id, title, slug, excerpt, content, featured_image_url, status, published_at, created_at",
      )
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setPost(data);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto mb-10 flex max-w-3xl items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Admin
            </span>
          </div>
          <h1 className="mt-4 font-serif text-4xl text-white">Edit Post</h1>
        </div>
        <AdminNav />
      </div>

      {post === undefined ? (
        <p className="text-center text-sm text-white/50">Loading…</p>
      ) : post === null ? (
        <p className="text-center text-sm text-red-400">Post not found.</p>
      ) : (
        <PostEditorForm key={post.id} initialPost={post} />
      )}
    </main>
  );
}
