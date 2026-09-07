import type { InvestorProfile } from "./types";
import { miraclePlusLogos, miraclePlusMarkUrl } from "./acceleratorLogos";

export const miraclePlus: InvestorProfile = {
  slug: "miracleplus",
  name: "MiraclePlus",
  kind: "accelerator",
  mark: miraclePlusMarkUrl,
  tagline: "China's YC-style accelerator, buying frontier technology at pre-seed prices",
  website: "https://www.miracleplus.com/",
  websiteLabel: "miracleplus.com",
  summary:
    "MiraclePlus was founded in 2019 in Beijing by Lu Qi, the former Microsoft executive vice president and Baidu group president, as the independent successor to YC China after Y Combinator withdrew from the market. It runs the same shape of programme as its predecessor — two accelerator batches a year, a standard $300,000 cheque for 7% equity, three months of weekly partner office hours, and a Demo Day in front of more than a thousand investors — but applies it to Chinese hard-technology founders rather than consumer software. Ten batches in, the firm reports 612 funded startups, roughly 1,500 alumni founders and a combined portfolio valuation near RMB 90B, with a portfolio that skews heavily toward embodied intelligence, AI infrastructure and agent products.",
  facts: [
    { label: "Founded", value: "2019 (successor to YC China)" },
    { label: "Headquarters", value: "Beijing" },
    { label: "Leadership", value: "Lu Qi, founder and chairman" },
    { label: "Type", value: "Accelerator" },
    { label: "Standard deal", value: "$300K for 7% equity" },
    { label: "Portfolio", value: "612 startups across 10 batches" },
  ],
  thesisHeading: "How MiraclePlus underwrites AI",
  thesis: [
    {
      heading: "Frontier technology at the earliest price",
      body: "The firm states that over 99% of its investments sit in frontier innovation fields, and it deliberately funds projects other investors consider too early or too technical — buying deep-tech risk at a fixed pre-seed valuation rather than competing in priced rounds.",
    },
    {
      heading: "Product-market fit in three months",
      body: "The programme's stated objective is to get a company ready to face investors within three months. Partners including Lu Qi run weekly one-on-one office hours — around 100 hours per project on average — focused on the single constraint blocking traction.",
    },
    {
      heading: "Robotics and embodied intelligence",
      body: "The most concentrated cluster in the portfolio: mobile robots, tactile sensing, actuators and simulation data. It reflects a view that China's manufacturing base gives embodied AI a cost and iteration advantage no software-only market can match.",
    },
    {
      heading: "Compute and agents as the second axis",
      body: "Alongside hardware, the firm backs the inference and agent layer — SiliconFlow for model serving, HPC-AI Tech for distributed training, and consumer agent products such as Fellou and Macaron built by alumni founders.",
    },
  ],
  portfolioGroups: [
    {
      heading: "AI portfolio",
      blurb:
        "MiraclePlus-backed AI companies highlighted by the firm, spanning model infrastructure, embodied intelligence and agent products.",
      companies: [
        {
          name: "SiliconFlow",
          localName: "硅基流动",
          logo: miraclePlusLogos.siliconflow,
          sector: "AI Infrastructure",
          url: "https://siliconflow.cn/",
          note: "Model inference and serving platform giving developers low-cost access to open-source and Chinese foundation models.",
        },
        {
          name: "HPC-AI Tech",
          localName: "潞晨科技",
          logo: miraclePlusLogos.hpcai,
          sector: "AI Infrastructure",
          url: "https://hpc-ai.com/",
          note: "Creator of Colossal-AI, an open-source system for distributed large-model training and inference.",
        },
        {
          name: "LightWheel AI",
          localName: "光轮智能",
          logo: miraclePlusLogos.lightwheel,
          sector: "Embodied Intelligence",
          url: "https://lightwheel.ai/",
          note: "Synthetic data and simulation platform supplying training data for robotics and autonomous driving models.",
        },
        {
          name: "Paxini",
          localName: "帕西尼感知",
          logo: miraclePlusLogos.paxini,
          sector: "Embodied Intelligence",
          url: "https://www.paxini.com/",
          note: "Multi-dimensional tactile sensors and humanoid robots built around touch as the primary modality.",
        },
        {
          name: "Standard Robots",
          localName: "斯坦德机器人",
          logo: miraclePlusLogos.standardRobots,
          sector: "Robotics",
          url: "https://www.standard-robots.com/",
          note: "Autonomous mobile robots for factory and warehouse logistics in electronics manufacturing.",
        },
        {
          name: "Fellou",
          logo: miraclePlusLogos.fellou,
          sector: "AI Agents",
          url: "https://fellou.ai/",
          note: "Agentic browser that plans and executes multi-step web tasks on the user's behalf.",
        },
        {
          name: "Macaron",
          localName: "马卡龙",
          logo: miraclePlusLogos.macaron,
          sector: "AI Agents",
          url: "https://macaron.im/",
          note: "Consumer agent that generates small personal apps and workflows from natural-language requests.",
        },
        {
          name: "Zeroerr",
          localName: "本末科技",
          sector: "Robotics",
          note: "Direct-drive motors and actuator modules used in robot joints and precision motion systems.",
        },
        {
          name: "Jiliu Technology",
          localName: "基流科技",
          sector: "AI Infrastructure",
          note: "High-performance networking and interconnect for AI training clusters.",
        },
        {
          name: "Jiutian Ruixin",
          localName: "九天睿芯",
          sector: "AI Chips",
          note: "Analogue in-memory computing chips for always-on, low-power edge perception.",
        },
        {
          name: "Gravity",
          localName: "万有引力",
          sector: "AI Chips",
          note: "Domain-specific processors targeting data-centre workloads and AI acceleration.",
        },
        {
          name: "Jike Technology",
          localName: "极壳科技",
          sector: "AI Hardware",
          note: "Consumer AI hardware and interaction devices built by an alumni founding team.",
        },
      ],
    },
  ],
  investorNames: ["MiraclePlus", "奇绩创坛"],
};
