import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { InvestorTypeBadges } from "@/components/InvestorTypeBadges";
import { fundingRounds, formatDate, formatUsd } from "@/data/fundingRounds";
import { getInvestorProfile, investorProfiles } from "@/data/investors/profiles";
import type { InvestorProfile } from "@/data/investors/types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return investorProfiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getInvestorProfile(slug);
  if (!profile) {
    return { title: "Investor not found", robots: { index: false } };
  }
  return {
    title: `${profile.name} — AI Investor Profile`,
    description: `${profile.name}: ${profile.tagline}. Investment approach and disclosed AI portfolio.`,
    alternates: { canonical: `/investors/${profile.slug}` },
    openGraph: {
      type: "profile",
      title: `${profile.name} — AI Investor Profile`,
      description: `${profile.name}: ${profile.tagline}.`,
    },
  };
}

export default async function InvestorProfilePage({ params }: Props) {
  const { slug } = await params;
  const profile = getInvestorProfile(slug);
  if (!profile) notFound();

  const relatedRounds = fundingRounds.filter((round) =>
    profile.investorNames.some((name) => round.leadInvestor.toLowerCase() === name.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        breadcrumb={[
          { label: "Investor Atlas", to: "/investors" },
          { label: profile.name },
        ]}
      />

      <main className="animate-fade-up">
        <section className="border-b-2 border-ink">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-12 md:px-10 md:py-14">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <h1 className="display-xl text-ink">
                  {profile.name}
                </h1>
                {profile.localName && (
                  <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    {profile.localName}
                  </span>
                )}
                <InvestorTypeBadges typeIds={profile.investorTypeIds} />
              </div>
              <p className="mt-5 max-w-2xl border-l-2 border-rule pl-4 text-base leading-relaxed text-foreground">
                {profile.shortSummary}
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="border border-ink bg-background">
                {profile.portrait ? (
                  <div className="flex items-center gap-4 border-b border-rule px-5 py-5 md:px-6">
                    <img
                      src={profile.portrait}
                      alt={`Portrait of ${profile.name}`}
                      className="h-20 w-20 border border-rule object-cover grayscale"
                    />
                    <div>
                      <p className="font-display text-2xl leading-none tracking-tight text-ink">
                        {profile.name}
                      </p>
                      <p className="mt-1 eyebrow">
                        Individual investor
                      </p>
                    </div>
                  </div>
                ) : (
                  profile.mark && (
                    <div className="flex items-center border-b border-rule px-5 py-5 md:px-6">
                      <img
                        src={profile.mark}
                        alt={`${profile.name} logo`}
                        className="h-12 w-auto md:h-14"
                      />
                    </div>
                  )
                )}
                <dl className="grid grid-cols-2 divide-x divide-y divide-rule md:grid-cols-3">
                  {profile.facts.map((fact) => (
                    <div key={fact.label} className="px-5 py-5 md:px-6 md:py-6">
                      <dt className="eyebrow">
                        {fact.label}
                      </dt>
                      <dd className="mt-1.5 text-base leading-snug text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="border-t border-rule px-5 py-4 md:px-6">
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-ink text-sm tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    {profile.websiteLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
            <h2 className="display-lg text-ink">
              {profile.thesisHeading ?? `How ${profile.name} Invests in AI`}
            </h2>

            <div
              className={`mt-8 grid gap-px border border-ink bg-rule ${
                profile.thesis.length % 2 === 0 ? "md:grid-cols-2" : "md:grid-cols-3"
              }`}
            >
              {profile.thesis.map((item) => (
                <article key={item.heading} className="bg-background px-6 py-6 md:px-7 md:py-7">
                  <h3 className="text-2xl text-ink">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {profile.longSummary && (
          <section className="border-b border-ink">
            <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
              <h2 className="display-lg text-ink">
                In depth
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground">
                {profile.longSummary}
              </p>
            </div>
          </section>
        )}

        {profile.portfolioGroups.map((group) => (
          <section key={group.heading} className="border-b border-ink">
            <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="display-lg text-ink">
                    {group.heading}
                  </h3>
                </div>
                <p className="max-w-sm text-sm leading-snug text-muted-foreground">{group.blurb}</p>
              </div>

              <table className="mt-6 hidden w-full border-collapse text-left md:table">
                <thead>
                  <tr className="border-y border-ink eyebrow">
                    <th scope="col" className="w-32 py-2 pr-4 font-normal" aria-label="Logo" />
                    <th scope="col" className="py-2 pr-4 font-normal">Company</th>
                    <th scope="col" className="py-2 pr-4 font-normal">Sector</th>
                    <th scope="col" className="py-2 font-normal">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {group.companies.map((company) => (
                    <tr key={company.name} className="border-b border-rule align-top">
                      <td className="py-3 pr-4">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            loading="lazy"
                            className="h-10 w-28 border border-rule bg-white object-contain p-1.5"
                          />
                        ) : (
                          <span className="block h-10 w-28 border border-rule" />
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        {company.url ? (
                          <a
                            href={company.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink transition-colors hover:text-accent"
                          >
                            {company.name}
                          </a>
                        ) : (
                          <span className="text-ink">{company.name}</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-sm text-foreground">{company.sector}</td>
                      <td className="py-3 text-sm text-foreground">{company.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className="mt-6 divide-y divide-rule border-t border-ink md:hidden">
                {group.companies.map((company) => (
                  <li key={company.name} className="py-4">
                    {company.logo && (
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        loading="lazy"
                        className="mb-2 h-9 w-24 border border-rule bg-white object-contain p-1.5"
                      />
                    )}
                    <div className="flex items-baseline justify-between gap-3">
                      {company.url ? (
                        <a
                          href={company.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-xl tracking-tight text-ink"
                        >
                          {company.name}
                        </a>
                      ) : (
                        <span className="font-display text-xl tracking-tight text-ink">
                          {company.name}
                        </span>
                      )}
                      <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {company.sector}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-snug text-foreground">{company.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
            <h2 className="display-lg text-ink">
              Related Rounds
            </h2>

            {relatedRounds.length > 0 ? (
              <ul className="mt-4 divide-y divide-rule border-t border-ink">
                {relatedRounds.map((round) => (
                  <li key={round.id} className="flex flex-wrap justify-between gap-3 py-3">
                    <span className="font-display text-xl tracking-tight text-ink">
                      {round.company}
                    </span>
                    <span className="text-sm text-foreground">
                      {round.round} · {formatUsd(round.amountUsd)} · {formatDate(round.date)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 max-w-xl border-t border-rule pt-3 text-sm leading-relaxed text-muted-foreground">
                No rounds led by {profile.name} are in the tracker yet. Deals will appear here as
                they are recorded.
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
