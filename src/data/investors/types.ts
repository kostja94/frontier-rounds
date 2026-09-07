export type PortfolioCompany = {
  name: string;
  localName?: string;
  sector: string;
  note: string;
  url?: string;
  logo?: string;
};

export type InvestorProfile = {
  slug: string;
  name: string;
  kind?: "firm" | "person" | "accelerator";
  portrait?: string;
  localName?: string;
  mark?: string;
  lockup?: string;
  tagline: string;
  website: string;
  websiteLabel: string;
  summary: string;
  facts: { label: string; value: string }[];
  thesisHeading?: string;
  thesis: { heading: string; body: string }[];
  focusAreas?: { name: string; localName?: string }[];
  portfolioGroups: { heading: string; blurb: string; companies: PortfolioCompany[] }[];
  investorNames: string[];
};
