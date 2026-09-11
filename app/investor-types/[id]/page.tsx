import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { InvestorTypeBadges } from "@/components/InvestorTypeBadges";
import {
  getAllTypeSummaries,
  getInvestorType,
  getProfilesByType,
} from "@/data/investors/typeDirectory";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTypeSummaries().map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const type = getInvestorType(id);
  if (!type) return { title: "Investor type not found" };
  return {
    title: `${type.abbreviation} — ${type.name} | Frontier Rounds`,
    description: `${type.name}: ${type.description}`,
    alternates: { canonical: `/investor-types/${id}` },
    openGraph: {
      type: "website",
      title: `${type.abbreviation} — ${type.name}`,
      description: type.description,
    },
  };
}

export default async function InvestorTypePage({ params }: Props) {
  const { id } = await params;
  const type = getInvestorType(id);
  if (!type) notFound();

  const profiles = getProfilesByType(id);
  const allTypes = getAllTypeSummaries();
  const idx = allTypes.findIndex((t) => t.id === id);
  const prev = idx > 0 ? allTypes[idx - 1] : undefined;
  const next = idx < allTypes.length - 1 ? allTypes[idx + 1] : undefined;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        breadcrumb={[
          { label: "Investor Types", to: "/investor-types" },
          { label: type.abbreviation },
        ]}
      />
      <main className="animate-fade-up">
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="border border-ink bg-ink px-3 py-1 text-sm font-medium uppercase tracking-[0.14em] text-background">
                {type.abbreviation}
              </span>
              <h1 className="font-display text-4xl leading-[0.95] tracking-tight text-ink md:text-6xl">
                {type.name}
              </h1>
            </div>
            <p className="mt-5 max-w-2xl border-l-2 border-rule pl-4 text-base leading-relaxed text-foreground">
              {type.description}
            </p>
            <dl className="mt-8 grid gap-px border border-ink bg-rule sm:grid-cols-3">
              <div className="bg-background px-5 py-4">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Typical stage
                </dt>
                <dd className="mt-1.5 text-base text-ink">{type.typicalStage}</dd>
              </div>
              <div className="bg-background px-5 py-4">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Typical check
                </dt>
                <dd className="mt-1.5 text-base text-ink">{type.typicalCheckSize}</dd>
              </div>
              <div className="bg-background px-5 py-4">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Investors in atlas
                </dt>
                <dd className="mt-1.5 text-base text-ink">{profiles.length}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
            <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
              AI relevance
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground">
              {type.aiRelevance}
            </p>

            {type.examples.length > 0 && (
              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Reference examples
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  {type.examples.join(" · ")}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
            <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
              Investors in the atlas
            </h2>
            {profiles.length > 0 ? (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {profiles.map((profile) => (
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
            ) : (
              <p className="mt-4 max-w-xl border-t border-rule pt-4 text-sm leading-relaxed text-muted-foreground">
                No investor in the atlas is tagged with this type yet. The reference examples above
                show the kinds of institutions that fit — profiles appear here once they are added.
              </p>
            )}
          </div>
        </section>

        <section className="border-b border-ink">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-10">
            {prev ? (
              <Link
                href={`/investor-types/${prev.id}`}
                className="border-b border-ink text-sm tracking-wide text-ink transition-colors hover:text-accent"
              >
                ← {prev.abbreviation} · {prev.name}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/investor-types/${next.id}`}
                className="border-b border-ink text-sm tracking-wide text-ink transition-colors hover:text-accent"
              >
                {next.abbreviation} · {next.name} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
