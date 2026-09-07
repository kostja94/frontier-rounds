import type { InvestorProfile } from "./profiles";
import { companyLogos } from "./logos";


export const lollapaloozaCapital: InvestorProfile = {
  slug: "lollapalooza-capital",
  name: "Lollapalooza Capital",
  mark: "/logos/lollapalooza-mark.png",
  lockup: "/logos/lollapalooza-capital.png",
  tagline: "Research-driven venture capital backing frontier AI founders",
  website: "https://lollapalooza.hk/",
  websiteLabel: "lollapalooza.hk",
  summary:
    "Founded in 2025 by Huiwen Wang, co-founder of Meituan (SEHK:3690), Lollapalooza Capital is a Hong Kong based, founder-led investment firm and family office that channels operator experience from building one of China's largest consumer internet platforms into AI. It combines primary market conviction with public market perspective, backing category-defining founders across large language models, AI infrastructure, consumer and enterprise AI applications, intelligent hardware, and embodied intelligence.",
  facts: [
    { label: "Founded", value: "2025" },
    { label: "Headquarters", value: "Hong Kong" },
    { label: "Founder", value: "Huiwen Wang — Meituan co-founder" },
    { label: "Type", value: "Founder-led VC / family capital" },
    { label: "Stage", value: "Early and growth" },
    { label: "Disclosed portfolio", value: "25+ companies" },
  ],
  thesis: [
    {
      heading: "The name",
      body: "Taken from Charlie Munger's \"Lollapalooza Effect\" — the idea that several reinforcing forces acting together produce non-linear, exceptional outcomes rather than an additive one.",
    },
    {
      heading: "Investment approach",
      body: "Concentrated research and patient capital. The firm blends one-on-one founder partnership with a public market lens, holding a small number of high-conviction positions instead of spraying across a category.",
    },
    {
      heading: "What it brings",
      body: "Operator empathy from building a company at scale, market perspective across the Chinese and global consumer internet, and long-horizon judgment on where compute, models, and hardware converge.",
    },
  ],
  portfolioGroups: [
    {
      heading: "AI-native",
      blurb:
        "Companies building models, infrastructure, and applications where AI is the product itself.",
      companies: [
        {
          name: "Moonshot AI",
          logo: companyLogos["moonshot"],
          sector: "Foundation Models",
          note: "Long-context LLM lab behind the Kimi assistant.",
          url: "https://www.kimi.com/",
        },
        {
          name: "Butterfly Effect",
          logo: companyLogos["butterflyeffect"],
          sector: "Agents",
          note: "Developer of Manus, a general-purpose autonomous agent.",
          url: "https://manus.im/",
        },
        {
          name: "Pixverse",
          logo: companyLogos["pixverse"],
          sector: "Generative Video",
          note: "Text and image to video generation platform.",
          url: "https://app.pixverse.ai/",
        },
        {
          name: "Sand AI",
          logo: companyLogos["sand"],
          sector: "Generative Video",
          note: "Video generation research lab and creator tooling.",
          url: "https://sand.ai/",
        },
        {
          name: "SiliconFlow",
          logo: companyLogos["siliconflow"],
          sector: "AI Infrastructure",
          note: "Model serving and inference acceleration cloud.",
          url: "https://siliconflow.cn/",
        },
        {
          name: "19Pine",
          logo: companyLogos["19pine"],
          sector: "Consumer AI",
          note: "AI advocate that negotiates with companies on a consumer's behalf.",
          url: "https://www.19pine.ai/",
        },
        {
          name: "Trooly",
          logo: companyLogos["trooly"],
          sector: "Applied AI",
          note: "AI product studio focused on trust and verification workflows.",
          url: "https://www.trooly.ai/",
        },
        {
          name: "Maxgent",
          logo: companyLogos["maxgent"],
          sector: "Agents",
          note: "Agent platform for enterprise task automation.",
          url: "https://maxgent.ai/",
        },
        {
          name: "Efflora",
          logo: companyLogos["efflora"],
          sector: "Applied AI",
          note: "AI systems for accessibility and equitable service delivery.",
          url: "https://efflora-ai.com/",
        },
        {
          name: "Cosmo",
          logo: companyLogos["cosmo"],
          sector: "Consumer AI",
          note: "Consumer AI companion and assistant product.",
          url: "https://cosmoai.com/",
        },
        {
          name: "Nie Ta",
          logo: companyLogos["nieta"],
          sector: "AI Creation",
          note: "Community platform for AI-generated character art.",
          url: "https://nieta.art/",
        },
        {
          name: "Boxlite",
          logo: companyLogos["boxlite"],
          sector: "AI Infrastructure",
          note: "Lightweight runtime tooling for AI workloads.",
          url: "https://boxlite.ai/",
        },
        {
          name: "Slock",
          logo: companyLogos["slock"],
          sector: "Applied AI",
          note: "AI-driven operations software.",
          url: "https://slock.ai/",
        },
        {
          name: "CreativeFitting",
          logo: companyLogos["creativefitting"],
          sector: "Generative Marketing",
          note: "AI video generation for commerce and advertising.",
          url: "https://creativefitting.cn/",
        },
        {
          name: "Citro Labs",
          logo: companyLogos["citrolabs"],
          sector: "Consumer AI",
          note: "Consumer app studio behind the Ego product line.",
          url: "https://lite.ego.app/",
        },
        { name: "Share AI", logo: companyLogos["shareai"], sector: "AI Infrastructure", note: "Distributed compute and model sharing." },
        { name: "ACERA", logo: companyLogos["acera"], sector: "Robotics", note: "Embodied intelligence and robotics systems." },
      ],
    },
    {
      heading: "Adjacent and legacy",
      blurb:
        "Portfolio and partner companies in hardware, internet, and software that predate or sit alongside the AI mandate.",
      companies: [
        {
          name: "Li Auto",
          logo: companyLogos["liauto"],
          sector: "Intelligent Hardware",
          note: "NASDAQ/SEHK-listed EV maker with in-house autonomy stack.",
          url: "https://www.lixiang.com/",
        },
        {
          name: "Yuanfudao",
          logo: companyLogos["yuanfudao"],
          sector: "Education",
          note: "Online education group, now expanding into AI learning products.",
          url: "https://www.yuanfudao.com/",
        },
        {
          name: "Waterdrop",
          logo: companyLogos["waterdrop"],
          sector: "Insurtech",
          note: "NYSE-listed insurance and healthcare platform.",
          url: "https://www.waterdrop-inc.com/",
        },
        {
          name: "Viture",
          logo: companyLogos["viture"],
          sector: "Intelligent Hardware",
          note: "Consumer XR glasses for media and gaming.",
          url: "https://www.viture.com/",
        },
        {
          name: "Hungry Studio",
          logo: companyLogos["hungrystudio"],
          sector: "Consumer",
          note: "Consumer product and content studio.",
          url: "https://www.hungrystudio.com/",
        },
        {
          name: "SwiftX",
          logo: companyLogos["swiftx"],
          sector: "Logistics",
          note: "Cross-border express and fulfilment network.",
          url: "https://swiftx-express.com/",
        },
        { name: "Savelots", logo: companyLogos["savelots"], sector: "Retail", note: "Value-oriented offline retail chain." },
      ],
    },
  ],
  investorNames: ["Lollapalooza Capital", "L10A"],
};
