import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Fixes the ESLint ESM resolution crash on Cloudflare
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
