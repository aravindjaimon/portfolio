"use client";

import { useState, useEffect } from "react";

/** Default pixels scrolled before triggering "scrolled" state */
const DEFAULT_THRESHOLD = 50;

/**
 * Track whether the user has scrolled past a threshold
 * Useful for sticky headers, back-to-top buttons, scroll-triggered animations
 *
 * @param threshold - Pixels from top before isScrolled becomes true (default: 50)
 * @returns Boolean indicating if scroll position exceeds threshold
 *
 * @example
 * const isScrolled = useScrollPosition(100);
 * // Returns true when user has scrolled more than 100px
 */
export function useScrollPosition(threshold = DEFAULT_THRESHOLD): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
