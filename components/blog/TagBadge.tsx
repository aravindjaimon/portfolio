import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  clickable?: boolean;
  size?: "sm" | "md";
}

export function TagBadge({
  tag,
  clickable = true,
  size = "sm",
}: TagBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  const baseClasses = `inline-block ${sizeClasses[size]} bg-secondary text-foreground/60 border border-border transition-colors duration-200`;
  const hoverClasses = clickable
    ? "hover:border-primary hover:text-primary"
    : "";

  if (clickable) {
    return (
      <Link
        href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
        className={`${baseClasses} ${hoverClasses}`}
      >
        {tag}
      </Link>
    );
  }

  return <span className={baseClasses}>{tag}</span>;
}
