import { posts } from "#site/content";

export type Post = (typeof posts)[number];

// Get all published posts sorted by date
export function getPublishedPosts(): Post[] {
  return posts
    .filter((post) => !post.draft || process.env.NODE_ENV === "development")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

// Get featured posts
export function getFeaturedPosts(): Post[] {
  return getPublishedPosts().filter((post) => post.featured);
}

// Get post by slug
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

// Get all unique tags
export function getAllTags(): string[] {
  const tags = posts.flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

// Get posts by tag
export function getPostsByTag(tag: string): Post[] {
  return getPublishedPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

// Get related posts (matching tags, excluding current)
export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const otherPosts = getPublishedPosts().filter(
    (post) => post.slug !== currentSlug
  );

  // Score posts by number of matching tags
  const scored = otherPosts.map((post) => {
    const matchingTags = post.tags.filter((tag) =>
      currentPost.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
    return { post, score: matchingTags.length };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Extract table of contents from raw MDX content
export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function extractTableOfContents(rawContent: string): TOCItem[] {
  /**
   * Matches Markdown h2 and h3 headings (## and ###)
   * - ^: Start of line (with 'm' flag, matches after newlines too)
   * - (#{2,3}): Capture 2-3 hash characters (h2 or h3)
   * - \s+: One or more spaces after hashes
   * - (.+)$: Capture the heading text until end of line
   * - g flag: Find all matches in the content
   * - m flag: ^ and $ match line boundaries, not just string boundaries
   *
   * We limit to h2-h3 because:
   * - h1 is typically the page title (not needed in TOC)
   * - h4+ are too detailed for a clean navigation
   */
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(rawContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/\s+/g, "-");
    items.push({ id, text, level });
  }

  return items;
}
