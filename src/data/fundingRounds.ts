export type FundingRound = {
  id: string;
  company: string;
  round: string;
  amountUsd: number;
  date: string;
  country: string;
  sector: string;
  leadInvestor: string;
  note?: string;
};

export const fundingRounds: FundingRound[] = [
  {
    id: "1",
    company: "Helion Labs",
    round: "Series E",
    amountUsd: 1_200_000_000,
    date: "2026-08-06",
    country: "United States",
    sector: "Foundation Models",
    leadInvestor: "Thrive Capital",
    note: "Frontier reasoning models trained on a purpose-built inference fabric.",
  },
  { id: "2", company: "Mistral Forge", round: "Series C", amountUsd: 640_000_000, date: "2026-08-06", country: "France", sector: "Open Models", leadInvestor: "Index Ventures" },
  { id: "3", company: "Quanta Vision", round: "Series B", amountUsd: 310_000_000, date: "2026-08-05", country: "United Kingdom", sector: "Computer Vision", leadInvestor: "Balderton Capital" },
  { id: "4", company: "Silica Compute", round: "Series D", amountUsd: 500_000_000, date: "2026-08-05", country: "United States", sector: "AI Infrastructure", leadInvestor: "Lightspeed" },
  { id: "5", company: "Nakama AI", round: "Series A", amountUsd: 72_000_000, date: "2026-08-05", country: "Japan", sector: "Agents", leadInvestor: "SoftBank Vision Fund" },
  { id: "6", company: "Verdant Bio", round: "Series B", amountUsd: 185_000_000, date: "2026-08-04", country: "Switzerland", sector: "AI for Drug Discovery", leadInvestor: "Sofinnova Partners" },
  { id: "7", company: "Ledgerly", round: "Seed", amountUsd: 9_500_000, date: "2026-08-04", country: "Singapore", sector: "Fintech AI", leadInvestor: "Sequoia SEA" },
  { id: "8", company: "Tensor Harbor", round: "Series A", amountUsd: 45_000_000, date: "2026-08-04", country: "Canada", sector: "MLOps", leadInvestor: "Radical Ventures" },
  { id: "9", company: "Kalpa Robotics", round: "Series C", amountUsd: 220_000_000, date: "2026-08-03", country: "India", sector: "Embodied AI", leadInvestor: "Peak XV Partners" },
  { id: "10", company: "Aurora Speech", round: "Seed", amountUsd: 6_200_000, date: "2026-08-03", country: "Germany", sector: "Voice AI", leadInvestor: "Cherry Ventures" },
  { id: "11", company: "Northlight Legal", round: "Series A", amountUsd: 38_000_000, date: "2026-08-03", country: "United States", sector: "Legal AI", leadInvestor: "Bessemer Venture Partners" },
  { id: "12", company: "Fathom Ocean", round: "Series B", amountUsd: 120_000_000, date: "2026-08-02", country: "Norway", sector: "Climate AI", leadInvestor: "Northzone" },
  { id: "13", company: "Cerebra Health", round: "Series D", amountUsd: 410_000_000, date: "2026-08-02", country: "United States", sector: "Healthcare AI", leadInvestor: "General Catalyst" },
  { id: "14", company: "Lumen Grid", round: "Series A", amountUsd: 54_000_000, date: "2026-08-02", country: "Netherlands", sector: "Energy AI", leadInvestor: "Atomico" },
  { id: "15", company: "Zhipu Frontier", round: "Series C", amountUsd: 400_000_000, date: "2026-08-01", country: "China", sector: "Foundation Models", leadInvestor: "Hillhouse Investment" },
  { id: "16", company: "Praxis Chip", round: "Series B", amountUsd: 260_000_000, date: "2026-08-01", country: "Israel", sector: "AI Silicon", leadInvestor: "Pitango" },
  { id: "17", company: "Vela Retail", round: "Seed", amountUsd: 4_800_000, date: "2026-08-01", country: "Brazil", sector: "Commerce AI", leadInvestor: "Kaszek" },
  { id: "18", company: "Arclight Security", round: "Series B", amountUsd: 145_000_000, date: "2026-07-31", country: "United States", sector: "Security AI", leadInvestor: "Accel" },
  { id: "19", company: "Meridian Docs", round: "Series A", amountUsd: 31_000_000, date: "2026-07-31", country: "Australia", sector: "Enterprise Search", leadInvestor: "Blackbird Ventures" },
  { id: "20", company: "Halcyon Audio", round: "Seed", amountUsd: 7_500_000, date: "2026-07-31", country: "Sweden", sector: "Generative Media", leadInvestor: "EQT Ventures" },
  { id: "21", company: "Orbital Terra", round: "Series C", amountUsd: 195_000_000, date: "2026-07-30", country: "United States", sector: "Geospatial AI", leadInvestor: "Founders Fund" },
  { id: "22", company: "Ubuntu Lingua", round: "Seed", amountUsd: 5_400_000, date: "2026-07-30", country: "Kenya", sector: "Language AI", leadInvestor: "TLcom Capital" },
  { id: "23", company: "Kestrel Freight", round: "Series B", amountUsd: 98_000_000, date: "2026-07-30", country: "United Arab Emirates", sector: "Logistics AI", leadInvestor: "Mubadala Capital" },
  { id: "24", company: "Foundry Synth", round: "Series A", amountUsd: 60_000_000, date: "2026-07-29", country: "United States", sector: "Synthetic Data", leadInvestor: "Kleiner Perkins" },
  { id: "25", company: "Polaris Tutor", round: "Seed", amountUsd: 11_000_000, date: "2026-07-29", country: "South Korea", sector: "Education AI", leadInvestor: "Hashed Ventures" },
];

export function formatUsd(amount: number): string {
  if (amount >= 1_000_000_000) {
    const value = amount / 1_000_000_000;
    return `$${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)}B`;
  }
  return `$${Math.round(amount / 1_000_000)}M`;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  const upper = sorted[mid] ?? 0;
  const lower = sorted[mid - 1] ?? upper;
  return sorted.length % 2 === 0 ? (lower + upper) / 2 : upper;
}

export function getStats(rounds: FundingRound[]) {
  const total = rounds.reduce((sum, r) => sum + r.amountUsd, 0);
  const investorCounts = new Map<string, number>();
  for (const r of rounds) {
    investorCounts.set(r.leadInvestor, (investorCounts.get(r.leadInvestor) ?? 0) + 1);
  }
  const mostActive = [...investorCounts.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  )[0];

  return {
    total,
    deals: rounds.length,
    medianRound: median(rounds.map((r) => r.amountUsd)),
    mostActiveInvestor: mostActive?.[0] ?? "—",
    mostActiveInvestorDeals: mostActive?.[1] ?? 0,
    countries: new Set(rounds.map((r) => r.country)).size,
  };
}

export const latestRounds = fundingRounds;

export const leadStory: FundingRound = [...fundingRounds].sort(
  (a, b) => b.amountUsd - a.amountUsd,
)[0]!;
