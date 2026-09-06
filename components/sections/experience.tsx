"use client";

import { useRef } from "react";
import { createTimeline, onScroll, splitText, stagger } from "animejs";
import { useAnimeScope } from "@/hooks";
import type { Experience as Role } from "@/lib/data";

interface ExperienceProps {
  experience: Role[];
}

/** Timeline ms per role; scroll progress maps onto the whole timeline */
const STEP = 600;

const Experience = ({ experience }: ExperienceProps) => {
  const root = useRef<HTMLElement>(null);

  useAnimeScope(root, ({ matches }) => {
    if (matches.reduceMotion) return;
    const roles = [...root.current!.querySelectorAll<HTMLElement>(".role")];

    const tl = createTimeline({
      defaults: { ease: "out(3)" },
      autoplay: onScroll({
        target: ".rail",
        enter: "bottom-=20% top",
        leave: "top+=20% bottom",
        sync: true,
      }),
    });

    // Playhead sweeps the rail across the full scroll span
    tl.add(
      ".playhead",
      {
        [matches.mobile ? "scaleY" : "scaleX"]: [0, 1],
        ease: "linear",
        duration: roles.length * STEP,
      },
      0
    );

    roles.forEach((role, i) => {
      const at = i * STEP;
      tl.add(role, { opacity: [0.15, 1], y: [24, 0], duration: 400 }, at);
      tl.add(
        splitText(role.querySelector(".role-highlights")!, { words: true })
          .words,
        { opacity: [0, 1], y: [8, 0], duration: 300, delay: stagger(14) },
        at + 150
      );
    });
  });

  return (
    <section
      ref={root}
      id="experience"
      className="bg-grid py-20 md:py-24 px-4 sm:px-6 scroll-mt-20"
      aria-labelledby="experience-title"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="experience-title"
          className="font-bebas text-6xl md:text-8xl leading-[0.9] tracking-wide text-foreground mb-12 max-w-3xl"
        >
          Five roles, <span className="text-primary">one</span> trajectory
        </h2>

        <div className="rail relative">
          {/* The rail: vertical on mobile, horizontal on desktop */}
          <div
            className="absolute left-0 top-0 h-full w-px md:h-px md:w-full bg-border"
            aria-hidden
          />
          <div
            className="playhead absolute left-0 top-0 h-full w-[3px] md:h-[3px] md:w-full bg-volt origin-top md:origin-left"
            aria-hidden
          />

          <ol className="grid md:grid-cols-5 gap-y-12 md:gap-x-8 pl-8 md:pl-0 pt-0 md:pt-10">
            {experience.map((role) => (
              <li
                key={`${role.company}-${role.period}`}
                className="role relative"
              >
                <span
                  className="absolute -left-8 md:left-0 top-1 md:-top-10 w-3 h-3 -translate-x-[5px] md:translate-x-0 md:-translate-y-[5px] bg-primary"
                  aria-hidden
                />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-volt mb-3 tabular-nums">
                  {role.period}
                </p>
                <h3 className="font-bebas text-3xl md:text-[1.9rem] lg:text-4xl leading-none tracking-wide text-foreground mb-1">
                  {role.role}
                </h3>
                <p className="font-mono text-sm text-foreground/60 mb-5">
                  {role.company}
                </p>
                <ul className="role-highlights space-y-2 text-foreground/75 leading-relaxed">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span
                        className="mt-[0.7em] w-3 h-px bg-foreground/40 shrink-0"
                        aria-hidden
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
