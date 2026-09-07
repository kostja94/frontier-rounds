import type { InvestorProfile } from "./types";

import { lollapaloozaCapital } from "./lollapaloozaCapital";
import { shunweiCapital } from "./shunweiCapital";
import { hongshan } from "./hongshan";
import { sequoiaCapital } from "./sequoiaCapital";
import { andreessenHorowitz } from "./andreessenHorowitz";
import { peakXvPartners } from "./peakXvPartners";
import { eladGil } from "./eladGil";
import { navalRavikant } from "./navalRavikant";
import { natFriedman } from "./natFriedman";
import { yCombinator } from "./yCombinator";
import { miraclePlus } from "./miraclePlus";

export type { InvestorProfile, PortfolioCompany } from "./types";

export const investorProfiles: InvestorProfile[] = [
  lollapaloozaCapital,
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

export function getInvestorProfile(slug: string): InvestorProfile | undefined {
  return investorProfiles.find((profile) => profile.slug === slug);
}
