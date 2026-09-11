export function CriteriaGrid() {
  const criteria = [
    {
      title: "Minimum Scale",
      body: "Companies must have disclosed or credibly reported at least $250M in total funding, or a single round above $100M.",
    },
    {
      title: "AI-native Core",
      body: "The company's primary product, R&D, or business model is built on machine learning, foundation models, or AI infrastructure.",
    },
    {
      title: "Verified Sources",
      body: "Each row is tagged Disclosed (official announcement), Reported (major publication), or Estimated (analyst estimate).",
    },
  ];

  return (
    <section className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
        <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
          Inclusion Criteria
        </h2>
        <div className="mt-6 grid gap-px border border-ink bg-rule md:grid-cols-3">
          {criteria.map((item) => (
            <article key={item.title} className="bg-background px-6 py-6">
              <h3 className="font-display text-xl tracking-tight text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
