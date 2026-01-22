import Link from 'next/link';

interface TagBadgeProps {
  tag: string;
  clickable?: boolean;
  size?: 'sm' | 'md';
}

export function TagBadge({ tag, clickable = true, size = 'sm' }: TagBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  const baseClasses = `inline-block font-mono ${sizeClasses[size]} bg-[#1A1A1A] text-white/60 border border-[#2D2D2D] transition-colors duration-200`;
  const hoverClasses = clickable ? 'hover:border-[#C41E3A] hover:text-[#C41E3A]' : '';

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
