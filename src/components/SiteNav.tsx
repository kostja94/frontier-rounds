"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Latest Rounds", href: "/", exact: true },
  { label: "Funding Leaderboard", href: "/leaderboard", exact: false },
  { label: "Investor Atlas", href: "/investors", exact: false },
  { label: "Product Histories", href: "/products", exact: false },
];

export function SiteNav() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={
                isActive(item.href, item.exact)
                  ? "underline decoration-1 underline-offset-4 text-ink transition-colors hover:text-accent"
                  : "text-ink transition-colors hover:text-accent"
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="whitespace-nowrap">Foundation Models</li>
        <li className="whitespace-nowrap">Infrastructure</li>
        <li className="whitespace-nowrap">Applications</li>
      </ul>
    </nav>
  );
}
