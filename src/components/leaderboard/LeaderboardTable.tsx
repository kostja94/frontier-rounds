"use client";

import { useState } from "react";
import Link from "next/link";

import {
  formatDate,
  formatUsd,
  type FundingLeaderboardEntry,
  getLeaderboardByLargestRound,
  getLeaderboardByTotal,
} from "@/data/fundingLeaderboard";

type View = "total" | "largest";

export function LeaderboardTable({ entries }: { entries: FundingLeaderboardEntry[] }) {
  const [view, setView] = useState<View>("total");
  const ranked = view === "total" ? getLeaderboardByTotal(entries) : getLeaderboardByLargestRound(entries);

  const amountLabel = view === "total" ? "Total raised" : "Largest round";
  const amountFor = (e: FundingLeaderboardEntry) =>
    view === "total" ? e.totalRaisedUsd : e.largestRoundUsd;

  const tierClasses: Record<string, string> = {
    Disclosed: "border-ink text-ink",
    Reported: "border-muted-foreground text-muted-foreground",
    Estimated: "border-accent text-accent",
  };

  return (
    <section className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-4 border-b-2 border-ink pb-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="display-md text-ink">
            Leaderboard
          </h2>
          <div className="flex gap-1 border border-ink">
            {(["total", "largest"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition-colors ${
                  view === v
                    ? "bg-ink text-primary-foreground"
                    : "bg-background text-foreground hover:bg-rule/60"
                }`}
              >
                {v === "total" ? "Total capital" : "Largest round"}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop table */}
        <table className="hidden w-full border-collapse text-sm md:table">
          <thead>
            <tr className="border-b border-rule text-left eyebrow">
              <th className="w-12 py-3 pr-2 font-normal">Rank</th>
              <th className="py-3 pr-4 font-normal">Company</th>
              <th className="py-3 pr-4 text-right font-normal">{amountLabel}</th>
              <th className="py-3 pr-4 font-normal">Latest round</th>
              <th className="py-3 pr-4 text-right font-normal">Valuation</th>
              <th className="py-3 pr-4 font-normal">Date</th>
              <th className="py-3 pr-4 font-normal">Country</th>
              <th className="py-3 pr-4 font-normal">Lead investors</th>
              <th className="py-3 font-normal">Source</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((entry, idx) => (
              <tr
                key={entry.id}
                className={`border-b border-rule transition-colors hover:bg-rule/60 ${
                  idx < 2 ? "bg-rule/40" : ""
                }`}
              >
                <td className="py-3.5 pr-2 text-right tabular-nums text-ink">{idx + 1}</td>
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    {entry.logo ? (
                      <img
                        src={entry.logo}
                        alt={`${entry.name} logo`}
                        loading="lazy"
                        className="h-8 w-24 border border-rule bg-white object-contain p-1"
                      />
                    ) : (
                      <span className="block h-8 w-24 border border-rule" />
                    )}
                    <span className="font-display text-base tracking-tight text-ink">
                      {entry.name}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 pr-4 text-right tabular-nums text-ink">
                  {formatUsd(amountFor(entry))}
                </td>
                <td className="py-3.5 pr-4 text-accent">{entry.roundLabel}</td>
                <td className="py-3.5 pr-4 text-right tabular-nums text-muted-foreground">
                  {entry.valuation ? formatUsd(entry.valuation) : "—"}
                </td>
                <td className="py-3.5 pr-4 tabular-nums text-muted-foreground">
                  {formatDate(entry.date)}
                </td>
                <td className="py-3.5 pr-4 text-foreground">{entry.country}</td>
                <td className="py-3.5 pr-4 text-foreground">
                  <ul className="flex flex-wrap gap-x-2 gap-y-1">
                    {entry.leads.map((l) =>
                      l.slug ? (
                        <li key={l.name}>
                          <Link
                            href={`/investors/${l.slug}`}
                            className="border-b border-rule transition-colors hover:border-ink hover:text-accent"
                          >
                            {l.name}
                          </Link>
                        </li>
                      ) : (
                        <li key={l.name}>{l.name}</li>
                      ),
                    )}
                  </ul>
                </td>
                <td className="py-3.5">
                  <span
                    className={`inline-block border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] ${
                      tierClasses[entry.tier]
                    }`}
                  >
                    {entry.tier}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile list */}
        <ul className="md:hidden">
          {ranked.map((entry, idx) => (
            <li
              key={entry.id}
              className={`border-b border-rule py-4 ${idx < 2 ? "bg-rule/40" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-5 text-right tabular-nums text-muted-foreground">
                    {idx + 1}
                  </span>
                  {entry.logo ? (
                    <img
                      src={entry.logo}
                      alt={`${entry.name} logo`}
                      loading="lazy"
                      className="h-7 w-20 border border-rule bg-white object-contain p-0.5"
                    />
                  ) : (
                    <span className="block h-7 w-20 border border-rule" />
                  )}
                  <span className="font-display text-lg tracking-tight text-ink">
                    {entry.name}
                  </span>
                </div>
                <span className="tabular-nums text-ink">{formatUsd(amountFor(entry))}</span>
              </div>
              <p className="mt-2 text-xs text-foreground">
                {entry.roundLabel} · {formatDate(entry.date)} · {entry.country}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {entry.valuation ? `Valuation: ${formatUsd(entry.valuation)} · ` : ""}
                Leads: {entry.leads.map((l) => (l.slug ? `[${l.name}]` : l.name)).join(", ")}
              </p>
              <span
                className={`mt-2 inline-block border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] ${
                  tierClasses[entry.tier]
                }`}
              >
                {entry.tier}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
