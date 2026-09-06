"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { animate, onScroll, splitText, stagger, svg } from "animejs";
import { useAnimeScope } from "@/hooks";
import { CountUp } from "@/components/motion/count-up";
import { ProjectGlyph } from "./project-glyphs";
import type { Project } from "@/lib/data";

interface ProjectsProps {
  projects: Project[];
}

const VISIBLE_STACK = 5;

const Projects = ({ projects }: ProjectsProps) => {
  const root = useRef<HTMLElement>(null);

  useAnimeScope(root, ({ matches }) => {
    if (matches.reduceMotion) return;
    const cleanups: Array<() => void> = [];

    for (const card of root.current!.querySelectorAll<HTMLElement>(
      ".project-card"
    )) {
      const path = card.querySelector<SVGPathElement>(".glyph-path")!;
      const alt = card.querySelector<SVGPathElement>(".glyph-alt")!;
      const base = card.querySelector<SVGPathElement>(".glyph-base")!;

      // Entrance: glyph strokes itself in, title letters rise
      const enter = () => onScroll({ target: card, enter: "bottom-=10% top" });
      animate(svg.createDrawable(path), {
        draw: ["0 0", "0 1"],
        duration: 1400,
        ease: "inOut(3)",
        autoplay: enter(),
      });
      animate(
        splitText(card.querySelector(".project-title")!, { chars: true }).chars,
        {
          y: ["100%", "0%"],
          opacity: [0, 1],
          duration: 600,
          delay: stagger(18),
          ease: "out(4)",
          autoplay: enter(),
        }
      );

      // Hover: glyph morphs into its counter-shape and back
      const morph = (to: SVGPathElement) => () =>
        animate(path, { d: svg.morphTo(to), duration: 600, ease: "inOut(3)" });
      const toAlt = morph(alt);
      const toBase = morph(base);
      card.addEventListener("mouseenter", toAlt);
      card.addEventListener("mouseleave", toBase);
      card.addEventListener("focusin", toAlt);
      card.addEventListener("focusout", toBase);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", toAlt);
        card.removeEventListener("mouseleave", toBase);
        card.removeEventListener("focusin", toAlt);
        card.removeEventListener("focusout", toBase);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  });

  return (
    <section
      ref={root}
      id="work"
      className="bg-grid py-20 md:py-24 px-4 sm:px-6 scroll-mt-20"
      aria-labelledby="work-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <h2
            id="work-title"
            className="font-bebas text-6xl md:text-8xl leading-[0.9] tracking-wide text-foreground mb-6"
          >
            Systems <span className="text-primary">shipped</span>
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
            Six production systems across six industries. Each one a case study
            in trade-offs — read the decisions, not just the stack.
          </p>
        </div>

        {/* Ledger topology: one dominant case, two wide, three compact — not a uniform card grid */}
        <ul className="grid md:grid-cols-6 gap-px bg-border border border-border">
          {projects.map((project, i) => {
            const tier = i === 0 ? "lead" : i < 3 ? "wide" : "compact";
            const span =
              tier === "lead"
                ? "md:col-span-6"
                : tier === "wide"
                  ? "md:col-span-3"
                  : "md:col-span-2";
            const metrics =
              tier === "compact"
                ? project.metrics.slice(0, 2)
                : project.metrics;
            const visibleStack =
              tier === "lead"
                ? project.stack.length
                : tier === "wide"
                  ? VISIBLE_STACK
                  : 3;
            return (
              <li key={project.slug} className={`bg-background ${span}`}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={`project-card group relative flex h-full outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-inset ${
                    tier === "lead"
                      ? "flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 p-6 sm:p-8 lg:p-12"
                      : tier === "wide"
                        ? "flex-col p-6 sm:p-8 lg:p-10"
                        : "flex-col p-5 sm:p-6"
                  }`}
                >
                  <div
                    className={
                      tier === "lead"
                        ? "flex flex-col justify-between gap-8"
                        : "contents"
                    }
                  >
                    <div
                      className={`flex items-start justify-between gap-6 ${
                        tier === "compact" ? "mb-5" : "mb-8"
                      }`}
                    >
                      <ProjectGlyph
                        name={project.glyph}
                        pathClassName="glyph-path"
                        className={`text-primary shrink-0 ${
                          tier === "lead"
                            ? "w-28 h-28 lg:w-44 lg:h-44"
                            : tier === "wide"
                              ? "w-16 h-16 sm:w-20 sm:h-20"
                              : "w-12 h-12"
                        }`}
                      />
                      <ArrowUpRight
                        size={tier === "compact" ? 20 : 28}
                        className="text-foreground/40 group-hover:text-volt group-hover:translate-x-1 group-hover:-translate-y-1 transition-[color,transform] duration-200"
                        aria-hidden
                      />
                    </div>
                    {tier === "lead" && (
                      <p className="hidden lg:block font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">
                        Case 01 · {project.timeline} · {project.teamSize}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col flex-1">
                    <h3
                      className={`project-title font-bebas leading-[0.95] tracking-wide text-foreground overflow-hidden mb-2 ${
                        tier === "lead"
                          ? "text-5xl sm:text-6xl lg:text-8xl"
                          : tier === "wide"
                            ? "text-4xl sm:text-5xl"
                            : "text-3xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-volt mb-5">
                      {project.industry} · {project.role}
                    </p>
                    <p
                      className={`text-foreground/70 leading-relaxed mb-8 ${
                        tier === "lead"
                          ? "text-lg max-w-2xl"
                          : tier === "compact"
                            ? "text-sm line-clamp-3"
                            : ""
                      }`}
                    >
                      {project.challenge}
                    </p>

                    <dl
                      className={`grid gap-px bg-border border border-border mb-8 ${
                        tier === "lead"
                          ? "grid-cols-2 lg:grid-cols-4"
                          : "grid-cols-2"
                      }`}
                    >
                      {metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className={`flex flex-col bg-background ${tier === "compact" ? "p-3" : "p-4"}`}
                        >
                          <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/60 mt-1">
                            {metric.label}
                          </dt>
                          <dd
                            className={`order-1 font-bebas text-foreground tracking-wide tabular-nums ${
                              tier === "lead"
                                ? "text-4xl lg:text-5xl"
                                : tier === "wide"
                                  ? "text-3xl"
                                  : "text-2xl"
                            }`}
                          >
                            <CountUp value={metric.value} />
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <ul
                      className="mt-auto flex flex-wrap gap-2"
                      aria-label="Stack"
                    >
                      {project.stack.slice(0, visibleStack).map((tech) => (
                        <li
                          key={tech}
                          className="px-2 py-1 border border-border text-xs text-foreground/70"
                        >
                          {tech}
                        </li>
                      ))}
                      {project.stack.length > visibleStack && (
                        <li className="px-2 py-1 text-xs text-foreground/60">
                          +{project.stack.length - visibleStack}
                        </li>
                      )}
                    </ul>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
