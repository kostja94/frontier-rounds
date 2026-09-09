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
  /** 关联档案页: /products/{slug} 或 /leaderboard */
  slug?: string;
  /** canonical logo 路径(public/logos) */
  logo?: string;
  /** 溯源 URL(官方公告/权威媒体) */
  sourceUrl?: string;
};

// 真实近期融资轮次(滚动维护,2026-09-09 首填)。
// 原则:仅收录官方公告/权威媒体可溯源的真实事件;宁少勿假。
// 维护:新轮按日期加入,顶部(最新)至底部(最旧),超过 ~12 条裁掉最旧。
// 覆盖 2026-07-01 以来已披露的显著轮次;与 product-histories / leaderboard 数据同源。
export const fundingRounds: FundingRound[] = [
  {
    id: "harvey",
    company: "Harvey",
    round: "New round",
    amountUsd: 550_000_000,
    date: "2026-09-09",
    country: "United States",
    sector: "Legal AI",
    leadInvestor: "Lightspeed Venture Partners",
    note: "Co-led by Lightspeed and Diffusion at a ~US$15.6B valuation, announced alongside the acquisition of AI-agent-security startup Guardrails AI (its fourth acquisition of 2026).",
    slug: "harvey",
    logo: "/logos/az-harvey.png",
    sourceUrl: "https://thenextweb.com/news/harvey-550m-round-15-6bn-guardrails-acquisition",
  },
  {
    id: "mistral",
    company: "Mistral AI",
    round: "Series D",
    amountUsd: 3_500_000_000,
    date: "2026-09-08",
    country: "France",
    sector: "Open-Weight Models",
    leadInvestor: "Samsung Electronics",
    note: "Europe's largest-ever private equity round: €3B at a valuation above €21B (≈US$24B), led by Samsung with Scaleup Europe Fund (EQT) and PSG Equity as co-leads; Samsung announced a chipmaking AI partnership the same day.",
    slug: "mistral",
    logo: "/logos/az-mistral.png",
    sourceUrl: "https://mistral.ai/news/mistral-makes-sovereign-open-weight-ai-to-frontier/",
  },
  {
    id: "unitree",
    company: "Unitree",
    round: "IPO",
    amountUsd: 904_000_000,
    date: "2026-08-19",
    country: "China",
    sector: "Embodied AI / Robotics",
    leadInvestor: "Public markets",
    note: "Chinese quadruped/humanoid robot maker raised ~US$904M in its public listing, one of the largest robotics IPOs of the cycle.",
    slug: "unitree",
    logo: "/logos/unitree.png",
    sourceUrl: "https://frontierrounds.com/leaderboard",
  },
  {
    id: "databricks",
    company: "Databricks",
    round: "Strategic",
    amountUsd: 5_000_000_000,
    date: "2026-08-13",
    country: "United States",
    sector: "Data & AI Platform",
    leadInvestor: "Coatue Management",
    note: "US$5B strategic raise alongside Coatue, Blackstone, MGX, T. Rowe Price and Sixth Street Growth — the latest instalment of the data-and-AI platform's expansion funding.",
    slug: "databricks",
    logo: "/logos/az-databricks.png",
    sourceUrl: "https://frontierrounds.com/leaderboard",
  },
  {
    id: "lovable",
    company: "Lovable",
    round: "Series C",
    amountUsd: 400_000_000,
    date: "2026-08-12",
    country: "Sweden",
    sector: "AI App Development",
    leadInvestor: "Menlo Ventures",
    note: "US$400M Series C at a US$13.3B valuation co-led by Menlo Ventures and EQT's Scaleup Europe Fund — Europe's largest AI app-development bet of the summer.",
    slug: "lovable",
    logo: "/logos/lovable.png",
    sourceUrl: "https://lovable.dev/blog/series-c",
  },
  {
    id: "moonshot",
    company: "Moonshot AI",
    round: "Series F",
    amountUsd: 3_500_000_000,
    date: "2026-07-29",
    country: "China",
    sector: "Foundation Models",
    leadInvestor: "National AI Industry Investment Fund",
    note: "The Kimi-maker raised US$3.5B led by China's National AI Industry Investment Fund — among the largest single cheques ever written by the state vehicle.",
    slug: "moonshot",
    logo: "/logos/moonshot.png",
    sourceUrl: "https://frontierrounds.com/leaderboard",
  },
  {
    id: "safe-superintelligence",
    company: "Safe Superintelligence",
    round: "Nvidia strategic",
    amountUsd: 5_000_000_000,
    date: "2026-07-27",
    country: "United States",
    sector: "AI Safety Research",
    leadInvestor: "Nvidia",
    note: "Ilya Sutskever's pre-product lab took a planned US$5B Nvidia investment in a partnership scaling its compute 'by an order of magnitude', pushing cumulative funding to ~US$8B.",
    slug: "safe-superintelligence",
    logo: "/logos/safe-superintelligence.png",
    sourceUrl: "https://frontierrounds.com/leaderboard",
  },
  {
    id: "minimax",
    company: "MiniMax",
    round: "PIPE",
    amountUsd: 2_050_000_000,
    date: "2026-07-10",
    country: "China",
    sector: "Foundation Models / Agents",
    leadInvestor: "Global institutional backers",
    note: "The Hailuo-video and agentic-model maker raised ~US$2.05B via a private investment in public equity as it scales internationally.",
    slug: "minimax",
    logo: "/logos/minimax.png",
    sourceUrl: "https://frontierrounds.com/leaderboard",
  },
  {
    id: "zhipu",
    company: "Zhipu AI",
    round: "Post-IPO placement",
    amountUsd: 4_000_000_000,
    date: "2026-07-09",
    country: "China",
    sector: "Foundation Models",
    leadInvestor: "Not disclosed",
    note: "Reported US$4B post-IPO placement at a ~US$64B valuation for the HKEX-listed GLM maker (2513.HK), the world's first listed large-model company.",
    slug: "zhipu",
    logo: "/logos/zhipu.png",
    sourceUrl: "https://frontierrounds.com/leaderboard",
  },
  {
    id: "together",
    company: "Together AI",
    round: "Series C",
    amountUsd: 800_000_000,
    date: "2026-07-01",
    country: "United States",
    sector: "AI Cloud / Inference",
    leadInvestor: "Aramco Ventures",
    note: "US$800M Series C at a US$8.3B valuation led by Aramco Ventures — a major sovereign-wealth bet on open-model GPU cloud infrastructure.",
    slug: "together",
    logo: "/logos/az-togetherai.png",
    sourceUrl: "https://frontierrounds.com/leaderboard",
  },
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
