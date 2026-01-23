"use client";

import Giscus from "@giscus/react";

interface GiscusCommentsProps {
  /** The GitHub repository in owner/repo format */
  repo?: `${string}/${string}`;
  /** The repository ID from Giscus setup */
  repoId?: string;
  /** The category name for discussions */
  category?: string;
  /** The category ID from Giscus setup */
  categoryId?: string;
}

// Giscus configuration - configured via https://giscus.app
const DEFAULTS = {
  repo: "aravindjaimon/portfolio" as const,
  repoId: "R_kgDOPWNd2w",
  category: "Blog Comments",
  categoryId: "DIC_kwDOPWNd284C1SKj",
};

export function GiscusComments({
  repo = DEFAULTS.repo,
  repoId = DEFAULTS.repoId,
  category = DEFAULTS.category,
  categoryId = DEFAULTS.categoryId,
}: GiscusCommentsProps) {
  // Show setup instructions if not configured
  if (!repoId || !categoryId) {
    return (
      <div className="mt-16 pt-8 border-t border-[#2D2D2D]">
        <h3 className="font-bebas text-2xl text-white tracking-wide mb-4">
          Comments
        </h3>
        <div className="p-6 bg-[#1A1A1A] border border-[#2D2D2D] text-white/60 text-sm font-mono">
          <p className="mb-4">
            Comments are powered by Giscus (GitHub Discussions).
          </p>
          <p className="mb-2">To enable comments:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>
              Visit{" "}
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
      <h3 className="font-bebas text-2xl text-white tracking-wide mb-6">
        Comments
      </h3>
      <Giscus
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark_dimmed"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
