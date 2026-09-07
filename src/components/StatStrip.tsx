import { formatUsd } from "@/data/fundingRounds";

type Stats = {
  total: number;
  deals: number;
  medianRound: number;
  mostActiveInvestor: string;
  mostActiveInvestorDeals: number;
};

export function StatStrip({ stats }: { stats: Stats }) {
  const items: { label: string; value: string; meta?: string }[] = [
    { label: "Capital raised this week", value: formatUsd(stats.total) },
    { label: "Disclosed deals", value: String(stats.deals) },
    { label: "Median round size", value: formatUsd(stats.medianRound) },
    {
      label: "Most active lead",
      value: stats.mostActiveInvestor,
      meta: `${stats.mostActiveInvestorDeals} deal${stats.mostActiveInvestorDeals === 1 ? "" : "s"} this week`,
    },
  ];

  return (
    <dl className="grid grid-cols-2 divide-rule border-b border-ink md:grid-cols-4 md:divide-x">
      {items.map((item) => (
        <div key={item.label} className="border-b border-rule px-5 py-6 md:border-b-0 md:px-8">
          <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {item.label}
          </dt>
          <dd className="mt-2 font-display text-3xl leading-none tabular-nums text-ink">
            {item.value}
          </dd>
          {item.meta ? <p className="mt-1.5 text-xs text-muted-foreground">{item.meta}</p> : null}
        </div>
      ))}
    </dl>
  );
}
