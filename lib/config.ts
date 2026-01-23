/**
 * Centralized site configuration
 * Single source of truth for URLs, metadata, and shared constants
 */

export const siteConfig = {
  /** Base URL for the production site */
  baseUrl: "https://aravindjaimon.com",

  /** Site owner/author name */
  name: "Aravind Jaimon",

  /** Default page title */
  title: "Aravind Jaimon | Lead Software Engineer",

  /** Contact email */
  email: "dev@aravindjaimon.com",

  /** Social links */
  social: {
    github: "https://github.com/aravindjaimon",
    linkedin: "https://linkedin.com/in/aravindjaimon",
  },
} as const;

/** Type for the site configuration */
export type SiteConfig = typeof siteConfig;
