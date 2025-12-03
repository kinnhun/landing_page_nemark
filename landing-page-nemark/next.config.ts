import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/landing_page_nemark" : "",
  assetPrefix: isProd ? "/landing_page_nemark/" : "",
  trailingSlash: true,
} satisfies NextConfig;

export default nextConfig;
