import type { NextConfig } from "next";

// Velite watch for live content reload during `next dev`. One-shot generation
// (dev startup + builds) runs in the package.json scripts BEFORE Next starts,
// avoiding a Turbopack race resolving `#site/content` before `.velite` exists.
if (!process.env.VELITE_STARTED && process.argv.includes("dev")) {
  process.env.VELITE_STARTED = "1";
  import("velite").then((m) => m.build({ watch: true, clean: false }));
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
  // Browsers and link unfurlers still request /favicon.ico; serve the generated icon there
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
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
