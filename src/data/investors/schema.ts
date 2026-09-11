// 内容数据 schema（zod 权威源，2026-09-08）。
// 页面/组件仍从 ./types 导入类型（见 types.ts re-export），本文件只负责:
//   1) 把 JSON 内容的运行时结构校验收敛到一处（profiles.ts loader 使用）
//   2) 从单一 zod 定义推导 TS 类型，避免手写类型与数据 schema 双源漂移
import { z } from "zod";

const portfolioCompanySchema = z.object({
  name: z.string(),
  localName: z.string().optional(),
  sector: z.string(),
  note: z.string(),
  url: z.string().optional(),
  logo: z.string().optional(),
});

export const portfolioGroupSchema = z.object({
  heading: z.string(),
  blurb: z.string(),
  companies: z.array(portfolioCompanySchema),
});

export const investorProfileSchema = z.object({
  slug: z.string(),
  name: z.string(),
  kind: z.enum(["firm", "person", "accelerator"]).optional(),
  /** 关联 investorTypes.json 的 id(可多值,如 angel + family-office) */
  investorTypeIds: z.array(z.string()).default([]),
  portrait: z.string().optional(),
  localName: z.string().optional(),
  mark: z.string().optional(),
  lockup: z.string().optional(),
  tagline: z.string(),
  website: z.string(),
  websiteLabel: z.string(),
  summary: z.string(),
  shortSummary: z.string(),
  longSummary: z.string().optional(),
  facts: z.array(z.object({ label: z.string(), value: z.string() })),
  thesisHeading: z.string().optional(),
  thesis: z.array(z.object({ heading: z.string(), body: z.string() })),
  focusAreas: z
    .array(z.object({ name: z.string(), localName: z.string().optional() }))
    .optional(),
  portfolioGroups: z.array(portfolioGroupSchema),
  investorNames: z.array(z.string()),
});

export const investorProfileListSchema = z.array(investorProfileSchema);

// ---- 从 schema 推导类型（./types 仅 re-export，避免双源）----
export type PortfolioCompany = z.infer<typeof portfolioCompanySchema>;
export type PortfolioGroup = z.infer<typeof portfolioGroupSchema>;
export type InvestorProfile = z.infer<typeof investorProfileSchema>;
