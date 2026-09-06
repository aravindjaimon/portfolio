import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/blog";

interface PostNavigationProps {
  previous: Post | null;
  next: Post | null;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav
      className="mt-12 pt-8 border-t border-border"
      aria-label="Post navigation"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previous ? (
          <Link
            href={previous.permalink}
            className="group flex flex-col p-4 border border-border hover:border-primary/50 transition-colors"
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <ArrowLeft size={14} />
              Previous
            </span>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.permalink}
            className="group flex flex-col p-4 border border-border hover:border-primary/50 transition-colors sm:text-right"
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground mb-2 sm:justify-end">
              Next
              <ArrowRight size={14} />
            </span>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
