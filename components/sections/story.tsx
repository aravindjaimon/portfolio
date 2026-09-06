"use client";

import { useRef } from "react";
import { animate, onScroll, splitText, spring, stagger, svg } from "animejs";
import { useAnimeScope } from "@/hooks";
import type { StoryMilestone } from "@/lib/data";

interface StoryProps {
  milestones: StoryMilestone[];
}

const Story = ({ milestones }: StoryProps) => {
  const root = useRef<HTMLElement>(null);

  useAnimeScope(root, ({ matches }) => {
    if (matches.reduceMotion) return;

    // The ink line is scrubbed by scroll while the timeline passes the viewport centre
    animate(svg.createDrawable(".ink"), {
      draw: ["0 0", "0 1"],
      ease: "linear",
      autoplay: onScroll({
        target: ".timeline",
        enter: "center top",
        leave: "center bottom",
        sync: true,
      }),
    });

    // Each milestone pops its marker and reveals word by word as the ink reaches it
    for (const item of root.current!.querySelectorAll<HTMLElement>(
      ".milestone"
    )) {
      const words = splitText(item.querySelector(".milestone-body")!, {
        words: true,
      }).words;
      const trigger = () =>
        onScroll({ target: item.querySelector("article")!, enter: "75% top" });
      animate(item.querySelector(".marker")!, {
        scale: [0, 1],
        rotate: [90, 45],
        ease: spring({ bounce: 0.6 }),
        duration: 800,
        autoplay: trigger(),
      });
      animate(item.querySelector(".milestone-phase")!, {
        x: [-24, 0],
        opacity: [0, 1],
        ease: "out(4)",
        duration: 600,
        autoplay: trigger(),
      });
      animate(words, {
        y: [10, 0],
        opacity: [0, 1],
        delay: stagger(18),
        ease: "out(3)",
        duration: 500,
        autoplay: trigger(),
      });
    }
  });

  return (
    <section
      ref={root}
      id="story"
      className="bg-grid py-20 md:py-24 px-4 sm:px-6 scroll-mt-20"
      aria-labelledby="story-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <h2
            id="story-title"
            className="font-bebas text-6xl md:text-8xl leading-[0.9] tracking-wide text-foreground mb-6"
          >
            The <span className="text-primary">story</span>
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
            From the first line of code at a one-engineer startup to leading the
            team it became. Building, scaling, mentoring — in that order.
          </p>
        </div>

        <div className="timeline relative grid grid-cols-[56px_1fr] md:grid-cols-[160px_1fr]">
          {/* Ink line snaking down the gutter */}
          <svg
            className="absolute inset-y-0 left-0 w-[56px] md:w-[160px] h-full"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M50 0 C 92 110, 8 190, 50 250 S 92 380, 50 500 S 8 630, 50 750 S 92 900, 50 1000"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="ink"
              d="M50 0 C 92 110, 8 190, 50 250 S 92 380, 50 500 S 8 630, 50 750 S 92 900, 50 1000"
              fill="none"
              stroke="hsl(var(--volt))"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="contents">
            {milestones.map((m, i) => (
              <li key={m.phase} className="milestone contents">
                <div className="relative flex justify-center pt-2">
                  <span
                    className="marker w-4 h-4 rotate-45 bg-volt border-2 border-background shadow-[0_0_0_2px_hsl(var(--volt))]"
                    aria-hidden
                  />
                </div>
                <article
                  className={`pb-12 md:pb-16 ${i === milestones.length - 1 ? "pb-0 md:pb-0" : ""}`}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-volt mb-3">
                    {m.date}
                  </p>
                  <h3 className="milestone-phase font-bebas text-4xl md:text-6xl tracking-wide text-foreground leading-none mb-5">
                    {m.phase}
                  </h3>
                  <p className="milestone-body text-foreground/70 text-lg md:text-xl leading-relaxed max-w-2xl">
                    {m.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Story;
