import type { Metadata } from "next";
import { Rss } from "lucide-react";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { SplitHeading } from "@/components/motion/split-heading";
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
    <main id="main-content" className="min-h-screen bg-background">
      <header className="bg-grid border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <SplitHeading className="font-bebas text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-wide text-foreground mb-5">
              Notes from <span className="text-primary">production</span>
            </SplitHeading>
            <p className="text-foreground/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Architecture patterns, tooling, and the trade-offs behind systems
              that scale — written down while they were still fresh.
            </p>
          </div>
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground/70 hover:text-volt hover:border-volt font-mono text-xs uppercase tracking-[0.2em] transition-colors w-fit"
          >
            <Rss size={14} aria-hidden />
            RSS
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <BlogGrid posts={posts} featured={featured} tags={tags} />
      </div>
    </main>
  );
}
