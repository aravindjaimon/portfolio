"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, isValidElement, ReactNode } from "react";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
import { Mermaid } from "./Mermaid";

// Extract plain text from nested React children (handles rehype-pretty-code's span structure)
function extractTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extractTextContent(props.children);
  }

  return "";
}

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
      type="button"
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 bg-card border-2 hover:bg-highlight"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

// Heading with anchor link
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const sizes = {
    1: "display text-3xl sm:text-4xl mt-14 mb-6",
    2: "display text-2xl sm:text-3xl mt-14 mb-5",
    3: "text-xl sm:text-2xl font-extrabold tracking-tight mt-10 mb-3",
    4: "text-lg sm:text-xl font-bold mt-6 mb-2",
    5: "text-base sm:text-lg font-bold mt-4 mb-2",
    6: "text-sm sm:text-base font-bold mt-4 mb-2",
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
      <Tag id={headingId} className={`group scroll-mt-24 ${sizes[level]}`}>
        <a href={`#${headingId}`} className="inline-flex items-center gap-2">
          {children}
          <LinkIcon
            size={level <= 2 ? 20 : 16}
            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            aria-hidden
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
}: React.HTMLAttributes<HTMLPreElement> & {
  raw?: string;
  "data-language"?: string;
}) {
  // Check if this is a mermaid code block
  // rehype-pretty-code adds data-language to both pre and code elements
  const language = props["data-language"];

  if (language === "mermaid") {
    // Extract the mermaid chart code from nested children
    // rehype-pretty-code wraps content in spans for syntax highlighting
    const chartCode = extractTextContent(children);
    if (chartCode.trim()) {
      return <Mermaid chart={chartCode} />;
    }
  }

  // For non-mermaid blocks, extract code for copy button
  const codeContent = props.raw || extractTextContent(children);

  return (
    <div className="relative my-8 group">
      <pre
        {...props}
        className="card overflow-x-auto p-5 text-sm font-mono leading-relaxed"
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
    <code className="px-1 py-0.5 bg-highlight/60 border border-foreground/20 font-mono text-[0.875em] [overflow-wrap:anywhere]">
      {children}
    </code>
  );
}

// Enhanced image with Next.js Image
function MDXImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src || typeof src !== "string") return null;

  return (
    <figure className="my-8">
      <div className="card relative aspect-video overflow-hidden">
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {alt && (
        <figcaption className="mt-4 text-sm text-muted-foreground font-mono">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

// Blockquote styled as callout
function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 p-5 border-2 border-l-[6px] bg-card">
      <div className="font-medium [&_p]:my-0">{children}</div>
    </blockquote>
  );
}

// Table with horizontal scroll
function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border-2 bg-card">
        {children}
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border-2 bg-highlight px-4 py-2 text-left font-mono text-xs uppercase tracking-wider">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="border-2 px-4 py-2 text-sm">{children}</td>;
}

// Paragraph
function P({ children }: { children: React.ReactNode }) {
  return <p className="my-5 text-[1.075rem] leading-[1.75]">{children}</p>;
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
        className="font-semibold underline decoration-primary decoration-2 underline-offset-4 hover:bg-highlight"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href || "#"}
      className="font-semibold underline decoration-primary decoration-2 underline-offset-4 hover:bg-highlight"
    >
      {children}
    </Link>
  );
}

// Lists
function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-5 ml-6 list-[square] marker:text-primary space-y-2 text-[1.075rem]">
      {children}
    </ul>
  );
}

function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="my-5 ml-6 list-decimal marker:font-mono marker:font-bold space-y-2 text-[1.075rem]">
      {children}
    </ol>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="leading-relaxed">{children}</li>;
}

// Horizontal rule
function Hr() {
  return <hr className="my-12 border-t-2" />;
}

// Strong/Bold
function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold">{children}</strong>;
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
