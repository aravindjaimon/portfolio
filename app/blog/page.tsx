'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BlogCard, BlogSearch, TagFilter } from '@/components/blog';
import { getPublishedPosts, getFeaturedPosts, getAllTags } from '@/lib/blog';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allPosts = getPublishedPosts();
  const featuredPosts = getFeaturedPosts();
  const allTags = getAllTags();

  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Filter by tag
    if (selectedTag) {
      posts = posts.filter((post) =>
        post.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return posts;
  }, [allPosts, selectedTag, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleTagSelect = useCallback((tag: string | null) => {
    setSelectedTag(tag);
  }, []);

  // Show featured section only when not filtering
  const showFeatured = !searchQuery && !selectedTag && featuredPosts.length > 0;

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-[#2D2D2D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#C41E3A] font-mono text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-wide mb-4">
            The <span className="text-[#C41E3A]">Blog</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Thoughts on software engineering, architecture patterns, and building products that scale.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-10">
          <BlogSearch onSearch={handleSearch} />
          <TagFilter tags={allTags} selectedTag={selectedTag} onTagSelect={handleTagSelect} />
        </div>

        {/* Featured Posts */}
        {showFeatured && (
          <section className="mb-12">
            <h2 className="font-bebas text-xl sm:text-2xl text-white/80 tracking-wide mb-6">
              Featured
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          {!showFeatured && (
            <h2 className="font-bebas text-xl sm:text-2xl text-white/80 tracking-wide mb-6">
              {selectedTag ? `Tagged: ${selectedTag}` : searchQuery ? 'Search Results' : 'All Articles'}
              <span className="text-white/40 text-lg ml-2">({filteredPosts.length})</span>
            </h2>
          )}

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/40 font-mono">No articles found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                }}
                className="mt-4 text-[#C41E3A] hover:underline font-mono text-sm"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
