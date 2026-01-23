import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/blog";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import type { Metadata } from "next";

const baseUrl = "https://aravindjaimon.com";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return {
    title: `Articles tagged "${decodedTag}" | Aravind Jaimon`,
    description: `Browse ${posts.length} article${posts.length !== 1 ? "s" : ""} about ${decodedTag}. Technical insights and tutorials on software engineering.`,
    openGraph: {
      title: `Articles tagged "${decodedTag}"`,
      description: `Browse ${posts.length} article${posts.length !== 1 ? "s" : ""} about ${decodedTag}.`,
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/blog/tag/${encodeURIComponent(decodedTag.toLowerCase())}`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);
  const allTags = getAllTags();

  // Find the proper cased version of the tag
  const properTag =
    allTags.find((t) => t.toLowerCase() === decodedTag.toLowerCase()) ||
    decodedTag;

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-[#2D2D2D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#C41E3A] font-mono text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Page Title */}
        <div className="mb-12">
          <p className="text-white/40 font-mono text-sm mb-2">Tagged with</p>
          <h1 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-wide">
            <span className="text-[#C41E3A]">{properTag}</span>
          </h1>
          <p className="text-white/60 mt-4">
            {posts.length} article{posts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/40 font-mono">
              No articles found with this tag.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-block text-[#C41E3A] hover:underline font-mono text-sm"
            >
              View all articles
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
