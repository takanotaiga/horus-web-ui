import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],  // ← ここに許可したいホスト名を追加
  },
};

export default nextConfig;
