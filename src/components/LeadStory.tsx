import { formatDate, formatUsd, type FundingRound } from "@/data/fundingRounds";

export function LeadStory({ round }: { round: FundingRound }) {
  return (
    <section className="animate-fade-up border-b border-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
        <p className="text-[11px] uppercase tracking-[0.24em] text-accent">
          Latest big round — {formatDate(round.date)}
        </p>
        <div className="mt-5 grid gap-8 md:grid-cols-[1.6fr_1fr] md:gap-14">
          <div>
            <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-ink md:text-6xl">
              {round.company} raises {formatUsd(round.amountUsd)} at {round.round}
            </h2>
            {round.note ? (
              <p className="mt-5 max-w-xl border-l-2 border-rule pl-4 text-base leading-relaxed text-foreground">
                {round.note}
              </p>
            ) : null}
          </div>
          <dl className="grid grid-cols-2 gap-y-5 self-end border-t border-rule pt-5 text-sm md:grid-cols-1 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Lead investor
              </dt>
              <dd className="mt-1 text-ink">{round.leadInvestor}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Sector
              </dt>
              <dd className="mt-1 text-ink">{round.sector}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Headquarters
              </dt>
              <dd className="mt-1 text-ink">{round.country}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
