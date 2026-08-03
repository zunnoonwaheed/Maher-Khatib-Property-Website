import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminNav } from "@/components/admin/admin-nav";
import { PostEditorForm } from "@/components/admin/post-editor-form";

export const Route = createFileRoute("/admin/posts/new")({
  component: () => (
    <AdminGuard>
      <main className="min-h-screen bg-black px-6 py-16 lg:px-12">
        <div className="mx-auto mb-10 flex max-w-3xl items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/70" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
                Admin
              </span>
            </div>
            <h1 className="mt-4 font-serif text-4xl text-white">New Post</h1>
          </div>
          <AdminNav />
        </div>
        <PostEditorForm />
      </main>
    </AdminGuard>
  ),
});
