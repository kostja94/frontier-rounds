import type { InvestorProfile } from "./profiles";
import { peakXvLogos, peakXvMarkUrl } from "./peakXvLogos";

export const peakXvPartners: InvestorProfile = {
  slug: "peak-xv-partners",
  name: "Peak XV Partners",
  mark: peakXvMarkUrl,
  tagline: "India and Southeast Asia's largest venture franchise, backing applied AI over frontier models",
  website: "https://www.peakxv.com/",
  websiteLabel: "peakxv.com",
  summary:
    "Peak XV Partners is the India and Southeast Asia business formerly known as Sequoia Capital India, renamed in 2023 and fully independent since the March 2024 completion of the global partnership's three-way split — it is a separate partnership from Sequoia Capital in the US and HongShan in China, and the portfolio below is its own. Led by Shailendra Singh from Bengaluru and Singapore, the firm manages more than US$9B across venture and growth funds and runs the Surge seed programme. Its AI strategy is deliberately application-first: rather than funding frontier parameter races, it backs sovereign-language models, data and GPU infrastructure for Indian enterprises, and AI-native software where distribution across India and Southeast Asia is the moat.",
  facts: [
    { label: "Founded", value: "2006 (independent since 2024)" },
    { label: "Headquarters", value: "Bengaluru / Singapore" },
    { label: "Leadership", value: "Shailendra Singh, managing director" },
    { label: "Type", value: "Venture and growth partnership" },
    { label: "Stage", value: "Seed (Surge) to growth" },
    { label: "Disclosed AI portfolio", value: "12+ companies" },
  ],
  thesis: [
    {
      heading: "Applied AI, not the parameter race",
      body: "The firm has said publicly it will not chase frontier model economics from India. Capital goes instead to teams applying models to workflows where Indian and Southeast Asian distribution, language coverage and cost structure create defensibility.",
    },
    {
      heading: "Sovereign models and local languages",
      body: "Sarvam AI is the anchor position: an Indic-language foundation model company selected under the IndiaAI Mission, with Peak XV among its earliest backers. Adjacent bets cover speech, translation and voice agents for languages global labs underserve.",
    },
    {
      heading: "Picks and shovels for enterprise adoption",
      body: "Atlan for the metadata and governance layer, Neysa for GPU cloud and inference capacity — both sold into enterprises that need AI infrastructure before they can deploy models.",
    },
    {
      heading: "Surge as an AI funnel",
      body: "The Surge seed programme has become the firm's primary AI origination engine, with AI-native cohorts spanning sales, recruiting, healthcare, media and consumer tooling across India and Southeast Asia.",
    },
  ],
  portfolioGroups: [
    {
      heading: "AI portfolio",
      blurb:
        "Disclosed Peak XV AI investments across sovereign models, data and compute infrastructure, and AI-native applications in India and Southeast Asia.",
      companies: [
        {
          name: "Sarvam AI",
          logo: peakXvLogos.sarvam,
          sector: "Foundation Models",
          note: "Indic-language foundation model developer, selected under the IndiaAI Mission to build a sovereign model.",
        },
        {
          name: "Atlan",
          logo: peakXvLogos.atlan,
          sector: "Data Infrastructure",
          note: "Active metadata and data governance platform used to make enterprise data AI-ready.",
        },
        {
          name: "Neysa",
          logo: peakXvLogos.neysa,
          sector: "AI Infrastructure",
          note: "GPU cloud and AI inference platform serving Indian enterprises.",
        },
        {
          name: "Sampark AI",
          sector: "Voice AI",
          note: "Voice AI agents for Indian-language customer conversations across financial services and commerce.",
        },
        {
          name: "Observe.AI",
          logo: peakXvLogos.observeai,
          sector: "Conversation Intelligence",
          note: "AI platform for contact centre transcription, quality scoring and agent assistance.",
        },
        {
          name: "Entropik",
          logo: peakXvLogos.entropik,
          sector: "Applied AI",
          note: "Emotion and behaviour analytics using computer vision and machine learning for product research.",
        },
        {
          name: "Kula",
          logo: peakXvLogos.kula,
          sector: "AI Applications",
          note: "AI-assisted outbound recruiting workflows, a Surge company.",
        },
        {
          name: "Wingman",
          logo: peakXvLogos.wingman,
          sector: "AI Applications",
          note: "Conversation intelligence for sales calls, later acquired by Clari.",
        },
        {
          name: "Dashtoon",
          logo: peakXvLogos.dashtoon,
          sector: "Generative Media",
          note: "Generative AI comic and webtoon creation studio, a Surge company.",
        },
        {
          name: "Innovaccer",
          logo: peakXvLogos.innovaccer,
          sector: "Healthcare AI",
          note: "Healthcare data platform applying AI to care management and provider workflows.",
        },
        {
          name: "BharatX",
          logo: peakXvLogos.bharatx,
          sector: "AI in Fintech",
          note: "Embedded credit infrastructure using machine learning underwriting for Indian consumers.",
        },
        {
          name: "Gupshup",
          logo: peakXvLogos.gupshup,
          sector: "Conversational AI",
          note: "Conversational messaging and AI agent platform for emerging-market businesses.",
        },
        {
          name: "Scaler",
          logo: peakXvLogos.scaler,
          sector: "AI Education",
          note: "Upskilling platform with AI and data science programmes for working engineers.",
        },
      ],
    },
    {
      heading: "Beyond AI",
      blurb:
        "A selection of the firm's best-known non-AI positions, included for context on scale and stage rather than as a complete list.",
      companies: [
        {
          name: "Razorpay",
          logo: peakXvLogos.razorpay,
          sector: "Fintech",
          note: "Payments and business banking infrastructure for Indian merchants.",
        },
        {
          name: "Zetwerk",
          logo: peakXvLogos.zetwerk,
          sector: "Manufacturing",
          note: "Custom manufacturing marketplace for industrial components.",
        },
        {
          name: "CRED",
          logo: peakXvLogos.cred,
          sector: "Consumer Fintech",
          note: "Credit card payments and members-only financial products.",
        },
        {
          name: "Meesho",
          logo: peakXvLogos.meesho,
          sector: "E-commerce",
          note: "Value-focused social commerce marketplace.",
        },
        {
          name: "Khatabook",
          sector: "SMB Software",
          note: "Digital ledger and bookkeeping app for small Indian businesses.",
        },
        {
          name: "Mokobara",
          logo: peakXvLogos.mokobara,
          sector: "Consumer Brands",
          note: "Direct-to-consumer luggage and travel gear brand.",
        },
        {
          name: "Zomato",
          logo: peakXvLogos.zomato,
          sector: "Consumer Internet",
          note: "Food delivery and restaurant discovery platform, listed on the NSE and BSE.",
        },
      ],
    },
  ],
  investorNames: ["Peak XV Partners", "Peak XV"],
};
