// 产品融资档案 schema（zod 权威，2026-09-08）。
// 与 investor schema 平行：每个「产品/公司融资 timeline」一份 JSON，rounds[] 存逐轮明细。
import { z } from "zod";

const companyRoundSchema = z.object({
  date: z.string(), // ISO YYYY-MM-DD
  label: z.string(), // "Series C" / "Seed" ...
  amountUsd: z.number().optional(),
  valuationUsd: z.number().optional(),
  leads: z.array(z.string()).default([]),
  participants: z.array(z.string()).default([]),
  note: z.string().optional(),
  sourceUrl: z.string().optional(),
});

const productSectionSchema = z.object({
  heading: z.string(),
  body: z.string(),
});

export const productProfileSchema = z.object({
  slug: z.string(),
  name: z.string(),
  kind: z.literal("product"),
  logo: z.string().optional(),
  localName: z.string().optional(),
  tagline: z.string(),
  website: z.string(),
  websiteLabel: z.string(),
  shortSummary: z.string(),
  summary: z.string(),
  facts: z.array(z.object({ label: z.string(), value: z.string() })),
  rounds: z.array(companyRoundSchema),
  // 叙述性章节：公司故事/产品/增长/竞争/风险等，页面正文与 md 转录共用
  sections: z.array(productSectionSchema),
});

export type CompanyRound = z.infer<typeof companyRoundSchema>;
export type ProductSection = z.infer<typeof productSectionSchema>;
export type ProductProfile = z.infer<typeof productProfileSchema>;
