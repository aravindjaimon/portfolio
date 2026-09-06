"use client";

import { useEffect, type RefObject } from "react";
import { createScope, type Scope } from "animejs";

/** Media-query flags available on `scope.matches` inside every build callback */
export const SCOPE_MEDIA_QUERIES = {
  mobile: "(max-width: 767px)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export type AnimeScope = Scope & {
  matches: Record<keyof typeof SCOPE_MEDIA_QUERIES, boolean>;
};

/**
 * Run anime.js animations scoped to a root element, reverted on unmount.
 * Markup must already be in its final visual state — the scope only adds motion,
 * so `reduceMotion` viewers (and JS-off) see a complete page.
 */
export function useAnimeScope(
  root: RefObject<HTMLElement | null>,
  build: (scope: AnimeScope) => void | (() => void),
  deps: readonly unknown[] = []
) {
  useEffect(() => {
    const scope = createScope({
      root,
      mediaQueries: SCOPE_MEDIA_QUERIES,
    }).add((self) => {
      // Motion is decorative: a bug here must never take the page down.
      try {
        return build(self as AnimeScope);
      } catch (error) {
        console.error("useAnimeScope build failed", error);
      }
    });
    return () => scope.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller owns deps
  }, deps);
}
