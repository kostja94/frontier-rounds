// 产品融资档案 loader（薄壳，2026-09-08）。
// 内容数据在 *.json，结构由 schema.ts 的 zod 收敛；结构完整性由 scripts/validate-content 校验。
import { productProfileSchema } from "./schema";

import lovable from "./lovable.json";
import mistral from "./mistral.json";

const rawProducts = [lovable, mistral];

export const productProfiles = rawProducts.map((p) => productProfileSchema.parse(p));

export function getProductProfile(slug: string) {
  return productProfiles.find((p) => p.slug === slug);
}

export type { ProductProfile, CompanyRound, ProductSection } from "./schema";
