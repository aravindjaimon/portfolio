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
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const baseClasses = `inline-block ${sizeClasses[size]} bg-card border-2 font-mono uppercase tracking-wider`;
  const hoverClasses = clickable ? "hover:bg-highlight" : "";

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
