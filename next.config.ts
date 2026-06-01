import type { NextConfig } from "next";

// Run Velite before Next.js starts (works with both Turbopack and Webpack)
const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  import("velite").then((m) => m.build({ watch: isDev, clean: !isDev }));
}

// RFC 8288 Link header advertising agent-discovery resources from the homepage.
// Relative URIs are resolved against the request URI per RFC 8288 §3.
const HOMEPAGE_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</sitemap.xml>; rel="sitemap"',
  '</feed.xml>; rel="alternate"; type="application/rss+xml"',
].join(", ");

const nextConfig: NextConfig = {
  // No webpack config needed - Velite runs via programmatic API above
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Link", value: HOMEPAGE_LINK_HEADER }],
      },
    ];
  },
};

export default nextConfig;
