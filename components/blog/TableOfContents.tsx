"use client";

import { useState, useCallback, useMemo } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";
import { useScrollSpy } from "@/hooks";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  variant?: "mobile" | "desktop";
}

/** Pixels from top of viewport when scrolling to a heading */
const SCROLL_TO_OFFSET = 100;

/** Pixels of indentation per heading level (h3 indented more than h2) */
const INDENT_PER_LEVEL = 12;

export function TableOfContents({ items, variant }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract IDs for the scroll spy hook
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useScrollSpy(itemIds);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - SCROLL_TO_OFFSET,
          behavior: "smooth",
        });
        setIsExpanded(false);
      }
    },
    []
  );

  if (items.length === 0) return null;

  // Mobile: Collapsible TOC
  const mobileContent = (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary border border-border text-foreground/80 font-mono text-sm"
      >
        <span className="flex items-center gap-2">
          <List size={16} />
          Table of Contents
        </span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isExpanded && (
        <nav className="px-4 py-3 bg-secondary border border-t-0 border-border">
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  paddingLeft: `${(item.level - 2) * INDENT_PER_LEVEL}px`,
                }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block py-1 text-sm transition-colors ${
                    activeId === item.id
                      ? "text-primary font-medium"
                      : "text-foreground/60 hover:text-foreground/80"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );

  // Desktop: Sticky Sidebar
  const desktopContent = (
    <aside className="h-full">
      <div className="sticky top-24 space-y-6">
        <div className="p-4 bg-secondary border border-border">
          <h4 className="flex items-center gap-2 text-foreground/80 font-mono text-sm mb-4 pb-2 border-b border-border">
            <List size={16} />
            On this page
          </h4>
          <nav>
            <ul className="space-y-1">
              {items.map((item) => (
                <li
                  key={item.id}
                  style={{
                    paddingLeft: `${(item.level - 2) * INDENT_PER_LEVEL}px`,
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`block py-1.5 text-sm transition-colors border-l-2 pl-3 -ml-px ${
                      activeId === item.id
                        ? "border-primary text-primary"
                        : "border-transparent text-foreground/50 hover:text-foreground/80 hover:border-white/20"
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter in sidebar */}
        <NewsletterSignup />
      </div>
    </aside>
  );

  // Render based on variant
  if (variant === "mobile") return mobileContent;
  if (variant === "desktop") return desktopContent;

  // Default: render both (legacy behavior)
  return (
    <>
      <div className="lg:hidden">{mobileContent}</div>
      <div className="hidden lg:block">{desktopContent}</div>
    </>
  );
}
