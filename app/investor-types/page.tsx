import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllTypeSummaries } from "@/data/investors/typeDirectory";

export const metadata: Metadata = {
  title: "Investor Types — A Taxonomy of AI Capital | Frontier Rounds",
  description:
    "The categories of capital that finance AI companies — venture capital, CVC, family offices, angels, sovereign wealth funds, accelerators and more, each with the firms and individuals behind them.",
  alternates: { canonical: "/investor-types" },
};

export default function InvestorTypesPage() {
  const types = getAllTypeSummaries();
  const withProfiles = types.filter((t) => t.profileCount > 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader breadcrumb={[{ label: "Investor Types" }]} />
      <main className="animate-fade-up">
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
            <p className="text-[11px] uppercase tracking-[0.24em] text-accent">Reference</p>
            <h1 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-ink md:text-6xl">
              Investor Types
            </h1>
            <p className="mt-5 max-w-2xl border-l-2 border-rule pl-4 text-base leading-relaxed text-foreground">
              A taxonomy of the capital sources that finance artificial intelligence companies —
              from pre-seed angels and accelerators to sovereign funds and private equity. Each type
              links to the firms and individuals in the atlas that represent it.
            </p>
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <div className="flex gap-2">
                <dt>Categories</dt>
                <dd className="text-ink">{types.length}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Represented in atlas</dt>
                <dd className="text-ink">
                  {withProfiles.length} of {types.length}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
            <ul className="grid gap-px border border-ink bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {types.map((t) => (
                <li key={t.id} className="bg-background">
                  <Link
                    href={`/investor-types/${t.id}`}
                    className="group flex h-full flex-col p-5 transition-colors hover:bg-rule/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="border border-ink bg-ink px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-background">
                        {t.abbreviation}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {t.profileCount} {t.profileCount === 1 ? "investor" : "investors"}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl leading-none tracking-tight text-ink transition-colors group-hover:text-accent">
                      {t.name}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground">
                      {t.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
