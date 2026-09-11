import { investorTypes } from "@/data/investorTypes";

/**
 * 投资人类型徽标(VC / CVC / Angel / FO 等)。
 * 把 profile.investorTypeIds 映射到 investorTypes 字典的 abbreviation,
 * 渲染为反白小徽标;多值(如 angel + family-office)并排展示。
 */
export function InvestorTypeBadges({
  typeIds,
  className,
}: {
  typeIds: string[];
  className?: string;
}) {
  if (!typeIds || typeIds.length === 0) return null;
  const abbreviations = typeIds
    .map((id) => investorTypes.find((t) => t.id === id)?.abbreviation)
    .filter((a): a is string => Boolean(a));
  if (abbreviations.length === 0) return null;

  return (
    <span className={`flex flex-wrap items-center gap-1.5 ${className ?? ""}`}>
      {abbreviations.map((abbr) => (
        <span
          key={abbr}
          className="border border-ink bg-ink px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-background"
        >
          {abbr}
        </span>
      ))}
    </span>
  );
}
