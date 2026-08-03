import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAdminSession } from "@/lib/use-admin-session";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { session, loading } = useAdminSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session) {
      navigate({ to: "/admin" });
    }
  }, [loading, session, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-black px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f0f0f] p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold/70" />
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
            Admin
          </span>
        </div>
        <h1 className="mt-6 font-serif text-3xl text-white">Sign In</h1>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-serif text-lg text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
              Password
            </span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-serif text-lg text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-9 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50"
          >
            Sign In
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </main>
  );
}
