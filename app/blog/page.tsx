import type { Metadata } from "next";
import { Rss } from "lucide-react";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { getPublishedPosts, getFeaturedPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Aravind Jaimon",
  description:
    "Thoughts on software engineering, architecture patterns, and building products that scale.",
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const featured = getFeaturedPosts();
  const tags = getAllTags();

  return (
    <main id="main-content" className="min-h-screen">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-32 md:pt-40 pb-12 text-center">
          <h1 className="display text-[clamp(2.5rem,10vw,6rem)] leading-[0.95]">
            Notes from <i className="text-air">production</i>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground text-balance">
            Architecture patterns, tooling, and the trade-offs behind systems
            that scale — written down while they were still fresh.
          </p>
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="chip mt-8 transition-colors hover:border-primary"
          >
            <Rss size={14} aria-hidden />
            RSS
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <BlogGrid posts={posts} featured={featured} tags={tags} />
      </div>
    </main>
  );
}
