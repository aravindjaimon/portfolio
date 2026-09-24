import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/config";
import { personalInfo } from "@/lib/data";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
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
  themeColor: "#f3f0e8",
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${archivo.variable} ${jetBrainsMono.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-highlight focus:border-2 focus:font-bold"
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
