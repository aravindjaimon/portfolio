import { getRelatedPosts } from "@/lib/blog";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  currentSlug: string;
}

export function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentSlug, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="font-bebas text-2xl sm:text-3xl text-foreground tracking-wide mb-8">
        Related <span className="text-primary">Articles</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
