import type { NextConfig } from "next";

const nextConfig : NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/echo-trace',
  assetPrefix: '/echo-trace/',
};

export default nextConfig;
