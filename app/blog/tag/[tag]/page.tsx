import Link from "next/link";
import { BlogCard } from "@/components/blog";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

const { baseUrl } = siteConfig;

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
    <main id="main-content" className="min-h-screen">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 md:pt-40 pb-12">
          <h1 className="display text-[clamp(3rem,9vw,7rem)] mb-6">
            Tagged{" "}
            <span className="inline-block bg-highlight border-2 shadow-hard px-[0.1em]">
              {properTag}
            </span>
          </h1>
          <p className="text-muted-foreground text-lg font-mono">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-mono">
              No articles found with this tag.
            </p>
            <Link href="/blog" className="btn press bg-highlight mt-6">
              View all articles
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
