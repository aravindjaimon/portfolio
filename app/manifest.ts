import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aravind Jaimon | Lead Software Engineer",
    short_name: "Aravind Jaimon",
    description:
      "Portfolio of Aravind Jaimon - Lead Software Engineer building systems for millions",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F0E8",
    theme_color: "#F3F0E8",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
