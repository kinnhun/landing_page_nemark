import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
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
