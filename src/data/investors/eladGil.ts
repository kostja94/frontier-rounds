import type { InvestorProfile } from "./types";
import { angelLogos, angelPortraits } from "./angelLogos";

export const eladGil: InvestorProfile = {
  slug: "elad-gil",
  name: "Elad Gil",
  kind: "person",
  portrait: angelPortraits.eladGil,
  tagline: "Solo angel writing early checks into the AI stack without a committee",
  website: "https://eladgil.com/",
  websiteLabel: "eladgil.com",
  summary:
    "Elad Gil is a San Francisco based solo investor, former Google product lead and Twitter VP, founder of Mixer Labs and Color Genomics, and author of High Growth Handbook. He deploys personal capital with no investment committee and no fund brand to defend, which lets him commit inside days and stay with founders through hiring, pricing and org design. Around 140 disclosed investments make him one of the most cited individual backers of the current AI cycle, with positions across model labs, AI search and vertical AI software.",
  facts: [
    { label: "Role", value: "Solo angel and seed investor" },
    { label: "Based", value: "San Francisco, CA" },
    { label: "Background", value: "Google, Twitter VP; founded Color Genomics" },
    { label: "Disclosed deals", value: "~140" },
    { label: "Stage", value: "Pre-seed to growth" },
    { label: "Process", value: "Individual decision, no committee" },
  ],
  thesisHeading: "How Elad Gil picks AI companies",
  thesis: [
    {
      heading: "Speed as the edge",
      body: "With personal capital and no partnership vote, he can decide in a single meeting. In competitive AI rounds that speed is often what buys allocation ahead of institutional funds.",
    },
    {
      heading: "Both ends of the stack",
      body: "He holds positions in frontier labs and in the application layer that sells to enterprises, rather than picking one side of the model-versus-app debate.",
    },
    {
      heading: "Operator coaching after the check",
      body: "The High Growth Handbook thesis in practice: he works with founders on executive hiring, org structure and pricing during the scaling phase where most AI startups break.",
    },
    {
      heading: "Category-defining, not category-crowding",
      body: "He concentrates on the company most likely to define a category — AI search, AI legal, enterprise AI search — instead of spreading small checks across every entrant.",
    },
  ],
  portfolioGroups: [
    {
      heading: "AI portfolio",
      blurb:
        "Disclosed AI positions reported in funding announcements and press coverage, spanning model labs, AI-native search and vertical software.",
      companies: [
        {
          name: "Anthropic",
          logo: angelLogos.anthropic,
          sector: "Foundation Models",
          note: "AI safety lab behind the Claude model family; an early individual position widely reported in cap-table coverage.",
        },
        {
          name: "Perplexity",
          logo: angelLogos.perplexity,
          sector: "AI Search",
          note: "AI answer engine competing directly with general web search; he has backed successive rounds.",
        },
        {
          name: "Harvey",
          logo: angelLogos.harvey,
          sector: "Legal AI",
          note: "Generative AI for law firms and in-house legal teams, sold to the largest global partnerships.",
        },
        {
          name: "Glean",
          logo: angelLogos.glean,
          sector: "Enterprise Search",
          note: "AI assistant and search layer over internal company knowledge and SaaS systems.",
        },
        {
          name: "Character.AI",
          logo: angelLogos.characterai,
          sector: "Consumer AI",
          note: "Conversational AI characters with one of the highest consumer engagement profiles in the sector.",
        },
        {
          name: "Mistral AI",
          logo: angelLogos.mistral,
          sector: "Foundation Models",
          note: "European open-weight model lab; he participated in its early financing.",
        },
        {
          name: "Cursor",
          logo: angelLogos.cursor,
          sector: "AI Coding",
          note: "Anysphere's AI-native code editor, one of the fastest revenue ramps in developer tooling.",
        },
        {
          name: "Runway",
          logo: angelLogos.runway,
          sector: "Generative Media",
          note: "Generative video models and editing tools used in film and advertising production.",
        },
      ],
    },
    {
      heading: "Selected earlier bets",
      blurb:
        "A partial list of pre-AI investments that established his track record and his access to later rounds.",
      companies: [
        {
          name: "Airbnb",
          logo: angelLogos.airbnb,
          sector: "Marketplace",
          note: "Early investment ahead of the travel marketplace's public listing.",
        },
        {
          name: "Stripe",
          logo: angelLogos.stripe,
          sector: "Fintech",
          note: "Payments infrastructure; among his most cited early positions.",
        },
        {
          name: "Coinbase",
          logo: angelLogos.coinbase,
          sector: "Crypto",
          note: "Backed the exchange years before its direct listing.",
        },
        {
          name: "Notion",
          logo: angelLogos.notion,
          sector: "Productivity",
          note: "Workspace software that has since become an AI distribution surface.",
        },
        {
          name: "Instacart",
          logo: angelLogos.instacart,
          sector: "Commerce",
          note: "Grocery delivery marketplace, later public.",
        },
        {
          name: "Pinterest",
          logo: angelLogos.pinterest,
          sector: "Consumer",
          note: "Visual discovery network; early angel participation.",
        },
        {
          name: "Gusto",
          logo: angelLogos.gusto,
          sector: "HR Software",
          note: "Payroll and benefits platform for small businesses.",
        },
      ],
    },
  ],
  investorNames: ["Elad Gil"],
};
