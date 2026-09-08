import { investorProfileListSchema } from "./schema";

// 内容数据迁移至 JSON（2026-09-08）：见 profiles/*.json
import lollapaloozaCapital from "./profiles/lollapalooza-capital.json";
import llamaVentures from "./profiles/llama-ventures.json";
import gradient from "./profiles/gradient.json";
import conviction from "./profiles/conviction.json";
import aixVentures from "./profiles/aix-ventures.json";
import airStreetCapital from "./profiles/air-street-capital.json";
import radicalVentures from "./profiles/radical-ventures.json";
import shunweiCapital from "./profiles/shunwei-capital.json";
import hongshan from "./profiles/hongshan.json";
import sequoiaCapital from "./profiles/sequoia-capital.json";
import andreessenHorowitz from "./profiles/andreessen-horowitz.json";
import peakXvPartners from "./profiles/peak-xv-partners.json";
import yCombinator from "./profiles/y-combinator.json";
import miraclePlus from "./profiles/miracleplus.json";
import eladGil from "./profiles/elad-gil.json";
import navalRavikant from "./profiles/naval-ravikant.json";
import natFriedman from "./profiles/nat-friedman.json";

export type { InvestorProfile, PortfolioCompany } from "./schema";

// zod parse：内容结构在加载期即校验（slug 唯一性/必需字段/类型），
// 任何 JSON 结构破坏都会在构建期暴露，而非运行时白屏。
const rawProfiles = [
  lollapaloozaCapital,
  llamaVentures,
  gradient,
  conviction,
  aixVentures,
  airStreetCapital,
  radicalVentures,
  shunweiCapital,
  hongshan,
  sequoiaCapital,
  andreessenHorowitz,
  peakXvPartners,
  yCombinator,
  miraclePlus,
  eladGil,
  navalRavikant,
  natFriedman,
];

export const investorProfiles = investorProfileListSchema.parse(rawProfiles);

export function getInvestorProfile(slug: string) {
  return investorProfiles.find((profile) => profile.slug === slug);
}
