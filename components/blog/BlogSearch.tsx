"use client";

import { Search, X } from "lucide-react";
import { useState, useCallback } from "react";

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function BlogSearch({
  onSearch,
  placeholder = "Search articles...",
}: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} />
      <input
        type="search"
        aria-label="Search articles"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="card w-full pl-12 pr-12 py-4 placeholder:text-muted-foreground font-mono text-sm [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-highlight"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
