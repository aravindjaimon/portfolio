"use client";

import { useState, useEffect } from "react";

/**
 * IntersectionObserver root margin settings
 * - First value (-80px): Creates buffer below viewport top for header clearance
 * - Last value (-80%): Only triggers when element is in top 20% of viewport
 * This ensures the "active" state reflects which section the user is reading
 */
const DEFAULT_ROOT_MARGIN = "-80px 0px -80% 0px";

interface UseScrollSpyOptions {
  /** IntersectionObserver root margin (default: "-80px 0px -80% 0px") */
  rootMargin?: string;
  /** IntersectionObserver threshold (default: 0) */
  threshold?: number | number[];
}

/**
 * Track which element from a list is currently in the viewport
 * Useful for table of contents, navigation highlighting, etc.
 *
 * @param elementIds - Array of element IDs to observe
 * @param options - IntersectionObserver configuration
 * @returns The ID of the currently active (visible) element
 *
 * @example
 * const activeId = useScrollSpy(['section-1', 'section-2', 'section-3']);
 */
export function useScrollSpy(
  elementIds: string[],
  options: UseScrollSpyOptions = {}
): string {
  const [activeId, setActiveId] = useState<string>("");

  const { rootMargin = DEFAULT_ROOT_MARGIN, threshold = 0 } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin, threshold }
    );

    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [elementIds, rootMargin, threshold]);

  return activeId;
}
