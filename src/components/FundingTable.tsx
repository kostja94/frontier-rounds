import { formatDate, formatUsd, type FundingRound } from "@/data/fundingRounds";

export function FundingTable({ rounds }: { rounds: FundingRound[] }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
      <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
        <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
          Latest Funding Rounds
        </h2>
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Updated as rounds are recorded
        </p>
      </div>

      {/* Desktop table */}
      <table className="hidden w-full border-collapse text-sm md:table">
        <thead>
          <tr className="border-b border-rule text-left text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <th className="py-3 pr-4 font-normal">Company</th>
            <th className="py-3 pr-4 font-normal">Round</th>
            <th className="py-3 pr-4 text-right font-normal">Amount</th>
            <th className="py-3 pr-4 font-normal">Date</th>
            <th className="py-3 pr-4 font-normal">Country</th>
            <th className="py-3 pr-4 font-normal">Sector</th>
            <th className="py-3 font-normal">Lead investor</th>
          </tr>
        </thead>
        <tbody>
          {rounds.map((r) => (
            <tr key={r.id} className="border-b border-rule transition-colors hover:bg-rule/60">
              <td className="py-3.5 pr-4 font-medium text-ink">{r.company}</td>
              <td className="py-3.5 pr-4 text-accent">{r.round}</td>
              <td className="py-3.5 pr-4 text-right tabular-nums text-ink">
                {formatUsd(r.amountUsd)}
              </td>
              <td className="py-3.5 pr-4 tabular-nums text-muted-foreground">
                {formatDate(r.date)}
              </td>
              <td className="py-3.5 pr-4 text-foreground">{r.country}</td>
              <td className="py-3.5 pr-4 text-foreground">{r.sector}</td>
              <td className="py-3.5 text-foreground">{r.leadInvestor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile list */}
      <ul className="md:hidden">
        {rounds.map((r) => (
          <li key={r.id} className="border-b border-rule py-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-medium text-ink">{r.company}</span>
              <span className="tabular-nums text-ink">{formatUsd(r.amountUsd)}</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-accent">{r.round}</p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {formatDate(r.date)} · {r.country} · {r.sector}
            </p>
            <p className="mt-1 text-xs text-foreground">Lead: {r.leadInvestor}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
