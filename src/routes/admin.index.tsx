import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminNav } from "@/components/admin/admin-nav";
import { supabase } from "@/lib/supabase";
import { BLOG_POST_COLUMNS, type BlogPost } from "@/lib/blog";

function isScheduledFuture(post: BlogPost): boolean {
  return (
    post.status === "published" &&
    Boolean(post.scheduled_at) &&
    new Date(post.scheduled_at as string) > new Date()
  );
}

export const Route = createFileRoute("/admin/")({
  component: () => (
    <AdminGuard>
      <AdminPostList />
    </AdminGuard>
  ),
});

function AdminPostList() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadPosts = async () => {
    const { data, error: fetchError } = await supabase
      .from("blog_posts")
      .select(BLOG_POST_COLUMNS)
      .order("created_at", { ascending: false });
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setPosts(data ?? []);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onDelete = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeletingId(post.id);
    const { error: deleteError } = await supabase.from("blog_posts").delete().eq("id", post.id);
    setDeletingId(null);
    if (deleteError) {
      window.alert(`Failed to delete: ${deleteError.message}`);
      return;
    }
    setPosts((prev) => prev?.filter((p) => p.id !== post.id) ?? null);
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <main className="min-h-screen bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                Admin
              </span>
            </div>
            <h1 className="mt-4 font-serif text-4xl text-white">Blog Posts</h1>
          </div>
          <div className="flex flex-col items-end gap-3">
            <AdminNav />
            <div className="flex items-center gap-3">
              <Link
                to="/admin/posts/new"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5"
              >
                <Plus className="h-4 w-4" /> New Post
              </Link>
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70 hover:border-white/40 hover:text-white"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
          {error ? (
            <p className="p-8 text-sm text-red-400">{error}</p>
          ) : posts === null ? (
            <p className="p-8 text-sm text-white/50">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="p-8 text-sm text-white/50">
              No posts yet — click "New Post" to write your first one.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  const scheduled = isScheduledFuture(post);
                  return (
                    <tr key={post.id} className="border-b border-white/5 last:border-0">
                      <td className="px-6 py-4 font-serif text-lg text-white">{post.title}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${
                            scheduled
                              ? "bg-blue-400/20 text-blue-300"
                              : post.status === "published"
                                ? "bg-gold/20 text-gold"
                                : "bg-white/10 text-white/60"
                          }`}
                        >
                          {scheduled ? "Scheduled" : post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/50">
                        {scheduled
                          ? new Date(post.scheduled_at as string).toLocaleString()
                          : new Date(post.published_at ?? post.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to="/admin/posts/$id/edit"
                            params={{ id: post.id }}
                            aria-label="Edit"
                            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:border-gold hover:text-gold"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            aria-label="Delete"
                            disabled={deletingId === post.id}
                            onClick={() => onDelete(post)}
                            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:border-red-400 hover:text-red-400 disabled:opacity-40"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
