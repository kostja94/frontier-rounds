import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { InvestorTypeBadges } from "@/components/InvestorTypeBadges";
import { investorTypes, investorSummary } from "@/data/investorTypes";
import { investorProfiles } from "@/data/investors/profiles";

export const metadata: Metadata = {
  title: "Investor Atlas — Who Backs AI Startups",
  description:
    "A directory of capital sources behind artificial intelligence companies: venture capital, CVC, family offices, angels, sovereign wealth funds, accelerators, and more.",
  alternates: { canonical: "/investors" },
};

const firmProfiles = investorProfiles.filter(
  (profile) => profile.kind !== "person" && profile.kind !== "accelerator",
);
const acceleratorProfiles = investorProfiles.filter((profile) => profile.kind === "accelerator");
const angelProfiles = investorProfiles.filter((profile) => profile.kind === "person");

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="animate-fade-up">
        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
            <p className="text-[11px] uppercase tracking-[0.24em] text-accent">Reference</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-ink md:text-6xl">
              Investor Atlas
            </h2>
            <p className="mt-5 max-w-2xl border-l-2 border-rule pl-4 text-base leading-relaxed text-foreground">
              A field guide to the capital sources that finance artificial intelligence companies —
              from pre-seed angels and accelerators to sovereign funds and private equity.
            </p>
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <div className="flex gap-2">
                <dt>Categories</dt>
                <dd className="text-ink">{investorSummary.totalCategories}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Earliest stage</dt>
                <dd className="text-ink">{investorSummary.earliestStage}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Late stage</dt>
                <dd className="text-ink">{investorSummary.latestStage}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-10">
            {[
              { label: "Firm profiles", items: firmProfiles },
              { label: "Accelerators & incubators", items: acceleratorProfiles },
              { label: "Angel investors", items: angelProfiles },
            ].map((group) => (
              <div key={group.label} className="mt-8 first:mt-0">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {group.label}
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.items.map((profile) => (
                    <li key={profile.slug} className="border-t border-rule pt-3">
                      <Link href={`/investors/${profile.slug}`} className="group block">
                        {profile.portrait ? (
                          <img
                            src={profile.portrait}
                            alt={`Portrait of ${profile.name}`}
                            loading="lazy"
                            className="mb-2 h-12 w-12 border border-rule object-cover grayscale"
                          />
                        ) : (
                          profile.mark && (
                            <img
                              src={profile.mark}
                              alt={`${profile.name} logo`}
                              loading="lazy"
                              className="mb-2 h-8 w-auto"
                            />
                          )
                        )}
                        <span className="font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-accent">
                          {profile.name}
                        </span>
                        <InvestorTypeBadges typeIds={profile.investorTypeIds} className="mt-1.5" />
                        <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                          {profile.tagline}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-ink">
          <div className="mx-auto grid max-w-6xl md:grid-cols-[220px_1fr] md:divide-x md:divide-ink">
            <aside className="hidden border-b border-ink px-8 py-10 md:block md:border-b-0">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Index</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground">
                {investorTypes.map((type) => (
                  <li key={type.id}>
                    <a href={`#${type.id}`} className="transition-colors hover:text-accent">
                      {type.abbreviation}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="px-5 py-10 md:px-10 md:py-12">
              <div className="grid gap-10 md:gap-14">
                {investorTypes.map((type) => (
                  <article
                    key={type.id}
                    id={type.id}
                    className="grid gap-4 border-b border-rule pb-10 last:border-b-0 last:pb-0 md:grid-cols-[1fr_220px] md:gap-8"
                  >
                    <div>
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                          {type.name}
                        </h3>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          {type.abbreviation}
                        </span>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-foreground">
                        {type.description}
                      </p>
                      <div className="mt-4">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          AI relevance
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">
                          {type.aiRelevance}
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          Examples
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">
                          {type.examples.join(" · ")}
                        </p>
                      </div>
                    </div>
                    <dl className="grid grid-cols-2 gap-4 border-t border-rule pt-4 text-sm md:grid-cols-1 md:border-t-0 md:border-l md:pl-8 md:pt-0">
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          Typical stage
                        </dt>
                        <dd className="mt-1 text-ink">{type.typicalStage}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          Typical check
                        </dt>
                        <dd className="mt-1 text-ink">{type.typicalCheckSize}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
