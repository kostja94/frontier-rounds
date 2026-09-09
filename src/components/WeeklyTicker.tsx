import Link from "next/link";
import { formatDate, formatUsd, type FundingRound } from "@/data/fundingRounds";

/**
 * Latest-rounds ticker(横向无缝跑马灯)。
 * - 纯 CSS 动画(globals.css 的 marquee keyframes),无外部依赖
 * - 双份渲染实现无缝循环(translateX -50%)
 * - hover 暂停;prefers-reduced-motion 下关闭动画
 * - 每条可链到 /products/{slug}(无档案则 /leaderboard)
 */
export function WeeklyTicker({ rounds }: { rounds: FundingRound[] }) {
  if (rounds.length === 0) return null;
  // 最新在前
  const sorted = [...rounds].sort((a, b) => (a.date < b.date ? 1 : -1));

  const RoundItem = ({ round }: { round: FundingRound }) => {
    const href = round.slug ? `/products/${round.slug}` : "/leaderboard";
    return (
      <Link
        href={href}
        className="group flex shrink-0 items-center gap-2.5 px-5 text-background transition-colors hover:text-accent"
      >
        {round.logo ? (
          // 反白条上 logo 用浅色底衬托
          <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-background/90 p-0.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={round.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
          </span>
        ) : null}
        <span className="whitespace-nowrap text-sm font-medium tracking-tight text-background group-hover:text-inherit">
          {round.company}
        </span>
        <span className="whitespace-nowrap border border-background/40 px-1.5 py-px text-[10px] uppercase tracking-[0.14em] text-background/80">
          {round.round}
        </span>
        <span className="whitespace-nowrap text-sm tabular-nums text-background/90">
          {formatUsd(round.amountUsd)}
        </span>
        <span className="whitespace-nowrap text-xs tabular-nums text-background/50">
          {formatDate(round.date)}
        </span>
        <span aria-hidden className="ml-1 text-background/30">
          ·
        </span>
      </Link>
    );
  };

  return (
    <section aria-label="Latest funding rounds" className="border-b border-ink bg-ink">
      <div className="mx-auto flex max-w-6xl items-stretch md:px-10">
        {/* 固定节标 */}
        <div className="flex shrink-0 items-center border-r border-background/20 px-5 py-3 md:px-6">
          <p className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-background">
            Latest rounds
          </p>
        </div>
        {/* 滚动区 */}
        <div className="relative flex-1 overflow-hidden py-3 motion-reduce:overflow-x-auto">
          <div className="flex w-max animate-marquee gap-0 hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
            {/* 双份渲染实现无缝循环 */}
            {[...sorted, ...sorted].map((round, i) => (
              <RoundItem key={`${round.id}-${i}`} round={round} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
