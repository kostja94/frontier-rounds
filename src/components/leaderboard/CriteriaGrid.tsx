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
      <div className="page-shell-md">
        <h2 className="display-md text-ink">
          Inclusion Criteria
        </h2>
        <div className="mt-6 grid gap-px border border-ink bg-rule md:grid-cols-3">
          {criteria.map((item) => (
            <article key={item.title} className="bg-background px-6 py-6">
              <h3 className="text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
