import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CriteriaGrid } from "@/components/leaderboard/CriteriaGrid";
import { FundingScaleChart } from "@/components/leaderboard/FundingScaleChart";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { MethodNote } from "@/components/leaderboard/MethodNote";
import {
  formatUsd,
  fundingLeaderboard,
  getLeaderboardStats,
} from "@/data/fundingLeaderboard";

export const metadata: Metadata = {
  title: "AI Funding Leaderboard",
  description:
    "Ranked list of the world's best-funded AI companies by total capital raised and largest single round, with sources, valuations and lead investors.",
  alternates: { canonical: "/leaderboard" },
};

export default function LeaderboardPage() {
  const stats = getLeaderboardStats(fundingLeaderboard);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Funding Leaderboard",
    itemListElement: fundingLeaderboard.slice(0, 10).map((entry, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: entry.name,
      url: `/leaderboard#${entry.id}`,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What counts as AI funding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We count equity and strategic investment rounds for companies whose core product or R&D is machine-learning driven.",
        },
      },
      {
        "@type": "Question",
        name: "Why are some numbers tagged 'Reported' or 'Estimated'?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Disclosed means the company published the amount. Reported means a credible publication cited sources. Estimated means the figure is derived from analyst or market data.",
        },
      },
      {
        "@type": "Question",
        name: "How often is the leaderboard updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Major rounds are added within 24–48 hours of announcement and the full set is reviewed weekly.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <SiteHeader breadcrumb={[{ label: "Funding Leaderboard" }]} />

      <main className="animate-fade-up">
        <section className="border-b-2 border-ink">
          <div className="page-shell">
            <h1 className="max-w-4xl display-xl text-ink">
              The AI Companies That Raised the Most, Ranked
            </h1>
            <p className="mt-5 max-w-2xl border-l-2 border-rule pl-4 text-base leading-relaxed text-foreground">
              A running tally of the best-funded artificial-intelligence startups and labs worldwide,
              sorted by total disclosed capital and by the size of their largest round. Every figure
              is sourced and tagged so you can judge the confidence behind it.
            </p>
          </div>
        </section>

        <CriteriaGrid />

        <LeaderboardTable entries={fundingLeaderboard} />

        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-10">
            <div className="grid gap-6 border border-ink bg-rule/30 px-6 py-6 md:grid-cols-4 md:px-8 md:py-8">
              <div>
                <dt className="eyebrow">
                  Total capital on list
                </dt>
                <dd className="mt-1.5 font-display text-3xl tracking-tight text-ink">
                  {formatUsd(stats.total)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">
                  Companies ranked
                </dt>
                <dd className="mt-1.5 font-display text-3xl tracking-tight text-ink">
                  {stats.dealCount}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">
                  Median total raised
                </dt>
                <dd className="mt-1.5 font-display text-3xl tracking-tight text-ink">
                  {formatUsd(stats.medianTotal)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">
                  Most active lead
                </dt>
                <dd className="mt-1.5 font-display text-2xl tracking-tight text-ink md:text-3xl">
                  {stats.mostActiveLead ? (
                    stats.mostActiveLead.slug ? (
                      <Link
                        href={`/investors/${stats.mostActiveLead.slug}`}
                        className="border-b border-ink transition-colors hover:text-accent"
                      >
                        {stats.mostActiveLead.name}
                      </Link>
                    ) : (
                      <span>{stats.mostActiveLead.name}</span>
                    )
                  ) : (
                    <span>—</span>
                  )}
                </dd>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stats.mostActiveLeadCount} entries
                </p>
              </div>
            </div>
          </div>
        </section>

        <FundingScaleChart entries={fundingLeaderboard} />

        <MethodNote />
      </main>

      <SiteFooter />
    </div>
  );
}
