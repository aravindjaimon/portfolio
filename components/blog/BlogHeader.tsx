import Image from "next/image";
import { TagBadge } from "./TagBadge";
import { DifficultyBadge } from "./DifficultyBadge";
import { ReadingTime } from "./ReadingTime";
import { formatDate, type Post } from "@/lib/blog";
import { Calendar, User } from "lucide-react";
import { SplitHeading } from "@/components/motion/split-heading";

interface BlogHeaderProps {
  post: Post;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="relative">
      {/* Cover Image */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative -mt-32 sm:-mt-40 md:-mt-48 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <DifficultyBadge difficulty={post.difficulty} />
            <ReadingTime time={post.readingTime} />
          </div>

          {/* Title */}
          <SplitHeading className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground tracking-wide leading-[0.95] mb-4 text-balance">
            {post.title}
          </SplitHeading>

          {/* Description */}
          <p className="text-foreground/70 text-base sm:text-lg md:text-xl max-w-2xl mb-6">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} size="md" />
            ))}
          </div>

          {/* Author and date */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-foreground/50 font-mono pb-6 border-b border-border">
            <span className="flex items-center gap-2">
              <User size={16} />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </span>
            {post.updatedAt && (
              <span className="text-foreground/60">
                Updated:{" "}
                <time dateTime={post.updatedAt}>
                  {formatDate(post.updatedAt)}
                </time>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
