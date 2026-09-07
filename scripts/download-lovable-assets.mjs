// 从 Lovable 云 asset 清单（.png.asset.json）回填图片到 public/。
// 用法：
//   node scripts/download-lovable-assets.mjs                      # 用下方 SRC_ASSETS / HOST 默认值
//   node scripts/download-lovable-assets.mjs <srcAssetsDir> <host>
// 说明：AI Funding Hub 导出的 src/assets 里，绝大多数图片只是云端清单（.asset.json），
// 实体 PNG 需按 asset_id 从 Lovable 资源域名取回；本脚本幂等，已存在的文件会跳过。
import {
  readdirSync,
  copyFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { join, dirname } from "node:path";

const SRC_ASSETS =
  process.argv[2] ?? "E:\\自有部署项目\\AI Funding Hub\\src\\assets";
const HOST =
  process.argv[3] ??
  "https://id-preview--1e49e127-78ec-480f-9a11-53fbb3437103.lovable.app";
const PUBLIC_DIR = join(process.cwd(), "public");

function log(m) {
  console.error("[assets]", m);
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(SRC_ASSETS);

// 1) 真实图片（未走清单的 png/jpg/svg…）
let real = 0;
for (const f of files) {
  if (/\.asset\.json$/i.test(f) || !/\.(png|jpe?g|webp|gif|svg|ico)$/i.test(f)) continue;
  const sub = dirname(f).endsWith("portraits") ? "portraits" : "logos";
  const dest = join(PUBLIC_DIR, sub, f.split(/[\\/]/).pop());
  mkdirSync(dirname(dest), { recursive: true });
  if (!existsSync(dest)) copyFileSync(f, dest);
  real++;
}
log(`real images ensured: ${real}`);

// 2) 清单图下载（幂等）
const jobs = [];
for (const f of files) {
  if (!f.endsWith(".asset.json")) continue;
  const m = JSON.parse(readFileSync(f, "utf8"));
  if (!m.asset_id || !m.original_filename) continue;
  const sub = dirname(f).endsWith("portraits") ? "portraits" : "logos";
  jobs.push({ id: m.asset_id, name: m.original_filename, sub });
}
log(`manifest to ensure: ${jobs.length}`);
let cursor = 0;
let ok = 0;
let fail = 0;
async function worker() {
  while (cursor < jobs.length) {
    const j = jobs[cursor++];
    const dest = join(PUBLIC_DIR, j.sub, j.name);
    if (existsSync(dest)) {
      ok++;
      continue;
    }
    try {
      const r = await fetch(`${HOST}/__l5e/assets-v1/${j.id}/${encodeURIComponent(j.name)}`);
      if (!r.ok) throw new Error("HTTP " + r.status);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
      ok++;
    } catch (e) {
      fail++;
      log("FAIL " + j.name + " " + e.message);
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
log(`done ok=${ok} fail=${fail}`);
