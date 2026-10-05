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
  // Mono floor is 12px, so sizes differ by padding only
  const sizeClasses = {
    sm: "px-2.5 py-1",
    md: "px-3 py-1.5",
  };

  const baseClasses = `chip ${sizeClasses[size]}`;
  const hoverClasses = clickable
    ? "transition-colors hover:border-primary"
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
