import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAdminSession } from "@/lib/use-admin-session";

export function AdminGuard({ children }: { children: ReactNode }) {
  const { session, loading } = useAdminSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="grid min-h-screen place-items-center bg-black">
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">Loading…</span>
      </div>
    );
  }

  return <>{children}</>;
}
