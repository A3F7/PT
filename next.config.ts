import type { NextConfig } from "next";

// The app is 100% client-side (no API routes, no server data).
// `output: "export"` produces a fully static site in ./out that can be
// drag-and-dropped onto Vercel / Netlify / GitHub Pages / any static host.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Required for static export — images are served as-is.
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
