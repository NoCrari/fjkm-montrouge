import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      // Images envoyées dans Sanity
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Miniatures des vidéos YouTube
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
