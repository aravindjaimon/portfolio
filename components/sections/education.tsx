"use client";

import { useRef } from "react";
import { animate, onScroll, spring, stagger } from "animejs";
import { useAnimeScope } from "@/hooks";
import type { Achievement, Education as Degree } from "@/lib/data";

interface EducationProps {
  education: Degree[];
  certifications: string[];
  achievements: Achievement[];
}

/** Deliberately the quiet section: one entrance, nothing loops. */
const Education = ({
  education,
  certifications,
  achievements,
}: EducationProps) => {
  const root = useRef<HTMLElement>(null);

  useAnimeScope(root, ({ matches }) => {
    if (matches.reduceMotion) return;
    const enter = () =>
      onScroll({ target: ".ledger", enter: "bottom-=10% top" });
    animate(".ledger-row", {
      opacity: [0, 1],
      x: [-16, 0],
      delay: stagger(70),
      duration: 600,
      ease: "out(3)",
      autoplay: enter(),
    });
    animate(".ledger-mark", {
      scale: [0, 1],
      delay: stagger(70, { start: 120 }),
      ease: spring({ bounce: 0.5 }),
      duration: 700,
      autoplay: enter(),
    });
  });

  const columns: Array<{
    title: string;
    rows: Array<{ head: string; sub: string; foot?: string }>;
  }> = [
    {
      title: "Education",
      rows: education.map((e) => ({
        head: e.degree,
        sub: e.institution,
        foot: e.expected
          ? `${e.status} · expected ${e.expected}`
          : `${e.status} · ${e.year}`,
      })),
    },
    {
      title: "Certifications",
      rows: certifications.map((c) => ({ head: c, sub: "Google Cloud" })),
    },
    {
      title: "Recognition",
      rows: achievements.map((a) => ({
        head: a.title,
        sub: a.description,
        foot: a.detail,
      })),
    },
  ];

  return (
    <section
      ref={root}
      className="bg-grid border-t border-border py-20 md:py-24 px-4 sm:px-6"
      aria-labelledby="education-title"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="education-title"
          className="font-bebas text-5xl md:text-7xl leading-[0.9] tracking-wide text-foreground mb-14"
        >
          On <span className="text-primary">record</span>
        </h2>

        <div className="ledger grid md:grid-cols-3 gap-12 md:gap-8">
          {columns.map((col, ci) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/60 pb-3 border-b border-border mb-2">
                {col.title}
              </h3>
              <ul>
                {col.rows.map((row, ri) => (
                  <li
                    key={row.head}
                    className="ledger-row flex gap-4 py-5 border-b border-border/60 last:border-b-0"
                  >
                    <span
                      className={`ledger-mark mt-2 w-2.5 h-2.5 shrink-0 ${
                        (ci + ri) % 2 ? "bg-volt" : "bg-primary"
                      }`}
                      aria-hidden
                    />
                    <div>
                      <p className="font-bebas text-2xl tracking-wide text-foreground leading-tight">
                        {row.head}
                      </p>
                      <p className="text-foreground/70 mt-1">{row.sub}</p>
                      {row.foot && (
                        <p className="font-mono text-xs text-foreground/60 mt-2">
                          {row.foot}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
