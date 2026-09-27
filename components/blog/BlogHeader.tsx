import Image from "next/image";
import { TagBadge } from "./TagBadge";
import { DifficultyBadge } from "./DifficultyBadge";
import { ReadingTime } from "./ReadingTime";
import { formatDate, type Post } from "@/lib/blog";
import { Calendar, User } from "lucide-react";

interface BlogHeaderProps {
  post: Post;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="px-4 sm:px-6 pt-8 md:pt-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <DifficultyBadge difficulty={post.difficulty} />
            <ReadingTime time={post.readingTime} />
          </div>

          {/* Title */}
          <h1 className="display text-[clamp(1.75rem,7vw,4.5rem)] mb-6 text-balance">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mb-6">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} size="md" />
            ))}
          </div>

          {/* Author and date */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground font-mono uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <User size={14} aria-hidden />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} aria-hidden />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </span>
            {post.updatedAt && (
              <span className="text-muted-foreground">
                Updated:{" "}
                <time dateTime={post.updatedAt}>
                  {formatDate(post.updatedAt)}
                </time>
              </span>
            )}
          </div>
        </div>

        <div className="card relative mt-10 aspect-[21/9] overflow-hidden">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
          />
        </div>
      </div>
    </header>
  );
}
