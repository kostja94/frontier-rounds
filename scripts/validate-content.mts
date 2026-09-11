// 内容数据完整性校验（2026-09-08，数据 JSON 化后新增）。
// 校验范围:
//   1) investor profiles JSON   —— zod 结构、slug 唯一、mark/portrait/company logo 文件存在
//   2) fundingLeaderboard.json  —— zod 结构、tier 枚举、lead slug 必须对应某个 profile
//   3) investorTypes.json       —— zod 结构、id 唯一
// 运行: npm run validate:content
// 目的: 取代旧 TS 数据文件在编译期提供的部分保证（*.Logos.ts 已删），
//       在 CI/本地作为内容闸门，数据损坏/漏文件在构建前即暴露。
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { canonicalLogos } from "../src/data/logos";

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
  investorTypeIds: z.array(z.string()).default([]),
  portrait: z.string().optional(),
  localName: z.string().optional(),
  mark: z.string().optional(),
  lockup: z.string().optional(),
  tagline: z.string().min(1),
  website: z.string().min(1),
  websiteLabel: z.string(),
  summary: z.string().min(10),
  shortSummary: z.string().min(10),
  longSummary: z.string().optional(),
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

// 类型字典 id 集合(用于校验 profile.investorTypeIds 命中)
const itIdsRaw = JSON.parse(
  readFileSync(join(ROOT, "src/data/investorTypes.json"), "utf8"),
) as { investorTypes: { id: string }[] };
const typeIds = new Set(itIdsRaw.investorTypes.map((t) => t.id));

for (const [i, p] of profileList.entries()) {
  if (p === null) continue;
  const name = profileFiles[i];
  const parsed = profileSchema.safeParse(p);
  if (!parsed.success) {
    errors.push(`profile ${name}: schema fail: ${parsed.error.issues.map((x) => `${x.path.join(".")} ${x.message}`).join("; ")}`);
    continue;
  }
  // kind 必填 + investorTypeIds 命中字典
  check(!!p.kind, `profile ${name}: missing kind (firm/person/accelerator)`);
  for (const tid of (p.investorTypeIds as string[]) ?? []) {
    check(typeIds.has(tid), `profile ${name}: unknown investorTypeId "${tid}"`);
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

// ---------- 4) products（产品融资档案） ----------
const PRODUCTS_DIR = join(ROOT, "src/data/products");
const productFiles = readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json"));

const productSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  kind: z.literal("product"),
  logo: z.string().optional(),
  localName: z.string().optional(),
  tagline: z.string().min(1),
  website: z.string().min(1),
  websiteLabel: z.string(),
  summary: z.string().min(10),
  facts: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  rounds: z
    .array(
      z.object({
        date: z.string().min(1),
        label: z.string().min(1),
        amountUsd: z.number().positive().optional(),
        valuationUsd: z.number().positive().optional(),
        leads: z.array(z.string().min(1)),
        participants: z.array(z.string().min(1)),
        note: z.string().optional(),
        sourceUrl: z.string().startsWith("http").optional(),
      }),
    )
    .min(1),
  sections: z.array(z.object({ heading: z.string().min(1), body: z.string().min(1) })),
});
const productSlugs: string[] = [];
for (const f of productFiles) {
  const label = `products/${f}`;
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(join(PRODUCTS_DIR, f), "utf8"));
  } catch (e) {
    errors.push(`${label}: JSON parse error: ${(e as Error).message}`);
    continue;
  }
  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    errors.push(`${label}: schema fail: ${parsed.error.issues.map((x) => `${x.path.join(".")} ${x.message}`).join("; ")}`);
    continue;
  }
  const p = parsed.data;
  productSlugs.push(p.slug);
  if (p.logo) {
    const abs = join(ROOT, "public", p.logo.replace(/^\//, ""));
    check(existsSync(abs), `${label}: logo ${p.logo} missing on disk`);
  }
  // rounds 必须按日期升序（页面把最后一项渲染为 Latest）
  for (let i = 1; i < p.rounds.length; i++) {
    check(
      p.rounds[i]!.date >= p.rounds[i - 1]!.date,
      `${label}: rounds not sorted by date (${p.rounds[i - 1]!.date} → ${p.rounds[i]!.date})`,
    );
  }
}
const dupProductSlugs = productSlugs.filter((s, i) => productSlugs.indexOf(s) !== i);
check(dupProductSlugs.length === 0, `duplicate product slugs: ${[...new Set(dupProductSlugs)].join(", ")}`);
let productRoundTotal = 0;
for (const f of productFiles) {
  const raw = JSON.parse(readFileSync(join(PRODUCTS_DIR, f), "utf8")) as { rounds?: unknown[] };
  productRoundTotal += raw.rounds?.length ?? 0;
}
console.log(`products OK: ${productFiles.length} files, slugs ${productSlugs.join(", ")}, total rounds ${productRoundTotal}`);

// ---------- 5) logo canonical 一致性 + 孤儿资产 ----------
const normName = (name: string) =>
  name.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
const canByKey = new Map<string, string>();
for (const c of canonicalLogos) for (const n of c.names) canByKey.set(normName(n), c.path);

// 所有被引用资产 basename（profiles top-level + portfolio + leaderboard + products）
const referenced = new Set<string>();
const ref = (logo?: string) => {
  if (logo) referenced.add(basename(logo));
};
for (const [i, p] of profileList.entries()) {
  if (p === null) continue;
  ref(p.mark); ref(p.lockup); ref(p.portrait);
  for (const g of p.portfolioGroups ?? []) for (const c of g.companies) ref(c.logo);
}
for (const e of lbRaw) ref(e.logo);
for (const f of productFiles) {
  const raw = JSON.parse(readFileSync(join(PRODUCTS_DIR, f), "utf8")) as { logo?: string };
  ref(raw.logo);
}
// 一致性：profile 组合公司若命中 canonical 表，须引用规范资产（防再分裂）
for (const [i, p] of profileList.entries()) {
  if (p === null) continue;
  const name = profileFiles[i];
  for (const g of p.portfolioGroups ?? []) {
    for (const c of g.companies) {
      const can = canByKey.get(normName(c.name));
      if (can && c.logo && c.logo !== can) {
        errors.push(`profile ${name}: ${c.name} 引用 ${c.logo}，应引用规范资产 ${can}（跨档案同公司须同一 logo）`);
      }
    }
  }
}
for (const e of lbRaw) {
  const can = canByKey.get(normName(e.name));
  if (can && e.logo && e.logo !== can) {
    errors.push(`leaderboard ${e.id}: ${e.name} 引用 ${e.logo}，应引用规范资产 ${can}`);
  }
}
// 孤儿资产告警（非阻断）
const orphanFiles = readdirSync(PUBLIC_LOGOS).filter((f) => !referenced.has(f));
if (orphanFiles.length) {
  warn.push(`orphan logos (${orphanFiles.length}): ${orphanFiles.slice(0, 12).join(", ")}${orphanFiles.length > 12 ? ", …" : ""}`);
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
