'use client';

import { useEffect, useRef } from 'react';

interface GiscusCommentsProps {
  /** The GitHub repository in owner/repo format */
  repo?: string;
  /** The repository ID from Giscus setup */
  repoId?: string;
  /** The category name for discussions */
  category?: string;
  /** The category ID from Giscus setup */
  categoryId?: string;
}

// Default values - user should replace these after setting up Giscus at https://giscus.app
const DEFAULTS = {
  repo: 'aravindjaimon/portfolio',
  repoId: '', // Get from https://giscus.app
  category: 'Blog Comments',
  categoryId: '', // Get from https://giscus.app
};

export function GiscusComments({
  repo = DEFAULTS.repo,
  repoId = DEFAULTS.repoId,
  category = DEFAULTS.category,
  categoryId = DEFAULTS.categoryId,
}: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !repoId || !categoryId) return;

    // Check if script is already loaded
    const existingScript = ref.current.querySelector('script.giscus');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.className = 'giscus';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'dark_dimmed');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    ref.current.appendChild(script);

    return () => {
      // Cleanup on unmount
      const giscusFrame = ref.current?.querySelector('iframe.giscus-frame');
      if (giscusFrame) {
        giscusFrame.remove();
      }
    };
  }, [repo, repoId, category, categoryId]);

  // Show setup instructions if not configured
  if (!repoId || !categoryId) {
    return (
      <div className="mt-16 pt-8 border-t border-[#2D2D2D]">
        <h3 className="font-bebas text-2xl text-white tracking-wide mb-4">Comments</h3>
        <div className="p-6 bg-[#1A1A1A] border border-[#2D2D2D] text-white/60 text-sm font-mono">
          <p className="mb-4">Comments are powered by Giscus (GitHub Discussions).</p>
          <p className="mb-2">To enable comments:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>
              Visit{' '}
              <a
                href="https://giscus.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C41E3A] hover:underline"
              >
                giscus.app
              </a>
            </li>
            <li>Enable Discussions on your GitHub repository</li>
            <li>Configure Giscus and copy the repo ID and category ID</li>
            <li>Update the values in GiscusComments.tsx</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 pt-8 border-t border-[#2D2D2D]">
      <h3 className="font-bebas text-2xl text-white tracking-wide mb-6">Comments</h3>
      <div ref={ref} className="giscus-container" />
    </div>
  );
}
