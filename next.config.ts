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
  // The hero films and their stills never change under the same name, so browsers and the CDN may keep them for a week.
  async headers() {
    return [
      {
        source: "/assets/hero/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
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
