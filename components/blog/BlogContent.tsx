'use client';

import * as runtime from 'react/jsx-runtime';
import { useMemo, memo } from 'react';
import { mdxComponents } from './mdx-components';

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
const MDXRenderer = memo(function MDXRenderer({ code }: { code: string }) {
  const MDXContent = useMemo(() => runMDXCode(code), [code]);
  return <MDXContent components={mdxComponents} />;
});

export function BlogContent({ code }: BlogContentProps) {
  return (
    <article className="prose prose-invert max-w-none">
      <MDXRenderer code={code} />
    </article>
  );
}
