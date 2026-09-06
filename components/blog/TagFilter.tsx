"use client";

import { useCallback } from "react";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  const handleTagClick = useCallback(
    (tag: string) => {
      onTagSelect(selectedTag === tag ? null : tag);
    },
    [selectedTag, onTagSelect]
  );

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
      <button
        onClick={() => onTagSelect(null)}
        className={`shrink-0 px-3 py-1.5 text-xs border transition-colors duration-200 ${
          selectedTag === null
            ? "bg-primary border-primary text-foreground"
            : "bg-transparent border-border text-foreground/60 hover:border-primary hover:text-primary"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`shrink-0 px-3 py-1.5 text-xs border transition-colors duration-200 ${
            selectedTag === tag
              ? "bg-primary border-primary text-foreground"
              : "bg-transparent border-border text-foreground/60 hover:border-primary hover:text-primary"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
