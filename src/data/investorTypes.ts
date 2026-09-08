import rawData from "./investorTypes.json";

export type InvestorType = {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  typicalStage: string;
  typicalCheckSize: string;
  examples: string[];
  aiRelevance: string;
};

// 内容数据迁移至 JSON（2026-09-08）：见 investorTypes.json
export const investorTypes: InvestorType[] = rawData.investorTypes;

export const investorSummary = {
  totalCategories: investorTypes.length,
  earliestStage: rawData.earliestStage,
  latestStage: rawData.latestStage,
};
