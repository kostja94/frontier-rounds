import { leaderboardLogos } from "./investors/leaderboardLogos";
import { formatDate as baseFormatDate, formatUsd as baseFormatUsd } from "./fundingRounds";

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

const knownInvestorSlugs: Record<string, string> = {
  "Sequoia Capital": "sequoia-capital",
  "Andreessen Horowitz": "andreessen-horowitz",
  "Peak XV Partners": "peak-xv-partners",
  "Y Combinator": "y-combinator",
  MiraclePlus: "miracleplus",
  "Lollapalooza Capital": "lollapalooza-capital",
  "Shunwei Capital": "shunwei-capital",
  "Elad Gil": "elad-gil",
  "Naval Ravikant": "naval-ravikant",
  "Nat Friedman": "nat-friedman",
};

function lead(name: string): FundingLead {
  return { name, slug: knownInvestorSlugs[name] };
}

export const fundingLeaderboard: FundingLeaderboardEntry[] = [
  {
    id: "openai",
    name: "OpenAI",
    logo: leaderboardLogos['openai'],
    country: "United States",
    sector: "Foundation Models",
    totalRaisedUsd: 142_000_000_000,
    largestRoundUsd: 122_000_000_000,
    roundLabel: "Strategic",
    date: "2026-03-31",
    valuation: 852_000_000_000,
    leads: [lead("SoftBank"), lead("Andreessen Horowitz"), lead("D. E. Shaw Ventures"), lead("MGX"), lead("TPG"), lead("T. Rowe Price")],
    source: "OpenAI",
    sourceUrl: "https://openai.com/index/accelerating-the-next-phase-ai/",
    tier: "Disclosed",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    logo: leaderboardLogos['anthropic'],
    country: "United States",
    sector: "AI Safety / Foundation Models",
    totalRaisedUsd: 118_000_000_000,
    largestRoundUsd: 65_000_000_000,
    roundLabel: "Series H",
    date: "2026-05-28",
    valuation: 965_000_000_000,
    leads: [lead("Altimeter Capital"), lead("Dragoneer"), lead("Greenoaks"), lead("Sequoia Capital")],
    source: "Anthropic",
    sourceUrl: "https://www.anthropic.com/news/series-h",
    tier: "Disclosed",
  },
  {
    id: "xai",
    name: "xAI",
    logo: leaderboardLogos['xai'],
    country: "United States",
    sector: "Foundation Models / AI Infrastructure",
    totalRaisedUsd: 37_000_000_000,
    largestRoundUsd: 20_000_000_000,
    roundLabel: "Series E",
    date: "2026-01-06",
    valuation: 230_000_000_000,
    leads: [lead("Valor Equity Partners"), lead("Fidelity"), lead("Qatar Investment Authority")],
    source: "xAI",
    sourceUrl: "https://x.ai/news/series-e",
    tier: "Disclosed",
  },
  {
    id: "waymo",
    name: "Waymo",
    logo: leaderboardLogos['waymo'],
    country: "United States",
    sector: "Autonomous Systems",
    totalRaisedUsd: 27_100_000_000,
    largestRoundUsd: 16_000_000_000,
    roundLabel: "Series D",
    date: "2026-02-02",
    valuation: 126_000_000_000,
    leads: [lead("Dragoneer Investment Group"), lead("DST Global"), lead("Sequoia Capital")],
    source: "Waymo",
    sourceUrl: "https://waymo.com/blog/2026/02/waymo-raises-usd16-billion-investment-round",
    tier: "Disclosed",
  },
  {
    id: "databricks",
    name: "Databricks",
    logo: leaderboardLogos['databricks'],
    country: "United States",
    sector: "Data & AI Platform",
    totalRaisedUsd: 25_000_000_000,
    largestRoundUsd: 5_000_000_000,
    roundLabel: "Strategic",
    date: "2026-08-13",
    valuation: 190_000_000_000,
    leads: [lead("Coatue Management"), lead("Blackstone"), lead("MGX"), lead("T. Rowe Price"), lead("Sixth Street Growth")],
    source: "CNBC",
    sourceUrl: "https://www.cnbc.com/2026/08/13/databricks-funding-round-190-billion-valuation.html",
    tier: "Disclosed",
  },
  {
    id: "moonshot",
    name: "Moonshot AI",
    logo: leaderboardLogos['moonshot'],
    country: "China",
    sector: "Foundation Models",
    totalRaisedUsd: 5_000_000_000,
    largestRoundUsd: 3_500_000_000,
    roundLabel: "Series F",
    date: "2026-07-29",
    valuation: 35_000_000_000,
    leads: [lead("National AI Industry Investment Fund")],
    source: "Bloomberg",
    sourceUrl: "https://www.bloomberg.com/news/articles/2026-07-29/china-s-moonshot-ai-passes-funding-goal-to-hit-35-billion-value",
    tier: "Reported",
  },
  {
    id: "safe-superintelligence",
    name: "Safe Superintelligence",
    logo: leaderboardLogos["safe-superintelligence"],
    country: "United States",
    sector: "AI Safety Research",
    totalRaisedUsd: 8_000_000_000,
    largestRoundUsd: 5_000_000_000,
    roundLabel: "Strategic",
    date: "2026-07-27",
    leads: [lead("NVIDIA")],
    source: "NVIDIA / CTech",
    sourceUrl: "https://www.calcalistech.com/ctechnews/article/qy9eg5jw4",
    tier: "Reported",
  },
  {
    id: "scale-ai",
    name: "Scale AI",
    logo: leaderboardLogos["scale-ai"],
    country: "United States",
    sector: "Data Infrastructure",
    totalRaisedUsd: 15_900_000_000,
    largestRoundUsd: 14_300_000_000,
    roundLabel: "Strategic",
    date: "2025-06-12",
    valuation: 29_000_000_000,
    leads: [lead("Meta")],
    source: "Scale AI",
    sourceUrl: "https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution",
    tier: "Reported",
  },
  {
    id: "together",
    name: "Together AI",
    logo: leaderboardLogos['together'],
    country: "United States",
    sector: "AI Cloud / Inference",
    totalRaisedUsd: 1_334_000_000,
    largestRoundUsd: 800_000_000,
    roundLabel: "Series C",
    date: "2026-07-01",
    valuation: 8_300_000_000,
    leads: [lead("Aramco Ventures")],
    source: "Together AI",
    sourceUrl: "https://www.together.ai/blog/announcing-our-series-c",
    tier: "Disclosed",
  },
  {
    id: "cerebras",
    name: "Cerebras",
    logo: leaderboardLogos['cerebras'],
    country: "United States",
    sector: "AI Silicon",
    totalRaisedUsd: 2_850_000_000,
    largestRoundUsd: 1_000_000_000,
    roundLabel: "Series H",
    date: "2026-02-03",
    valuation: 23_000_000_000,
    leads: [lead("Tiger Global")],
    source: "Cerebras",
    sourceUrl: "https://www.cerebras.ai/press-release/cerebras-systems-raises-usd1-billion-series-h",
    tier: "Disclosed",
  },
  {
    id: "sierra",
    name: "Sierra",
    logo: leaderboardLogos['sierra'],
    country: "United States",
    sector: "Enterprise AI Agents",
    totalRaisedUsd: 1_585_000_000,
    largestRoundUsd: 950_000_000,
    roundLabel: "Series E",
    date: "2026-05-04",
    valuation: 15_800_000_000,
    leads: [lead("Tiger Global"), lead("GV")],
    source: "Sierra",
    sourceUrl: "https://www.cnbc.com/2026/05/04/bret-taylor-sierra-fundraise-openai.html",
    tier: "Disclosed",
  },
  {
    id: "physical-intelligence",
    name: "Physical Intelligence",
    logo: leaderboardLogos["physical-intelligence"],
    country: "United States",
    sector: "Robotics AI",
    totalRaisedUsd: 1_070_000_000,
    largestRoundUsd: 600_000_000,
    roundLabel: "Series B",
    date: "2025-11-20",
    valuation: 5_600_000_000,
    leads: [lead("CapitalG")],
    source: "Bloomberg",
    sourceUrl: "https://www.bloomberg.com/news/articles/2025-11-20/robotics-startup-physical-intelligence-valued-at-5-6-billion-in-new-funding",
    tier: "Reported",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    logo: leaderboardLogos['mistral'],
    country: "France",
    sector: "Open Models",
    totalRaisedUsd: 4_020_000_000,
    largestRoundUsd: 2_000_000_000,
    roundLabel: "Series C",
    date: "2025-09-09",
    valuation: 13_800_000_000,
    leads: [lead("ASML")],
    source: "Mistral AI",
    sourceUrl: "https://mistral.ai/news/mistral-ai-raises-1-7-b-to-accelerate-technological-progress-with-ai/",
    tier: "Disclosed",
  },
  {
    id: "figure",
    name: "Figure AI",
    logo: leaderboardLogos['figure'],
    country: "United States",
    sector: "Humanoid Robotics",
    totalRaisedUsd: 1_750_000_000,
    largestRoundUsd: 1_000_000_000,
    roundLabel: "Series C",
    date: "2025-09-16",
    valuation: 39_000_000_000,
    leads: [lead("Parkway Venture Capital"), lead("NVIDIA")],
    source: "Figure",
    sourceUrl: "https://www.figure.ai/news/series-c",
    tier: "Disclosed",
  },
  {
    id: "groq",
    name: "Groq",
    logo: leaderboardLogos['groq'],
    country: "United States",
    sector: "AI Inference",
    totalRaisedUsd: 4_260_000_000,
    largestRoundUsd: 350_000_000,
    roundLabel: "Series A",
    date: "2026-08-17",
    valuation: 3_500_000_000,
    leads: [lead("Disruptive"), lead("NVIDIA")],
    source: "Groq",
    sourceUrl: "https://groq.com/newsroom/groq-closes-usd350-million-series-a-building-the-world-s-leading-ai-inference-cloud",
    tier: "Disclosed",
  },
  {
    id: "zhipu",
    name: "Zhipu AI",
    logo: leaderboardLogos['zhipu'],
    country: "China",
    sector: "Foundation Models",
    totalRaisedUsd: 5_800_000_000,
    largestRoundUsd: 4_000_000_000,
    roundLabel: "Post-IPO Placement",
    date: "2026-07-09",
    valuation: 64_000_000_000,
    leads: [],
    source: "STCN / Reuters",
    sourceUrl: "https://www.stcn.com/article/detail/4008146.html",
    tier: "Reported",
  },
  {
    id: "minimax",
    name: "MiniMax",
    logo: leaderboardLogos['minimax'],
    country: "China",
    sector: "Foundation Models / Agents",
    totalRaisedUsd: 3_400_000_000,
    largestRoundUsd: 2_050_000_000,
    roundLabel: "PIPE",
    date: "2026-07-10",
    leads: [lead("Global institutional backers")],
    source: "TMTPOST",
    sourceUrl: "http://en.tmtpost.com/news/8059518",
    tier: "Disclosed",
  },
  {
    id: "harvey",
    name: "Harvey",
    logo: leaderboardLogos['harvey'],
    country: "United States",
    sector: "Legal AI",
    totalRaisedUsd: 1_226_000_000,
    largestRoundUsd: 200_000_000,
    roundLabel: "Growth",
    date: "2026-03-25",
    valuation: 11_000_000_000,
    leads: [lead("GIC"), lead("Sequoia Capital")],
    source: "Harvey",
    sourceUrl: "https://www.harvey.ai/blog/harvey-raises-growth-round-at-dollar11-billion-valuation-co-led-by-gic-and-sequoia",
    tier: "Disclosed",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    logo: leaderboardLogos['elevenlabs'],
    country: "United States / United Kingdom",
    sector: "Voice AI",
    totalRaisedUsd: 781_000_000,
    largestRoundUsd: 500_000_000,
    roundLabel: "Series D",
    date: "2026-02-04",
    valuation: 11_000_000_000,
    leads: [lead("Sequoia Capital")],
    source: "ElevenLabs",
    sourceUrl: "https://elevenlabs.io/blog/series-d",
    tier: "Disclosed",
  },
  {
    id: "glean",
    name: "Glean",
    logo: leaderboardLogos['glean'],
    country: "United States",
    sector: "Enterprise Search",
    totalRaisedUsd: 768_200_000,
    largestRoundUsd: 150_000_000,
    roundLabel: "Series F",
    date: "2025-06-10",
    valuation: 7_200_000_000,
    leads: [lead("Wellington Management")],
    source: "Glean",
    sourceUrl: "https://www.glean.com/blog/glean-series-f-announcement",
    tier: "Disclosed",
  },
  {
    id: "unitree",
    name: "Unitree",
    logo: leaderboardLogos['unitree'],
    country: "China",
    sector: "Embodied AI / Robotics",
    totalRaisedUsd: 1_150_000_000,
    largestRoundUsd: 904_000_000,
    roundLabel: "IPO",
    date: "2026-08-19",
    valuation: 9_000_000_000,
    leads: [lead("Public markets")],
    source: "Shanghai Stock Exchange",
    sourceUrl: "https://www.36kr.com/p/3943674198218376",
    tier: "Disclosed",
  },
  {
    id: "sarvam",
    name: "Sarvam AI",
    logo: leaderboardLogos['sarvam'],
    country: "India",
    sector: "Sovereign AI",
    totalRaisedUsd: 350_000_000,
    largestRoundUsd: 300_000_000,
    roundLabel: "Series B",
    date: "2026-06-15",
    valuation: 1_500_000_000,
    leads: [lead("HCLTech")],
    source: "HCLTech / Sarvam",
    sourceUrl: "https://www.hcltech.com/press-releases/sarvam-raises-234-million-first-close-300-million-series-b-15-billion-valuation",
    tier: "Disclosed",
  },
  {
    id: "suno",
    name: "Suno",
    logo: leaderboardLogos['suno'],
    country: "United States",
    sector: "Generative Media",
    totalRaisedUsd: 775_000_000,
    largestRoundUsd: 400_000_000,
    roundLabel: "Series D",
    date: "2026-06-03",
    valuation: 5_400_000_000,
    leads: [lead("Bond Capital")],
    source: "Suno",
    sourceUrl: "https://suno.com/blog/series-d-announcement",
    tier: "Disclosed",
  },
  {
    id: "abridge",
    name: "Abridge",
    logo: leaderboardLogos['abridge'],
    country: "United States",
    sector: "Healthcare AI",
    totalRaisedUsd: 830_000_000,
    largestRoundUsd: 300_000_000,
    roundLabel: "Series E",
    date: "2025-06-24",
    valuation: 5_300_000_000,
    leads: [lead("Andreessen Horowitz")],
    source: "Abridge",
    sourceUrl: "https://www.abridge.com/blog/series-e",
    tier: "Disclosed",
  },
];

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
