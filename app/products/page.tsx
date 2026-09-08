import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { productProfiles } from "@/data/products";
import { formatRoundDate, formatUsdCompact } from "@/lib/format";

export const metadata: Metadata = {
  title: "Product Histories — Company Funding Timelines",
  description:
    "Per-product funding histories for AI companies: every disclosed round, valuation step, and investor, from earliest days to the latest raise.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader breadcrumb={[{ label: "Product Histories" }]} />

      <main className="animate-fade-up">
        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
            <p className="text-[11px] uppercase tracking-[0.24em] text-accent">Reference</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-ink md:text-6xl">
              Product Histories
            </h2>
            <p className="mt-5 max-w-2xl border-l-2 border-rule pl-4 text-base leading-relaxed text-foreground">
              A growing set of per-product funding timelines. Unlike the leaderboard&apos;s snapshot,
              each page walks through a company&apos;s rounds one by one — amounts, valuations, leads
              and participants — plus the narrative that connects them.
            </p>
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <div className="flex gap-2">
                <dt>Profiles</dt>
                <dd className="text-ink">{productProfiles.length}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Disclosed rounds</dt>
                <dd className="text-ink">
                  {productProfiles.reduce((sum, p) => sum + p.rounds.length, 0)}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-10">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Profiles</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {productProfiles.map((profile) => {
                const latest = profile.rounds[profile.rounds.length - 1];
                const totalRaised = profile.rounds.reduce(
                  (sum, r) => sum + (r.amountUsd ?? 0),
                  0,
                );
                return (
                  <li key={profile.slug} className="border-t border-rule pt-3">
                    <Link href={`/products/${profile.slug}`} className="group block">
                      {profile.logo && (
                        <img
                          src={profile.logo}
                          alt={`${profile.name} logo`}
                          loading="lazy"
                          className="mb-2 h-8 w-auto object-contain"
                        />
                      )}
                      <span className="font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-accent">
                        {profile.name}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                        {profile.tagline}
                      </span>
                      {latest && (
                        <span className="mt-2 block text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                          {latest.label} · {latest.amountUsd ? formatUsdCompact(latest.amountUsd) : "—"} ·{" "}
                          {formatRoundDate(latest.date)} · {formatUsdCompact(totalRaised)} total
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
