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
      className={`card press group relative h-full flex flex-col ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
    >
      <div
        className={`relative aspect-video overflow-hidden border-b-2 ${featured ? "md:border-b-0 md:border-r-2 md:aspect-auto" : ""}`}
      >
        <Image
          src={post.coverImage}
          alt=""
          fill
          className="object-cover grayscale-[35%] group-hover:grayscale-0 transition-[filter] duration-300"
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
      </div>

      <div
        className={`p-5 sm:p-6 flex flex-col flex-1 ${featured ? "justify-center" : ""}`}
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <DifficultyBadge difficulty={post.difficulty} />
          <ReadingTime time={post.readingTime} />
        </div>

        <h2
          className={`font-extrabold tracking-tight leading-tight ${
            featured
              ? "text-2xl sm:text-3xl md:text-4xl"
              : "text-xl sm:text-2xl"
          }`}
        >
          {/* Stretched link: the whole card is the target, tags stay clickable above it */}
          <Link
            href={post.permalink}
            className="after:absolute after:inset-0 group-hover:underline decoration-2 underline-offset-4"
          >
            {post.title}
          </Link>
        </h2>

        <p className="text-muted-foreground mt-3 mb-5 line-clamp-2">
          {post.description}
        </p>

        <div className="relative z-10 flex flex-wrap gap-2 mt-auto mb-5">
          {post.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs font-mono self-center">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider pt-4 border-t-2">
          <span>{post.author}</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>
    </article>
  );
}
