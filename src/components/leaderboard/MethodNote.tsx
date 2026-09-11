export function MethodNote() {
  const items = [
    {
      q: "What counts as AI funding?",
      a: "We count equity and strategic investment rounds for companies whose core product or R&D is machine-learning driven. Debt, secondary sales, and unexercised commitments are excluded unless clearly disclosed as primary capital.",
    },
    {
      q: "Why are some numbers tagged 'Reported' or 'Estimated'?",
      a: "Disclosed means the company published the amount. Reported means a credible publication cited sources. Estimated means the figure is derived from analyst or market data and should be treated as directional.",
    },
    {
      q: "How often is the leaderboard updated?",
      a: "Major rounds are added within 24–48 hours of announcement. The full set is reviewed weekly to reconcile newly reported totals.",
    },
  ];

  return (
    <section className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
        <h2 className="display-md text-ink">
          Methodology & FAQ
        </h2>
        <dl className="mt-6 divide-y divide-rule border-t border-ink">
          {items.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="font-display text-xl tracking-tight text-ink">{item.q}</dt>
              <dd className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
