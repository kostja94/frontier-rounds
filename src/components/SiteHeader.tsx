import Link from "next/link";

import { SiteNav } from "@/components/SiteNav";

export type Crumb = { label: string; to?: string };

export function SiteHeader({ breadcrumb = [] }: { breadcrumb?: Crumb[] }) {
  return (
    <header className="border-b border-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link href="/" className="group inline-block">
          <span className="font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-accent">
            Frontier Rounds
          </span>
          <span className="ml-2 hidden text-sm text-muted-foreground sm:inline">
            — AI funding intelligence
          </span>
        </Link>
        <SiteNav />
      </div>
      {breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="border-t border-rule">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-2 text-[11px] uppercase tracking-label text-muted-foreground md:px-10">
            <Link href="/" className="text-ink transition-colors hover:text-accent">
              Home
            </Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-2">
                <span>/</span>
                {crumb.to ? (
                  <Link href={crumb.to} className="text-ink transition-colors hover:text-accent">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
