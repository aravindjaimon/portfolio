import Image from "next/image";
import Link from "next/link";
import { TagBadge } from "./TagBadge";
import { DifficultyBadge } from "./DifficultyBadge";
import { ReadingTime } from "./ReadingTime";
import { formatDate, type Post } from "@/lib/blog";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group bg-secondary border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
    >
      <Link
        href={post.permalink}
        className="block relative aspect-video overflow-hidden"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div
        className={`p-4 sm:p-6 flex flex-col ${featured ? "justify-center" : ""}`}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <DifficultyBadge difficulty={post.difficulty} />
          <ReadingTime time={post.readingTime} />
        </div>

        <Link href={post.permalink}>
          <h2
            className={`font-bebas tracking-wide text-foreground group-hover:text-primary transition-colors duration-300 ${
              featured
                ? "text-2xl sm:text-3xl md:text-4xl"
                : "text-xl sm:text-2xl"
            }`}
          >
            {post.title}
          </h2>
        </Link>

        <p className="text-foreground/60 text-sm sm:text-base mt-2 mb-4 line-clamp-2">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-foreground/60 font-mono self-center">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-foreground/60 font-mono pt-3 border-t border-border">
          <span>{post.author}</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>
    </article>
  );
}
