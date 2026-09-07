# Frontier Rounds

Frontier Rounds 记录 AI 公司融资情报：最新轮次追踪、融资排行榜（带 source/tier）、投资者档案集（Institutional / accelerator / angel）。

## 技术栈

- Next.js 16（App Router）· React 19 · TypeScript · Tailwind CSS v4（CSS-first）
- 内容：`src/data/*` 硬编码 TS（无 DB / 无 CMS）
- 部署：Cloudflare Workers（`@opennextjs/cloudflare`）

## 常用命令

```bash
npm run dev            # 开发
npm run build          # 构建
npm start              # 本地运行产物
npm run typecheck      # TS 校验
npm run assets:fetch   # 回填 public 图片（幂等，来自原 Lovable 云）
npm run preview        # OpenNext 本地 Workers 预览
npm run deploy         # 部署到 Cloudflare Workers
```

## 目录

- `app/` 路由与 metadata；`src/components`（含 shadcn `ui/`）；`src/data`（rounds / leaderboard / investors）；`public/logos`、`public/portraits`（图片资产）

## 规则

- 品牌与 SEO 文案统一从 `src/lib/site.ts` 和各页 `generateMetadata` 输出；site-wide 文案改这一处。
- 新增图片放 `public/logos|portraits`，并在 `src/data/investors/*Logos.ts` 或对应 investor 档案引用（字符串 `/logos/xx.png`）。
- Tailwind v4 无 tailwind.config；语义色在 `app/globals.css` 的 oklch 变量。
- 内容带 confidence tier（Disclosed/Reported/Estimated），数据须附 source；**不要放未经验证的占位数据**。
- 每次内容更新后 `npm run deploy` 上线。
