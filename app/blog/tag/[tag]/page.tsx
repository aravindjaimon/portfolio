import Link from "next/link";
import { BlogCard } from "@/components/blog";
import { SplitHeading } from "@/components/motion/split-heading";
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
    <main className="min-h-screen bg-background">
      <header className="bg-grid border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16">
          <SplitHeading className="font-bebas text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-wide text-foreground mb-4">
            Tagged <span className="text-primary">{properTag}</span>
          </SplitHeading>
          <p className="text-foreground/70 text-lg font-mono">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-foreground/60 font-mono">
              No articles found with this tag.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-block text-primary hover:underline font-mono text-sm"
            >
              View all articles
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
