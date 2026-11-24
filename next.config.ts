import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Inline the CSS so the first paint already has the intro cover (an external stylesheet delays it, and the browser shows a white page meanwhile).
  experimental: {
    inlineCss: true,
  },
  partialPrefetching: true,
  // The qualities the pages ask for; any other value is quietly lowered to 75
  images: {
    qualities: [75, 85, 90, 92],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
