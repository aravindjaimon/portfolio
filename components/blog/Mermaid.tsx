"use client";

import { useEffect, useRef, useState, useId } from "react";

interface MermaidProps {
  chart: string;
}

// Mermaid configuration - applied on each render via dynamic import
const mermaidConfig = {
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#FFFFFF",
    primaryTextColor: "#111111",
    primaryBorderColor: "#111111",
    background: "#F3F0E8",
    mainBkg: "#FFFFFF",
    secondaryColor: "#F5E642",
    tertiaryColor: "#F3F0E8",
    textColor: "#111111",
    lineColor: "#111111",
    nodeBorder: "#111111",
    clusterBkg: "#F3F0E8",
    clusterBorder: "#111111",
    actorBkg: "#FFFFFF",
    actorBorder: "#111111",
    signalColor: "#111111",
    noteBkgColor: "#F5E642",
    noteBorderColor: "#111111",
    todayLineColor: "#2B2BFF",
  },
  fontFamily: "inherit",
  fontSize: 14,
  securityLevel: "strict",
} as const;

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const uniqueId = useId().replace(/:/g, "-");

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      if (!chart.trim()) {
        setError("Empty diagram");
        setLoading(false);
        return;
      }

      try {
        // Dynamic imports - only runs on client, avoiding SSR issues
        const mermaid = (await import("mermaid")).default;

        // Initialize mermaid on each render to ensure consistent state
        mermaid.initialize(mermaidConfig);

        if (cancelled) return;

        // Generate unique ID for this diagram
        const id = `mermaid-${uniqueId}`;

        // Render the chart to SVG
        const { svg: renderedSvg } = await mermaid.render(id, chart);

        // Dynamically import DOMPurify for sanitization
        const DOMPurify = (await import("dompurify")).default;

        // Sanitize SVG output with DOMPurify to prevent XSS attacks.
        // This is safe because:
        // 1. mermaid.render() generates SVG from our own MDX content
        // 2. MDX content is pre-compiled at build time from trusted sources
        // 3. DOMPurify sanitizes the output with SVG-specific profile
        const sanitizedSvg = DOMPurify.sanitize(renderedSvg, {
          USE_PROFILES: { svg: true, svgFilters: true },
          ADD_TAGS: ["foreignObject"],
        });

        if (cancelled) return;
        setSvg(sanitizedSvg);
        setError(null);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error("Mermaid rendering error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to render diagram"
        );
        setLoading(false);
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, uniqueId]);

  if (loading) {
    return (
      <div className="my-6 p-4 bg-background border-2 flex items-center justify-center">
        <div className="text-muted-foreground font-mono text-sm">
          Loading diagram...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-6 p-4 bg-card border border-primary/50 text-sm">
        <div className="flex items-center gap-2 text-primary font-mono mb-2">
          <span>⚠️ Diagram Error</span>
        </div>
        <pre className="text-muted-foreground whitespace-pre-wrap overflow-x-auto text-xs">
          {error}
        </pre>
        <details className="mt-3">
          <summary className="text-muted-foreground cursor-pointer hover:text-muted-foreground text-xs">
            View source
          </summary>
          <pre className="mt-2 text-muted-foreground whitespace-pre-wrap overflow-x-auto text-xs">
            {chart}
          </pre>
        </details>
      </div>
    );
  }

  // Using dangerouslySetInnerHTML is safe here because:
  // 1. The SVG content is sanitized with DOMPurify above
  // 2. Source content comes from trusted MDX files in our codebase
  // 3. mermaid's securityLevel is set to "strict"
  return (
    <div className="my-6 overflow-x-auto">
      <div
        ref={containerRef}
        className="mermaid-container flex justify-center p-4 bg-background border-2 [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
