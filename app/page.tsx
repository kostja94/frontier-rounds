import type { Metadata } from "next";

import { FundingTable } from "@/components/FundingTable";
import { LeadStory } from "@/components/LeadStory";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StatStrip } from "@/components/StatStrip";
import { getStats, latestRounds, leadStory } from "@/data/fundingRounds";

export const metadata: Metadata = {
  title: "Latest AI Funding Rounds — Tracker",
  description:
    "Track the latest funding rounds raised by AI startups worldwide: amounts, stages, sectors, countries and lead investors, updated daily.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const stats = getStats(latestRounds);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <LeadStory round={leadStory} />
        <StatStrip stats={stats} />
        <FundingTable rounds={latestRounds} />
      </main>
      <SiteFooter />
    </div>
  );
}
