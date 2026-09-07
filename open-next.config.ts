import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// 纯静态站点：把 SSG 预渲染页（generateStaticParams + dynamicParams=false）
// 存进 Cloudflare 静态 CDN 资产，避免 worker 运行时动态渲染导致 404。
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
