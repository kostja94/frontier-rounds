import {
  formatUsd,
  type FundingLeaderboardEntry,
  getLeaderboardByTotal,
} from "@/data/fundingLeaderboard";

export function FundingScaleChart({ entries }: { entries: FundingLeaderboardEntry[] }) {
  const sorted = getLeaderboardByTotal(entries).slice(0, 20);
  const values = sorted.map((e) => e.totalRaisedUsd);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const logMin = Math.log10(Math.max(min, 1));
  const logMax = Math.log10(max);

  const widthFor = (amount: number) => {
    if (logMax <= logMin) return "100%";
    const pct = ((Math.log10(amount) - logMin) / (logMax - logMin)) * 100;
    return `${Math.max(pct, 1)}%`;
  };

  return (
    <section className="border-b border-ink">
      <div className="page-shell-md">
        <div className="flex items-baseline justify-between">
          <h2 className="display-md text-ink">
            Funding Scale (Logarithmic)
          </h2>
          <p className="text-xs text-muted-foreground">Top 20 by total raised</p>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A log-scale view makes the long tail visible. OpenAI and Anthropic still dominate,
          but the bars below show how several Chinese labs and infrastructure players have
          closed multi-billion-dollar rounds in 2026.
        </p>

        <div className="mt-8 space-y-3">
          {sorted.map((entry, idx) => (
            <div key={entry.id} className="grid items-center gap-3 md:grid-cols-[180px_1fr_80px]">
              <div className="flex items-center gap-2 text-sm text-ink">
                <span className="w-5 text-right tabular-nums text-muted-foreground">{idx + 1}</span>
                {entry.logo ? (
                  <img
                    src={entry.logo}
                    alt={`${entry.name} logo`}
                    loading="lazy"
                    className="h-6 w-20 border border-rule bg-white object-contain p-0.5"
                  />
                ) : (
                  <span className="font-display text-base tracking-tight">{entry.name}</span>
                )}
              </div>
              <div className="h-3 bg-rule">
                <div
                  className="h-3 bg-ink"
                  style={{ width: widthFor(entry.totalRaisedUsd) }}
                  aria-label={`${entry.name}: ${formatUsd(entry.totalRaisedUsd)}`}
                />
              </div>
              <span className="text-right text-sm tabular-nums text-ink">
                {formatUsd(entry.totalRaisedUsd)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
