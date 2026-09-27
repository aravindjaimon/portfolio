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
        type="button"
        aria-pressed={selectedTag === null}
        onClick={() => onTagSelect(null)}
        className={`chip shrink-0 ${
          selectedTag === null
            ? "bg-foreground text-background"
            : "bg-card hover:bg-highlight"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          type="button"
          aria-pressed={selectedTag === tag}
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`chip shrink-0 ${
            selectedTag === tag
              ? "bg-foreground text-background"
              : "bg-card hover:bg-highlight"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
