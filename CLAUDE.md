# Frontier Rounds

Frontier Rounds — AI 融资情报内容站（英文）。跟踪 AI 公司融资轮次、融资总量榜、投资机构档案。

## 技术栈

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (CSS-first) · OpenNext Cloudflare

## 命令

```bash
npm install
npm run dev        # 本地开发 http://localhost:3000
npm run build      # Next 生产构建
npm start          # 本地生产服务（Node）
npm run assets:fetch   # 从 Lovable 云回填 public 图片（幂等）
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

### Cloudflare 部署（OpenNext）

```bash
npm run preview    # 本地 Workers 运行时预览
npm run deploy     # 构建并部署到 Cloudflare Workers
npm run cf-typegen # 重新生成 cloudflare-env.d.ts
```

## 目录约定

- `app/` — App Router 页面、metadata、sitemap/robots（页面壳）
- `src/components/` — 业务组件（页面区块与通用 UI 片段；无 shadcn/ui 依赖）
- `src/data/` — 内容数据（硬编码 TS；后续内容 CMS 化时从 data 抽离）
- `src/lib/` — 工具与站点常量（`site.ts` 集中 SITE_URL/品牌文案）
- `public/logos|portraits` — 图片资产（来自 Lovable 云回填，勿手动改名，引用路径以 data 内字符串为准）
- `scripts/` — 资产回填、校验等一次性/维护脚本

## 编辑注意事项

- Tailwind v4 样式集中在 `app/globals.css`（CSS-first @theme + oklch），**无 tailwind.config.js**；新增语义色改 CSS 变量。
- 品牌名 **Frontier Rounds**；SEO 文案/canonical 统一经 `src/lib/site.ts` 与各页 `metadata`。
- 数据更新后 `npm run build && npm run deploy` 即上线（无数据库）。
- 图片引用是 public 静态路径字符串（`/logos/xxx.png`），新增 logo 放 `public/logos` 并在对应 `*Logos.ts`/档案中登记。
- 本仓不含部署密钥；CI 走 GitHub Actions（CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID）。
