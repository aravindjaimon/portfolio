"use client";

import { useRef } from "react";
import { createTimeline, stagger, utils } from "animejs";
import { useAnimeScope } from "@/hooks";

import { MARK, isOn } from "./mark-patterns";

export { MARK, isOn };

const { cols: COLS, rows: ROWS } = MARK;
const CELL = 4;
const GAP = 1;
const W = COLS * CELL + (COLS - 1) * GAP; // 49
const H = ROWS * CELL + (ROWS - 1) * GAP; // 24
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => i);
const RED = "#C41E3A";
const VOLT = "#CCFF00";
const OFF_OPACITY = 0.18;
/** ms the red state is held before the volt ripple */
const HOLD = 2400;
/** ms the volt state is held before returning to red */
const FLASH = 700;

interface MarkProps {
  className?: string;
  /** Ripple the lit cells red → volt → red; off by default so static uses (footer, icons) stay still */
  animate?: boolean;
  title?: string;
}

/** Pixel-grid "AJ" lockup. The letters never change; `animate` only ripples their colour. */
export function Mark({ className, animate: play = false, title }: MarkProps) {
  const root = useRef<SVGSVGElement>(null);

  useAnimeScope(
    root as unknown as React.RefObject<HTMLElement>,
    ({ matches }) => {
      if (!play || matches.reduceMotion) return;
      const lit = utils.$(".px").filter((_, i) => isOn(i));
      const ripple = () => stagger(18, { grid: [COLS, ROWS], from: "center" });
      const tl = createTimeline({ loop: true })
        .add(
          lit,
          { fill: VOLT, duration: 380, delay: ripple(), ease: "out(3)" },
          HOLD
        )
        .add(
          lit,
          { fill: RED, duration: 380, delay: ripple(), ease: "out(3)" },
          HOLD + FLASH
        );
      return () => tl.revert();
    },
    [play]
  );

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
    >
      {title && <title>{title}</title>}
      {CELLS.map((i) => {
        const x = (i % COLS) * (CELL + GAP);
        const y = Math.floor(i / COLS) * (CELL + GAP);
        const on = isOn(i);
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
