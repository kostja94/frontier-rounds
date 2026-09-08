import type { InvestorProfile } from "./profiles";
import { a16zLogos, a16zMarkUrl } from "./a16zLogos";

export const andreessenHorowitz: InvestorProfile = {
  slug: "andreessen-horowitz",
  name: "Andreessen Horowitz",
  kind: "firm",
  mark: a16zMarkUrl,
  tagline: "The largest dedicated AI capital pool in venture, deployed across models, infrastructure and applications",
  website: "https://a16z.com/",
  websiteLabel: "a16z.com",
  summary:
    "Andreessen Horowitz — universally shortened to a16z — was founded in Menlo Park in 2009 by Marc Andreessen and Ben Horowitz and has grown into a registered investment adviser managing roughly US$106B (March 2026 Form ADV) across seed, venture, growth, crypto, bio and American Dynamism funds. It is a generalist firm by charter but the most concentrated AI investor by dollars: it holds positions in the largest model labs, the compute and data layers beneath them, and hundreds of AI-native applications, and it publishes the sector's most-read research through a16z Enterprise and its Top 100 GenAI Apps series. Structurally it behaves less like a partnership and more like a platform, with in-house go-to-market, talent, policy and marketing teams attached to each fund.",
  facts: [
    { label: "Founded", value: "2009" },
    { label: "Headquarters", value: "Menlo Park, California" },
    { label: "Founders", value: "Marc Andreessen, Ben Horowitz" },
    { label: "Type", value: "Multi-stage venture platform (RIA)" },
    { label: "Assets under management", value: "~US$106B (Mar 2026 Form ADV)" },
    { label: "Stage", value: "Seed to growth and pre-IPO" },
    { label: "Disclosed AI portfolio", value: "25+ notable companies" },
  ],
  thesisHeading: "How a16z is playing the AI cycle",
  thesis: [
    {
      heading: "Own every layer, not one bet",
      body: "a16z deliberately funds the full stack in parallel: frontier and open-weight labs, GPU and inference infrastructure, vector and data tooling, and the application layer sitting on top. The firm's stated view is that value accrues at multiple layers at once during a platform shift, so concentration in a single tier is the real risk.",
    },
    {
      heading: "Applications are where the margin is",
      body: "Its research argues that consumer and vertical AI apps compound faster than model providers because distribution and workflow lock-in are defensible. That thesis funds Cursor, Harvey, Abridge, Sierra, Decagon and ElevenLabs — teams selling into a specific profession rather than selling tokens.",
    },
    {
      heading: "Open weights and creative tools",
      body: "The firm has been an unusually loud backer of open models and generative media, funding Black Forest Labs, Luma, Ideogram, Civitai and World Labs on the argument that open ecosystems and creator tooling expand the market rather than commoditise it.",
    },
    {
      heading: "American Dynamism and embodied AI",
      body: "Through its American Dynamism fund a16z pushes AI into defence, robotics and physical industry — Figure, Skild AI, Anduril and Waymo-adjacent autonomy — treating national-interest hardware as a distinct AI category with its own capital and policy requirements.",
    },
  ],
  portfolioGroups: [
    {
      heading: "AI portfolio",
      blurb:
        "Disclosed a16z positions across foundation models, AI infrastructure, developer tooling, generative media, vertical applications and embodied AI.",
      companies: [
        {
          name: "OpenAI",
          logo: a16zLogos.openai,
          sector: "Foundation Models",
          note: "Frontier lab behind GPT and Sora; a16z participated in later secondary and primary rounds.",
        },
        {
          name: "xAI",
          logo: a16zLogos.xai,
          sector: "Foundation Models",
          note: "Elon Musk's frontier lab building Grok and the Colossus training cluster.",
        },
        {
          name: "Mistral AI",
          logo: a16zLogos.mistral,
          sector: "Open-Weight Models",
          note: "Paris-based lab shipping open-weight and commercial models for European enterprises.",
        },
        {
          name: "Databricks",
          logo: a16zLogos.databricks,
          sector: "Data & AI Platform",
          note: "Lakehouse platform for enterprise data engineering and model training and serving.",
        },
        {
          name: "Character.AI",
          logo: a16zLogos.characterai,
          sector: "Consumer AI",
          note: "Consumer companion and roleplay platform; a16z led its US$150M Series A.",
        },
        {
          name: "Cursor (Anysphere)",
          logo: a16zLogos.cursor,
          sector: "AI Coding",
          note: "AI-native code editor and agent, one of the fastest-scaling software businesses in the portfolio.",
        },
        {
          name: "Windsurf",
          logo: a16zLogos.windsurf,
          sector: "AI Coding",
          note: "Agentic IDE and code completion platform formerly known as Codeium.",
        },
        {
          name: "Replit",
          logo: a16zLogos.replit,
          sector: "AI Development",
          note: "Browser-based development environment with agents that build and deploy full applications.",
        },
        {
          name: "ElevenLabs",
          logo: a16zLogos.elevenlabs,
          sector: "Voice AI",
          note: "Speech synthesis, dubbing and voice agent platform used across media and software.",
        },
        {
          name: "Black Forest Labs",
          logo: a16zLogos.blackforest,
          sector: "Image Models",
          note: "Creators of the FLUX open-weight image model family, spun out of the Stable Diffusion team.",
        },
        {
          name: "Luma AI",
          logo: a16zLogos.luma,
          sector: "Video Models",
          note: "Multimodal video and 3D generation lab behind Dream Machine and Ray.",
        },
        {
          name: "Ideogram",
          logo: a16zLogos.ideogram,
          sector: "Image Models",
          note: "Text-to-image model with best-in-class typography rendering.",
        },
        {
          name: "World Labs",
          logo: a16zLogos.worldlabs,
          sector: "Spatial AI",
          note: "Fei-Fei Li's large world model company generating navigable 3D scenes.",
        },
        {
          name: "Civitai",
          logo: a16zLogos.civitai,
          sector: "Open Model Community",
          note: "Model and LoRA sharing hub for the open-weight image generation community.",
        },
        {
          name: "Harvey",
          logo: a16zLogos.harvey,
          sector: "Legal AI",
          note: "Domain-specific AI platform for elite law firms and in-house legal teams.",
        },
        {
          name: "Abridge",
          logo: a16zLogos.abridge,
          sector: "Healthcare AI",
          note: "Ambient clinical documentation converting patient conversations into structured notes.",
        },
        {
          name: "Sierra",
          logo: a16zLogos.sierra,
          sector: "AI Agents",
          note: "Bret Taylor's conversational agent platform for enterprise customer experience.",
        },
        {
          name: "Decagon",
          logo: a16zLogos.decagon,
          sector: "AI Agents",
          note: "AI support agents resolving customer tickets end to end for consumer brands.",
        },
        {
          name: "Cresta",
          logo: a16zLogos.cresta,
          sector: "Contact Centre AI",
          note: "Real-time agent coaching and conversation intelligence for large contact centres.",
        },
        {
          name: "Hebbia",
          logo: a16zLogos.hebbia,
          sector: "Knowledge Work AI",
          note: "Matrix-style document reasoning used by asset managers and advisory firms.",
        },
        {
          name: "Pinecone",
          logo: a16zLogos.pinecone,
          sector: "AI Infrastructure",
          note: "Managed vector database powering retrieval-augmented generation workloads.",
        },
        {
          name: "Together AI",
          logo: a16zLogos.together,
          sector: "AI Infrastructure",
          note: "GPU cloud and inference platform specialised in open-model training and serving.",
        },
        {
          name: "Figure",
          logo: a16zLogos.figure,
          sector: "Humanoid Robotics",
          note: "Humanoid robot developer targeting logistics and manufacturing labour.",
        },
        {
          name: "Skild AI",
          logo: a16zLogos.skild,
          sector: "Robotics Foundation Models",
          note: "General-purpose robot brain trained across hardware form factors.",
        },
      ],
    },
    {
      heading: "Beyond AI",
      blurb:
        "A selection of the firm's best-known non-AI positions, included for context on scale and mandate rather than as a complete list.",
      companies: [
        {
          name: "Anduril",
          logo: a16zLogos.anduril,
          sector: "Defence Technology",
          note: "Autonomous defence systems and the Lattice command software platform.",
        },
        {
          name: "Waymo",
          logo: a16zLogos.waymo,
          sector: "Autonomous Vehicles",
          note: "Alphabet's robotaxi business; a16z joined its external growth rounds.",
        },
      ],
    },
  ],
  investorNames: ["Andreessen Horowitz", "a16z"],
};
