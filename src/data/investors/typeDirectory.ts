import { investorTypes, type InvestorType } from "@/data/investorTypes";
import { investorProfiles } from "@/data/investors/profiles";

// 类型目录薄 loader:把 investorTypes 字典与 investorProfiles 的 investorTypeIds 交叉,
// 供 /investor-types 索引页与详情页聚合展示。

export function getInvestorType(id: string): InvestorType | undefined {
  return investorTypes.find((t) => t.id === id);
}

export function getProfilesByType(id: string) {
  return investorProfiles.filter((p) => p.investorTypeIds.includes(id));
}

export type InvestorTypeSummary = InvestorType & {
  profileCount: number;
  /** 该类型下现有投资人(已打标) */
  profiles: typeof investorProfiles;
};

export function getAllTypeSummaries(): InvestorTypeSummary[] {
  return investorTypes.map((t) => {
    const profiles = getProfilesByType(t.id);
    return { ...t, profileCount: profiles.length, profiles };
  });
}
