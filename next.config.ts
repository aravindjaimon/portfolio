import type { NextConfig } from "next";

// Run Velite before Next.js starts (works with both Turbopack and Webpack)
const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  import("velite").then((m) => m.build({ watch: isDev, clean: !isDev }));
}

const nextConfig: NextConfig = {
  // No webpack config needed - Velite runs via programmatic API above
};

export default nextConfig;
