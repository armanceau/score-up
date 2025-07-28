import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["html2canvas"] = path.resolve(
      __dirname,
      "node_modules/html2canvas-pro"
    );
    return config;
  },
};

export default nextConfig;
