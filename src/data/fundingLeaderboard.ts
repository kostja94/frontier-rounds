import { formatDate as baseFormatDate, formatUsd as baseFormatUsd } from "./fundingRounds";
import rawLeaderboard from "./fundingLeaderboard.json";

export type FundingTier = "Disclosed" | "Reported" | "Estimated";

export type FundingLead = {
  name: string;
  slug?: string | undefined;
};

export type FundingLeaderboardEntry = {
  id: string;
  name: string;
  logo?: string | undefined;
  country: string;
  sector: string;
  totalRaisedUsd: number;
  largestRoundUsd: number;
  roundLabel: string;
  date: string;
  valuation?: number | undefined;
  leads: FundingLead[];
  source: string;
  sourceUrl: string;
  tier: FundingTier;
};

// 内容数据迁移至 JSON（2026-09-08）：见 fundingLeaderboard.json
// 结构完整性由 scripts/validate-content 在 CI/本地校验（含 tier/slug/logo 规则）
export const fundingLeaderboard: FundingLeaderboardEntry[] = rawLeaderboard as FundingLeaderboardEntry[];

export function formatUsd(amount: number): string {
  return baseFormatUsd(amount);
}

export function formatDate(iso: string): string {
  return baseFormatDate(iso);
}

export function getLeaderboardByTotal(entries = fundingLeaderboard): FundingLeaderboardEntry[] {
  return [...entries].sort((a, b) => b.totalRaisedUsd - a.totalRaisedUsd);
}

export function getLeaderboardByLargestRound(entries = fundingLeaderboard): FundingLeaderboardEntry[] {
  return [...entries].sort((a, b) => b.largestRoundUsd - a.largestRoundUsd);
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1]! + sorted[mid]!) / 2;
  }
  return sorted[mid]!;
}

export function getLeaderboardStats(entries = fundingLeaderboard) {
  const total = entries.reduce((sum, e) => sum + e.totalRaisedUsd, 0);
  const dealCount = entries.length;
  const medianTotal = median(entries.map((e) => e.totalRaisedUsd));

  const leadCounts = new Map<string, FundingLead>();
  const leadFrequency = new Map<string, number>();
  for (const entry of entries) {
    for (const l of entry.leads) {
      leadCounts.set(l.name, l);
      leadFrequency.set(l.name, (leadFrequency.get(l.name) ?? 0) + 1);
    }
  }
  const mostActive = [...leadFrequency.entries()].sort((a, b) => b[1] - a[1])[0];

  return {
    total,
    dealCount,
    medianTotal,
    mostActiveLead: mostActive ? leadCounts.get(mostActive[0]) : undefined,
    mostActiveLeadCount: mostActive ? mostActive[1] : 0,
  };
}
