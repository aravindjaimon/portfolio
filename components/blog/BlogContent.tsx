"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo, memo } from "react";
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
  return (
    <article className="prose prose-invert max-w-none">
      <MDXRenderer code={code} />
    </article>
  );
}
