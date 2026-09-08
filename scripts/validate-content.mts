// 内容数据完整性校验（2026-09-08，数据 JSON 化后新增）。
// 校验范围:
//   1) investor profiles JSON   —— zod 结构、slug 唯一、mark/portrait/company logo 文件存在
//   2) fundingLeaderboard.json  —— zod 结构、tier 枚举、lead slug 必须对应某个 profile
//   3) investorTypes.json       —— zod 结构、id 唯一
// 运行: npm run validate:content
// 目的: 取代旧 TS 数据文件在编译期提供的部分保证（*.Logos.ts 已删），
//       在 CI/本地作为内容闸门，数据损坏/漏文件在构建前即暴露。
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_LOGOS = join(ROOT, "public/logos");
const PROFILES_DIR = join(ROOT, "src/data/investors/profiles");

const errors: string[] = [];
const warn: string[] = [];
const check = (cond: boolean, msg: string) => {
  if (!cond) errors.push(msg);
};
const checkWarn = (cond: boolean, msg: string) => {
  if (!cond) warn.push(msg);
};

// ---------- schema（与 src/data/investors/schema.ts 对齐） ----------
const companySchema = z.object({
  name: z.string().min(1),
  sector: z.string(),
  note: z.string(),
  url: z.string().optional(),
  logo: z.string().optional(),
});
const profileSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  kind: z.enum(["firm", "person", "accelerator"]).optional(),
  portrait: z.string().optional(),
  localName: z.string().optional(),
  mark: z.string().optional(),
  lockup: z.string().optional(),
  tagline: z.string().min(1),
  website: z.string().min(1),
  websiteLabel: z.string(),
  summary: z.string().min(10),
  facts: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  thesis: z.array(z.object({ heading: z.string(), body: z.string() })).min(1),
  portfolioGroups: z
    .array(
      z.object({
        heading: z.string().min(1),
        blurb: z.string(),
        companies: z.array(companySchema),
      }),
    )
    .min(1),
  investorNames: z.array(z.string().min(1)).min(1),
});

// ---------- 1) profiles ----------
const profileFiles = readdirSync(PROFILES_DIR).filter((f) => f.endsWith(".json"));
check(profileFiles.length >= 1, `no profile json in ${PROFILES_DIR}`);

const profileList = profileFiles.map((f) => {
  try {
    return JSON.parse(readFileSync(join(PROFILES_DIR, f), "utf8"));
  } catch (e) {
    errors.push(`profile ${f}: JSON parse error: ${(e as Error).message}`);
    return null;
  }
});
const validProfiles = profileList.filter((p): p is z.infer<typeof profileSchema> => p !== null);

for (const [i, p] of profileList.entries()) {
  if (p === null) continue;
  const name = profileFiles[i];
  const parsed = profileSchema.safeParse(p);
  if (!parsed.success) {
    errors.push(`profile ${name}: schema fail: ${parsed.error.issues.map((x) => `${x.path.join(".")} ${x.message}`).join("; ")}`);
    continue;
  }
  // 资产存在性（portrait / mark / lockup / company logo）
  for (const key of ["portrait", "mark", "lockup"] as const) {
    const v = p[key];
    if (v) {
      const abs = join(ROOT, "public", v.replace(/^\//, ""));
      checkWarn(existsSync(abs), `profile ${name}: ${key} ${v} missing on disk`);
    }
  }
  for (const g of p.portfolioGroups)
    for (const c of g.companies) {
      if (c.logo) {
        const abs = join(ROOT, "public", c.logo.replace(/^\//, ""));
        check(existsSync(abs), `profile ${name}: logo ${c.logo} (${c.name}) missing on disk`);
      }
    }
}
const slugs = validProfiles.map((p) => p.slug);
const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i);
check(dupSlugs.length === 0, `duplicate profile slugs: ${[...new Set(dupSlugs)].join(", ")}`);

// ---------- 2) leaderboard ----------
const lbRaw = JSON.parse(readFileSync(join(ROOT, "src/data/fundingLeaderboard.json"), "utf8"));
const lbSchema = z.array(
  z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    country: z.string(),
    sector: z.string(),
    totalRaisedUsd: z.number().positive(),
    largestRoundUsd: z.number().positive(),
    roundLabel: z.string(),
    date: z.string(),
    tier: z.enum(["Disclosed", "Reported", "Estimated"]),
    leads: z.array(z.object({ name: z.string().min(1), slug: z.string().optional() })),
    sourceUrl: z.string().startsWith("http"),
  }),
);
const lbParsed = lbSchema.safeParse(lbRaw);
if (lbParsed.success) {
  const lbIds = lbRaw.map((e: { id: string }) => e.id);
  const dupIds = lbIds.filter((s: string, i: number) => lbIds.indexOf(s) !== i);
  check(dupIds.length === 0, `duplicate leaderboard ids: ${[...new Set(dupIds)].join(", ")}`);
  for (const e of lbRaw) {
    if (e.logo) {
      const abs = join(ROOT, "public", (e.logo as string).replace(/^\//, ""));
      check(existsSync(abs), `leaderboard ${e.id}: logo ${e.logo} missing on disk`);
    }
    for (const lead of e.leads as { name: string; slug?: string }[]) {
      if (lead.slug) check(slugs.includes(lead.slug), `leaderboard ${e.id}: lead slug ${lead.slug} not a profile (${lead.name})`);
    }
    check(e.largestRoundUsd <= e.totalRaisedUsd, `leaderboard ${e.id}: largestRound > totalRaised`);
  }
  console.log(`leaderboard OK: ${lbRaw.length} entries`);
} else {
  errors.push(`fundingLeaderboard.json: ${lbParsed.error.issues.map((x) => `${x.path.join(".")} ${x.message}`).join("; ")}`);
}

// ---------- 3) investorTypes ----------
const itRaw = JSON.parse(readFileSync(join(ROOT, "src/data/investorTypes.json"), "utf8"));
const itSchema = z.object({
  investorTypes: z.array(z.object({ id: z.string().min(1), name: z.string().min(1), abbreviation: z.string(), description: z.string(), typicalStage: z.string(), typicalCheckSize: z.string(), examples: z.array(z.string()), aiRelevance: z.string() })),
  earliestStage: z.string(),
  latestStage: z.string(),
});
const itParsed = itSchema.safeParse(itRaw);
if (itParsed.success) {
  const ids = itRaw.investorTypes.map((t: { id: string }) => t.id);
  const dupIds = ids.filter((s: string, i: number) => ids.indexOf(s) !== i);
  check(dupIds.length === 0, `duplicate investorType ids: ${[...new Set(dupIds)].join(", ")}`);
  console.log(`investorTypes OK: ${itRaw.investorTypes.length} types`);
} else {
  errors.push(`investorTypes.json: ${itParsed.error.issues.map((x) => `${x.path.join(".")} ${x.message}`).join("; ")}`);
}

// ---------- report ----------
console.log(`profiles OK: ${validProfiles.length} files, ${slugs.length} slugs, companies ${validProfiles.reduce((a, p) => a + p.portfolioGroups.reduce((x, g) => x + g.companies.length, 0), 0)}`);
for (const w of warn) console.log(`  WARN: ${w}`);
if (errors.length) {
  console.error(`\nCONTENT VALIDATION FAILED (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("CONTENT VALIDATION PASSED");
