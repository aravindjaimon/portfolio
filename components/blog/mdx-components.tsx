"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, Copy, Link as LinkIcon } from "lucide-react";

// Copy button for code blocks
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white/60 hover:text-white transition-colors rounded"
      aria-label="Copy code"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

// Heading with anchor link
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const sizes = {
    1: "text-3xl sm:text-4xl mt-12 mb-6",
    2: "text-2xl sm:text-3xl mt-10 mb-4",
    3: "text-xl sm:text-2xl mt-8 mb-3",
    4: "text-lg sm:text-xl mt-6 mb-2",
    5: "text-base sm:text-lg mt-4 mb-2",
    6: "text-sm sm:text-base mt-4 mb-2",
  };

  return function Heading({
    children,
    id,
  }: {
    children: React.ReactNode;
    id?: string;
  }) {
    const headingId =
      id ||
      (typeof children === "string"
        ? children.toLowerCase().replace(/\s+/g, "-")
        : undefined);

    return (
      <Tag
        id={headingId}
        className={`font-bebas text-white tracking-wide group ${sizes[level]}`}
      >
        <a
          href={`#${headingId}`}
          className="inline-flex items-center gap-2 hover:text-[#C41E3A] transition-colors"
        >
          {children}
          <LinkIcon
            size={level <= 2 ? 20 : 16}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </a>
      </Tag>
    );
  };
}

// Code block wrapper
function Pre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { raw?: string }) {
  const codeContent = props.raw || "";

  return (
    <div className="relative my-6 group">
      <pre
        {...props}
        className="overflow-x-auto p-4 bg-[#1A1A1A] border border-[#2D2D2D] text-sm font-mono leading-relaxed"
      >
        {children}
      </pre>
      {codeContent && <CopyButton code={codeContent} />}
    </div>
  );
}

// Inline code
function Code({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  // If it's part of a code block (has data-language), don't add inline styling
  if ("data-language" in props) {
    return <code {...props}>{children}</code>;
  }

  return (
    <code className="px-1.5 py-0.5 bg-[#1A1A1A] border border-[#2D2D2D] text-[#C41E3A] font-mono text-sm">
      {children}
    </code>
  );
}

// Enhanced image with Next.js Image
function MDXImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src || typeof src !== "string") return null;

  return (
    <figure className="my-8">
      <div className="relative aspect-video overflow-hidden border border-[#2D2D2D]">
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-white/50 font-mono">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

// Blockquote styled as callout
function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 pl-4 border-l-4 border-[#C41E3A] bg-[#1A1A1A] py-4 pr-4">
      <div className="text-white/80 italic">{children}</div>
    </blockquote>
  );
}

// Table with horizontal scroll
function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-[#2D2D2D]">
        {children}
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border border-[#2D2D2D] bg-[#1A1A1A] px-4 py-2 text-left font-mono text-sm text-white">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-[#2D2D2D] px-4 py-2 text-sm text-white/70">
      {children}
    </td>
  );
}

// Paragraph
function P({ children }: { children: React.ReactNode }) {
  return <p className="my-4 text-white/70 leading-relaxed">{children}</p>;
}

// Links
function A({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#C41E3A] hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href || "#"} className="text-[#C41E3A] hover:underline">
      {children}
    </Link>
  );
}

// Lists
function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-4 ml-6 list-disc text-white/70 space-y-2">{children}</ul>
  );
}

function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="my-4 ml-6 list-decimal text-white/70 space-y-2">
      {children}
    </ol>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="leading-relaxed">{children}</li>;
}

// Horizontal rule
function Hr() {
  return <hr className="my-8 border-[#2D2D2D]" />;
}

// Strong/Bold
function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

// Export all MDX components
export const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  pre: Pre,
  code: Code,
  img: MDXImage,
  blockquote: Blockquote,
  table: Table,
  th: Th,
  td: Td,
  p: P,
  a: A,
  ul: Ul,
  ol: Ol,
  li: Li,
  hr: Hr,
  strong: Strong,
};
