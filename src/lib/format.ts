/** 金额/日期展示格式化（产品档案页面共用，2026-09-08）。 */

export function formatUsdCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    const value = amount / 1_000_000_000;
    return `$${trimTrailingZero(value)}B`;
  }
  const value = amount / 1_000_000;
  return `$${trimTrailingZero(value)}M`;
}

function trimTrailingZero(value: number): string {
  if (value % 1 === 0) return String(value);
  // 保留最多两位小数并去掉尾零（如 7.5 → "7.5"、13.3 → "13.3"）
  const fixed = value.toFixed(2);
  return fixed.replace(/\.?0+$/, "");
}

export function formatRoundDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
