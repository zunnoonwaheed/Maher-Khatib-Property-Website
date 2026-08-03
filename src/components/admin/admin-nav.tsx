import { Link, useRouterState } from "@tanstack/react-router";

const ITEMS = [
  {
    label: "Posts",
    to: "/admin" as const,
    match: (p: string) => p === "/admin" || p.startsWith("/admin/posts"),
  },
  {
    label: "Listings",
    to: "/admin/listings" as const,
    match: (p: string) => p.startsWith("/admin/listings"),
  },
];

export function AdminNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex items-center gap-2">
      {ITEMS.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`rounded-full px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors ${
              active ? "bg-gold text-black" : "text-white/60 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
