"use client";

import { useRef } from "react";
import { createTimeline, stagger, utils } from "animejs";
import { useAnimeScope } from "@/hooks";

import { MARK_PATTERNS, isOn } from "./mark-patterns";

export { MARK_PATTERNS, isOn };

const SIZE = 5;
const CELL = 4;
const GAP = 1;
const BOX = SIZE * CELL + (SIZE - 1) * GAP; // 24
const CELLS = Array.from({ length: SIZE * SIZE }, (_, i) => i);
const RED = "#C41E3A";
const VOLT = "#CCFF00";
const OFF_OPACITY = 0.18;
/** ms each state is held before the cells re-arrange */
const HOLD = 2400;

interface MarkProps {
  className?: string;
  /** Cycle A → J → grid; off by default so static uses (footer, icons) stay still */
  animate?: boolean;
  title?: string;
}

/** Pixel-grid monogram. Renders the A state; `animate` staggers the cells through J and the full grid. */
export function Mark({ className, animate: play = false, title }: MarkProps) {
  const root = useRef<SVGSVGElement>(null);

  useAnimeScope(
    root as unknown as React.RefObject<HTMLElement>,
    ({ matches }) => {
      if (!play || matches.reduceMotion) return;
      const cells = utils.$(".px");
      const tl = createTimeline({ loop: true });
      const states: Array<[string, string]> = [
        [MARK_PATTERNS.j, RED],
        [MARK_PATTERNS.grid, VOLT],
        [MARK_PATTERNS.a, RED],
      ];
      states.forEach(([pattern, color], s) => {
        const at = (s + 1) * HOLD;
        const on = cells.filter((_, i) => isOn(pattern, i));
        const off = cells.filter((_, i) => !isOn(pattern, i));
        const delay = stagger(18, { grid: [SIZE, SIZE], from: "center" });
        // anime.js rejects empty target lists (the full grid has no "off" cells)
        if (on.length) {
          tl.add(
            on,
            {
              opacity: 1,
              scale: 1,
              fill: color,
              duration: 380,
              delay,
              ease: "outBack",
            },
            at
          );
        }
        if (off.length) {
          tl.add(
            off,
            {
              opacity: OFF_OPACITY,
              scale: 0.55,
              fill: color,
              duration: 380,
              delay,
              ease: "out(3)",
            },
            at
          );
        }
      });
      return () => tl.revert();
    },
    [play]
  );

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${BOX} ${BOX}`}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
    >
      {title && <title>{title}</title>}
      {CELLS.map((i) => {
        const x = (i % SIZE) * (CELL + GAP);
        const y = Math.floor(i / SIZE) * (CELL + GAP);
        const on = isOn(MARK_PATTERNS.a, i);
        return (
          <rect
            key={i}
            className="px"
            x={x}
            y={y}
            width={CELL}
            height={CELL}
            fill={RED}
            opacity={on ? 1 : OFF_OPACITY}
            style={{
              transformOrigin: `${x + CELL / 2}px ${y + CELL / 2}px`,
              transform: on ? undefined : "scale(0.55)",
            }}
          />
        );
      })}
    </svg>
  );
}
