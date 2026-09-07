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

// 真实融资数据录入前，暂为空数组。
// 原 Lovable 演示用的 25 条虚构轮次（Helion Labs / Mistral Forge / Quanta Vision 等）已于 2026-09-07 移除。
export const fundingRounds: FundingRound[] = [];

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
