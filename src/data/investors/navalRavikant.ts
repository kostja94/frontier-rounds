import type { InvestorProfile } from "./types";
import { angelLogos, angelPortraits } from "./angelLogos";

export const navalRavikant: InvestorProfile = {
  slug: "naval-ravikant",
  name: "Naval Ravikant",
  kind: "person",
  portrait: angelPortraits.navalRavikant,
  tagline: "AngelList founder who turned angel investing itself into a platform",
  website: "https://nav.al/",
  websiteLabel: "nav.al",
  summary:
    "Naval Ravikant co-founded AngelList and, in doing so, industrialised the asset class he invests in: syndicates and rolling funds let thousands of individuals write the kind of early cheques he had been writing personally since the mid-2000s. He is based in San Francisco, has roughly 140 disclosed personal investments including Uber and Twitter, and is as widely read for his writing on wealth and judgement as for any single deal. His exposure to the current AI wave runs mostly through AngelList's platform rather than named personal cheques, so this page separates the two.",
  facts: [
    { label: "Role", value: "Co-founder, AngelList; angel investor" },
    { label: "Based", value: "San Francisco, CA" },
    { label: "Background", value: "Epinions, Vast.com, AngelList" },
    { label: "Disclosed deals", value: "~138" },
    { label: "Stage", value: "Pre-seed and seed" },
    { label: "Vehicle", value: "Personal capital plus AngelList syndicates" },
  ],
  thesisHeading: "How Naval Ravikant deploys capital",
  thesis: [
    {
      heading: "Platform over portfolio",
      body: "His largest contribution to AI financing is structural. AngelList syndicates, rolling funds and SPVs route retail and operator capital into early AI rounds that traditional funds would price out of reach.",
    },
    {
      heading: "Volume at the earliest stage",
      body: "Small cheques written very early and very often, on the view that a handful of extreme outcomes carry the entire book. Ownership discipline matters less to him than access.",
    },
    {
      heading: "Judge the founder, not the model",
      body: "His public writing treats specific knowledge, leverage and accountability in the founder as the durable signal — a stance that transfers across technology cycles rather than being tuned to this one.",
    },
    {
      heading: "Attribution caveat",
      body: "Syndicate deals structured on AngelList are often misreported as his personal positions. The AI entries below are limited to companies where his own involvement is documented.",
    },
  ],
  portfolioGroups: [
    {
      heading: "AI and AI-adjacent portfolio",
      blurb:
        "Documented positions where AI is now central to the product. Companies reached only through AngelList syndicates are deliberately excluded.",
      companies: [
        {
          name: "Notion",
          logo: angelLogos.notion,
          sector: "AI Productivity",
          note: "Backed as a workspace tool; now ships AI writing, search and agents across its entire surface.",
        },
        {
          name: "Stack Overflow",
          logo: angelLogos.stackoverflow,
          sector: "Developer Data",
          note: "Developer Q&A corpus that became one of the most valuable training and licensing datasets for code models.",
        },
        {
          name: "OpenAI",
          logo: angelLogos.openai,
          sector: "Foundation Models",
          note: "Frequently attributed to him in secondary lists; a direct personal position is not publicly documented and should be treated as unconfirmed.",
        },
      ],
    },
    {
      heading: "Selected earlier bets",
      blurb:
        "The angel track record, concentrated in marketplaces and networks between 2007 and 2018, that made AngelList credible.",
      companies: [
        {
          name: "Uber",
          logo: angelLogos.uber,
          sector: "Marketplace",
          note: "One of the most cited early angel positions in the category.",
        },
        {
          name: "Twitter",
          sector: "Social",
          note: "Early participation in the network before its public listing.",
          url: "https://x.com/",
        },
        {
          name: "Postmates",
          logo: angelLogos.postmates,
          sector: "Delivery",
          note: "On-demand delivery network, later acquired by Uber.",
        },
        {
          name: "Yammer",
          logo: angelLogos.yammer,
          sector: "Enterprise Social",
          note: "Enterprise social network acquired by Microsoft.",
        },
        {
          name: "Foursquare",
          logo: angelLogos.foursquare,
          sector: "Location Data",
          note: "Check-in app that became a location-intelligence data business.",
        },
        {
          name: "Wish",
          logo: angelLogos.wish,
          sector: "Commerce",
          note: "Cross-border discovery commerce marketplace.",
        },
      ],
    },
  ],
  investorNames: ["Naval Ravikant"],
};
