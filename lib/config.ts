/**
 * Centralized site configuration
 * Contact details come from content/data/profile.yaml (via velite); only the
 * base URL and page title live here.
 */
import { profile } from "#site/content";

export const siteConfig = {
  /** Base URL for the production site */
  baseUrl: "https://aravindjaimon.com",

  /** Site owner/author name */
  name: "Aravind Jaimon",

  /** Default page title */
  title: "Aravind Jaimon | Lead Software Engineer",

  /** Contact email */
  email: profile.email,

  /** Social links */
  social: {
    github: profile.github,
    linkedin: profile.linkedin,
  },
} as const;

/** Type for the site configuration */
export type SiteConfig = typeof siteConfig;
