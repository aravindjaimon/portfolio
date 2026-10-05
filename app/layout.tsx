import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/config";
import { personalInfo } from "@/lib/data";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const { baseUrl } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Aravind Jaimon | Lead Software Engineer",
  description:
    "First engineering hire → 30+ engineer team. Building systems for millions. Portfolio of full-stack projects and technical leadership.",
  keywords: [
    "Aravind Jaimon",
    "Software Engineer",
    "RaftLabs",
    "React",
    "Node.js",
    "TypeScript",
    "Full Stack Developer",
    "Technical Lead",
  ],
  authors: [{ name: "Aravind Jaimon", url: baseUrl }],
  creator: "Aravind Jaimon",
  openGraph: {
    title: "Aravind Jaimon | Lead Software Engineer",
    description:
      "First engineering hire → 30+ engineer team. Building systems for millions. Portfolio showcasing high-impact projects and technical leadership.",
    url: baseUrl,
    siteName: "Aravind Jaimon",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aravind Jaimon | Lead Software Engineer",
    description:
      "First engineering hire → 30+ engineer team. Building systems for millions.",
  },
  icons: {
    icon: [{ url: "/icon", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6f1",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aravind Jaimon",
  url: baseUrl,
  jobTitle: "Lead Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "RaftLabs",
  },
  sameAs: [
    "https://github.com/aravindjaimon",
    "https://linkedin.com/in/aravindjaimon",
  ],
  knowsAbout: [
    "React",
    "Node.js",
    "TypeScript",
    "Full Stack Development",
    "Technical Leadership",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables live on <html> so the :root theme tokens (--font-serif etc.) can resolve them
    <html
      lang="en"
      className={`${bodoni.variable} ${jost.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-5 focus:py-2 focus:bg-background focus:border focus:border-foreground focus:rounded-full focus:font-medium"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer profile={personalInfo} />
        <Analytics />
      </body>
    </html>
  );
}
