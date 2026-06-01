import { siteConfig } from "@/lib/config";

// RFC 9727 API catalog as an RFC 9264 linkset. Advertises the site's public
// API so agents can discover its description, docs, and status programmatically.
export function GET() {
  const { baseUrl } = siteConfig;

  const linkset = {
    linkset: [
      {
        anchor: `${baseUrl}/api/newsletter`,
        "service-desc": [
          {
            href: `${baseUrl}/openapi.json`,
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [{ href: `${baseUrl}/`, type: "text/html" }],
        status: [{ href: `${baseUrl}/api/health`, type: "application/json" }],
      },
    ],
  };

  return new Response(JSON.stringify(linkset, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
