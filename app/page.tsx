import type { Metadata } from "next";

import { FundingTable } from "@/components/FundingTable";
import { LeadStory } from "@/components/LeadStory";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StatStrip } from "@/components/StatStrip";
import { WeeklyTicker } from "@/components/WeeklyTicker";
import { getStats, fundingRounds, latestRounds } from "@/data/fundingRounds";

export const metadata: Metadata = {
  title: "Latest AI Funding Rounds — Tracker",
  description:
    "Track the latest funding rounds raised by AI startups worldwide: amounts, stages, sectors, countries and lead investors, updated daily.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const stats = getStats(latestRounds);
  const leadStory = fundingRounds.length > 0 ? [...fundingRounds].sort((a, b) => b.amountUsd - a.amountUsd)[0] : undefined;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* 最新融资跑马灯(真实近期轮次;无数据时自动隐藏) */}
        <WeeklyTicker rounds={latestRounds} />
        {leadStory ? (
          <>
            <LeadStory round={leadStory} />
            <StatStrip stats={stats} />
            <FundingTable rounds={latestRounds} />
          </>
        ) : (
          <section className="border-b-2 border-ink">
            <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
              <p className="eyebrow">
                Frontier Rounds — funding tracker
              </p>
              <h1 className="mt-4 max-w-3xl display-xl text-ink">
                The Money Behind Frontier AI, One Round at a Time
              </h1>
              <p className="mt-5 max-w-xl border-l-2 border-rule pl-4 text-base leading-relaxed text-foreground">
                Verified funding-round data is being compiled and will appear here as soon as it is
                recorded. In the meantime, explore the investor atlas and the fundraising leaderboard.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/investors"
                  className="border border-ink bg-ink px-5 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-80"
                >
                  Investor Atlas
                </a>
                <a
                  href="/leaderboard"
                  className="border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-background"
                >
                  Fundraising Leaderboard
                </a>
                <a
                  href="/products"
                  className="border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-background"
                >
                  Product Histories
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
