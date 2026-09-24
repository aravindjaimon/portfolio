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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 md:pt-40 pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h1 className="display text-[clamp(3rem,9vw,7rem)] mb-6">
              Notes from{" "}
              <span className="inline-block bg-highlight border-2 shadow-hard px-[0.1em]">
                production
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              Architecture patterns, tooling, and the trade-offs behind systems
              that scale — written down while they were still fresh.
            </p>
          </div>
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="card press inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] w-fit"
          >
            <Rss size={14} aria-hidden />
            RSS
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <BlogGrid posts={posts} featured={featured} tags={tags} />
      </div>
    </main>
  );
}
