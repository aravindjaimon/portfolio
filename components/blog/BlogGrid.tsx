"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { animate, onScroll, stagger } from "animejs";
import { useAnimeScope } from "@/hooks";
import type { Post } from "@/lib/blog";
import { BlogCard } from "./BlogCard";
import { BlogSearch } from "./BlogSearch";
import { TagFilter } from "./TagFilter";

interface BlogGridProps {
  posts: Post[];
  featured: Post[];
  tags: string[];
}

export function BlogGrid({ posts, featured, tags }: BlogGridProps) {
  const root = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter(
      (post) =>
        (!tag ||
          post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) &&
        (!q ||
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [posts, query, tag]);

  // Featured only earns a section when there is more than the featured set to show
  const showFeatured =
    !query && !tag && featured.length > 0 && posts.length > featured.length;

  // Cards enter as a grid stagger whenever the result set changes
  useAnimeScope(
    root,
    ({ matches }) => {
      if (matches.reduceMotion) return;
      animate(".post-card", {
        y: [32, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(70, {
          grid: [3, Math.ceil(filtered.length / 3)],
          from: "first",
        }),
        ease: "out(4)",
        autoplay: onScroll({ target: root.current!, enter: "bottom top" }),
      });
    },
    [filtered.length, showFeatured]
  );

  const onSearch = useCallback((value: string) => setQuery(value), []);
  const onTag = useCallback((value: string | null) => setTag(value), []);

  return (
    <div ref={root}>
      <div className="space-y-4 mb-10">
        <BlogSearch onSearch={onSearch} />
        <TagFilter tags={tags} selectedTag={tag} onTagSelect={onTag} />
      </div>

      {showFeatured && (
        <section className="mb-12" aria-labelledby="featured-title">
          <h2
            id="featured-title"
            className="font-bebas text-2xl text-foreground/80 tracking-wide mb-6"
          >
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.slice(0, 2).map((post) => (
              <div key={post.slug} className="post-card">
                <BlogCard post={post} featured />
              </div>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="all-title">
        <h2
          id="all-title"
          className="font-bebas text-2xl text-foreground/80 tracking-wide mb-6"
        >
          {tag ? `Tagged: ${tag}` : query ? "Search results" : "All articles"}
          <span className="text-foreground/60 text-lg ml-2 font-mono">
            ({filtered.length})
          </span>
        </h2>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <div key={post.slug} className="post-card">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-border bg-grid">
            <p className="text-foreground/60 font-mono">
              Nothing matches “{query || tag}”.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTag(null);
              }}
              className="mt-4 text-volt hover:underline font-mono text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
