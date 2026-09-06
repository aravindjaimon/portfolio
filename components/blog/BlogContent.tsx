"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo, memo, useRef } from "react";
import { animate, onScroll } from "animejs";
import { useAnimeScope } from "@/hooks";
import { mdxComponents } from "./mdx-components";

interface BlogContentProps {
  code: string;
}

// MDX compiled code executor - this is safe because:
// 1. Code is pre-compiled by Velite at build time from our own MDX files
// 2. MDX files are part of our codebase, not user-generated content
// 3. This is the standard pattern for MDX-based content systems
function runMDXCode(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

// Inner component that renders the MDX content
// Note: This pattern dynamically creates the MDX component from compiled code.
// This is the standard approach for MDX content systems where components are
// pre-compiled at build time.
/* eslint-disable react-hooks/static-components -- MDX compiled components must be created dynamically from code */
const MDXRenderer = memo(function MDXRenderer({ code }: { code: string }) {
  const MDXContent = useMemo(() => runMDXCode(code), [code]);
  return <MDXContent components={mdxComponents} />;
});
/* eslint-enable react-hooks/static-components */

export function BlogContent({ code }: BlogContentProps) {
  const root = useRef<HTMLElement>(null);

  // Each h2 rule draws itself in as the heading scrolls into view
  useAnimeScope(
    root,
    ({ matches }) => {
      if (matches.reduceMotion) return;
      for (const rule of root.current!.querySelectorAll<HTMLElement>(
        ".h-rule"
      )) {
        animate(rule, {
          scaleX: [0, 1],
          duration: 900,
          ease: "inOut(3)",
          autoplay: onScroll({ target: rule, enter: "bottom-=10% top" }),
        });
      }
    },
    [code]
  );

  return (
    <article ref={root} className="prose prose-invert max-w-none">
      <MDXRenderer code={code} />
    </article>
  );
}
