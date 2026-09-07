// 站点级常量：metadata / canonical / sitemap 统一入口
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://frontierrounds.com";
export const SITE_NAME = "Frontier Rounds";
export const SITE_TITLE = "Frontier Rounds — AI Funding Intelligence";
export const SITE_DESCRIPTION =
  "Frontier Rounds tracks the money fueling frontier AI: funding rounds, the companies that raise them, and the investors who write the checks — with sources and confidence tags.";
export const OG_IMAGE = "/og/og-default.png"; // 上线前生成；暂缺则不填

// Google Analytics 4 衡量 ID（g4：官方 @next/third-parties 注入，无 cookie/自托管）
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-YCMXNXZENN";
