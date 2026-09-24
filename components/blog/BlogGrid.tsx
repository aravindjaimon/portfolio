"use client";

import { useCallback, useMemo, useState } from "react";
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

  const onSearch = useCallback((value: string) => setQuery(value), []);
  const onTag = useCallback((value: string | null) => setTag(value), []);

  return (
    <div>
      {/* Search and filters over a handful of posts read as an empty product */}
      {posts.length >= 4 && (
        <div className="space-y-4 mb-10">
          <BlogSearch onSearch={onSearch} />
          <TagFilter tags={tags} selectedTag={tag} onTagSelect={onTag} />
        </div>
      )}

      {showFeatured && (
        <section className="mb-12" aria-labelledby="featured-title">
          <h2
            id="featured-title"
            className="flex items-baseline gap-2 mb-6 font-mono text-xs uppercase tracking-[0.2em]"
          >
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.slice(0, 2).map((post) => (
              <div key={post.slug}>
                <BlogCard post={post} featured />
              </div>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="all-title">
        <h2
          id="all-title"
          className="flex items-baseline gap-2 mb-6 font-mono text-xs uppercase tracking-[0.2em]"
        >
          {tag ? `Tagged: ${tag}` : query ? "Search results" : "All articles"}
          <span>({filtered.length})</span>
        </h2>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <div key={post.slug}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-16">
            <p className="font-mono">Nothing matches “{query || tag}”.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTag(null);
              }}
              className="btn press bg-highlight mt-6"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
