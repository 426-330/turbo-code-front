import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: { DB: process.env.DB },
  experimental: { runtime: 'experimental-edge' },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
