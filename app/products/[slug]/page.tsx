import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProductProfile, productProfiles } from "@/data/products";
import type { CompanyRound } from "@/data/products";
import { investorProfiles } from "@/data/investors/profiles";
import { formatRoundDate, formatUsdCompact } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return productProfiles.map((profile) => ({ slug: profile.slug }));
}

// Investor Atlas 建档机构名 → slug（小写精确匹配），用于融资方交叉链接。
// Lovable 的主要资方（Menlo/EQT/CapitalG/Accel 等）尚未在 Atlas 建档，届时自动生效。
const ATLAS_BY_NAME = new Map(
  investorProfiles.map((p) => [p.name.toLowerCase(), p.slug] as [string, string]),
);

function AtlasLink({ name }: { name: string }) {
  const slug = ATLAS_BY_NAME.get(name.toLowerCase());
  if (!slug) {
    return <span className="text-ink">{name}</span>;
  }
  return (
    <Link href={`/investors/${slug}`} className="text-ink underline decoration-1 underline-offset-2 transition-colors hover:text-accent">
      {name}
    </Link>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProductProfile(slug);
  if (!profile) {
    return { title: "Product not found", robots: { index: false } };
  }
  const totalRaised = profile.rounds.reduce((sum, r) => sum + (r.amountUsd ?? 0), 0);
  return {
    title: `${profile.name} — Funding Timeline & Profile`,
    description: `${profile.name}: ${profile.tagline}. Funding timeline across ${profile.rounds.length} rounds totaling ${formatUsdCompact(totalRaised)} — ${profile.facts.find((f) => f.label === "Latest valuation")?.value ?? ""}.`,
    alternates: { canonical: `/products/${profile.slug}` },
    openGraph: {
      type: "profile",
      title: `${profile.name} — Funding Timeline & Profile`,
      description: `${profile.name}: ${profile.tagline}.`,
    },
  };
}

function RoundCard({ round, isLatest }: { round: CompanyRound; isLatest: boolean }) {
  return (
    <li className="relative pl-8 md:pl-12">
      {/* 时间轴竖线节点 */}
      <span
        aria-hidden
        className={`absolute left-0 top-2 h-3 w-3 border border-ink md:left-2 ${
          isLatest ? "bg-accent" : "bg-background"
        }`}
      />
      <div className="grid gap-3 border-b border-rule pb-8 last:border-b-0 md:grid-cols-[130px_1fr] md:gap-8">
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {formatRoundDate(round.date)}
        </div>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
              {round.label}
            </h3>
            <span className="font-display text-xl tracking-tight text-ink md:text-2xl">
              {round.amountUsd ? formatUsdCompact(round.amountUsd) : ""}
            </span>
            {round.valuationUsd && (
              <span className="text-sm text-muted-foreground">
                at {formatUsdCompact(round.valuationUsd)} valuation
              </span>
            )}
            {isLatest && (
              <span className="bg-ink px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-background">
                Latest
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {round.leads.map((lead) => (
              <span
                key={lead}
                className="border border-ink bg-ink px-2.5 py-1 text-xs text-background"
              >
                Led by <AtlasLink name={lead} />
              </span>
            ))}
            {round.participants.map((participant) => (
              <span
                key={participant}
                className="border border-rule px-2.5 py-1 text-xs text-foreground"
              >
                <AtlasLink name={participant} />
              </span>
            ))}
          </div>

          {round.note && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground">{round.note}</p>
          )}
          {round.sourceUrl && (
            <p className="mt-3">
              <a
                href={round.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-ink text-sm text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Source ↗
              </a>
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default async function ProductProfilePage({ params }: Props) {
  const { slug } = await params;
  const profile = getProductProfile(slug);
  if (!profile) notFound();

  const totalRaised = profile.rounds.reduce((sum, r) => sum + (r.amountUsd ?? 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        breadcrumb={[
          { label: "Product Histories", to: "/products" },
          { label: profile.name },
        ]}
      />

      <main className="animate-fade-up">
        {/* Hero + 快照面板 */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-12 md:px-10 md:py-14">
            <div className="md:col-span-6">
              <div className="flex items-center gap-3">
                {profile.logo && (
                  <img
                    src={profile.logo}
                    alt={`${profile.name} logo`}
                    className="h-8 w-auto object-contain"
                  />
                )}
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Funding timeline
                </span>
              </div>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-7xl">
                {profile.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-snug text-foreground">
                {profile.tagline}
              </p>
              <p className="mt-5 max-w-2xl border-l-2 border-rule pl-4 text-base leading-relaxed text-foreground">
                {profile.summary}
              </p>
            </div>

            <div className="md:col-span-6">
              <div className="border border-ink bg-background">
                {profile.logo && (
                  <div className="flex items-center border-b border-rule bg-white px-5 py-5 md:px-6">
                    <img
                      src={profile.logo}
                      alt={`${profile.name} logo`}
                      className="h-12 w-auto object-contain md:h-14"
                    />
                  </div>
                )}
                <dl className="grid grid-cols-2 divide-x divide-y divide-rule">
                  {[
                    ...profile.facts,
                    { label: "Rounds recorded", value: String(profile.rounds.length) },
                    {
                      label: "Total raised",
                      value: formatUsdCompact(totalRaised),
                    },
                  ].map((fact) => (
                    <div key={fact.label} className="px-5 py-4 md:px-6 md:py-5">
                      <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {fact.label}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-snug text-ink">{fact.value}</dd>
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

        {/* 融资时间线 */}
        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
                Funding Timeline
              </h2>
              <p className="max-w-sm text-sm leading-snug text-muted-foreground">
                Every disclosed equity round for {profile.name}, newest to oldest, with lead and
                participating investors where reported. Data is stored oldest-first; the timeline
                is displayed latest-first.
              </p>
            </div>

            <ol className="mt-10 space-y-8 border-l-2 border-ink pl-8 md:pl-12">
              {/* 数据层 rounds 升序存储（validator 强制）；展示层倒序，最新一轮置顶 */}
              {[...profile.rounds].reverse().map((round, i) => (
                <RoundCard
                  key={round.date + round.label}
                  round={round}
                  isLatest={i === 0}
                />
              ))}
            </ol>
          </div>
        </section>

        {/* 叙事章节 */}
        {profile.sections.length > 0 && (
          <section className="border-b border-ink">
            <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
              <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
                The Story Behind the Numbers
              </h2>
              <div className="mt-8 grid gap-px border border-ink bg-rule md:grid-cols-2">
                {profile.sections.map((section) => (
                  <article key={section.heading} className="bg-background px-6 py-6 md:px-7 md:py-7">
                    <h3 className="font-display text-2xl tracking-tight text-ink">
                      {section.heading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">{section.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 交叉链接 */}
        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
            <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
              More in the Atlas
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground">
              {profile.name}&apos;s lead investors are profiled in the{" "}
              <Link href="/investors" className="underline decoration-1 underline-offset-2 transition-colors hover:text-accent">
                Investor Atlas
              </Link>{" "}
              when their firms join the directory. Track who backs every frontier AI round on the{" "}
              <Link href="/leaderboard" className="underline decoration-1 underline-offset-2 transition-colors hover:text-accent">
                Funding Leaderboard
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
