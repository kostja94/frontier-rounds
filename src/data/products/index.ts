// 产品融资档案 loader（薄壳，2026-09-08）。
// 内容数据在 *.json，结构由 schema.ts 的 zod 收敛；结构完整性由 scripts/validate-content 校验。
import { productProfileSchema } from "./schema";

import lovable from "./lovable.json";
import mistral from "./mistral.json";
import openai from "./openai.json";
import anthropic from "./anthropic.json";
import xai from "./xai.json";
import scaleAi from "./scale-ai.json";
import safeSuperintelligence from "./safe-superintelligence.json";
import zhipu from "./zhipu.json";
import thinkingMachinesLab from "./thinking-machines-lab.json";
import ineffableIntelligence from "./ineffable-intelligence.json";
import amiLabs from "./ami-labs.json";
import worldLabs from "./world-labs.json";
import harvey from "./harvey.json";
import clay from "./clay.json";

const rawProducts = [
  lovable,
  mistral,
  openai,
  anthropic,
  xai,
  scaleAi,
  safeSuperintelligence,
  zhipu,
  thinkingMachinesLab,
  ineffableIntelligence,
  amiLabs,
  worldLabs,
  harvey,
  clay,
];

export const productProfiles = rawProducts.map((p) => productProfileSchema.parse(p));

export function getProductProfile(slug: string) {
  return productProfiles.find((p) => p.slug === slug);
}

export type { ProductProfile, CompanyRound, ProductSection } from "./schema";
