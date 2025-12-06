import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// By default we don't force `output: 'export'` because that disables
// Next.js API Routes. Set the env var `NEXT_STATIC_EXPORT=true` when
// you intentionally want a static HTML export (for GitHub Pages, etc.).
const nextConfig = {
  // Static export can break API routes — enable only when explicitly requested
  output: process.env.NEXT_STATIC_EXPORT === 'true' ? 'export' : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true, // Keep if deploying to static hosting
  },
  basePath: isProd ? "/landing_page_nemark" : "",
  assetPrefix: isProd ? "/landing_page_nemark/" : "",
  trailingSlash: true,
  // Optimize for production

  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },
  // Note: removed `modularizeImports` for `antd` to avoid incorrect
  // path rewriting (e.g. `antd/lib/Avatar`) which can cause module
  // resolution errors with newer antd package layouts. Rely on
  // standard ESM imports and tree-shaking instead.
} satisfies NextConfig;

export default nextConfig;
