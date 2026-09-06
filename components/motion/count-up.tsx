"use client";

import { useRef } from "react";
import { animate, onScroll, utils } from "animejs";
import { useAnimeScope } from "@/hooks";

/** Splits "1.5M+" into ["", 1.5, "M+"]; returns null when there is no number to count. */
export function parseMetric(value: string) {
  const m = /^(.*?)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  return {
    prefix,
    target: Number(num),
    suffix,
    decimals: (num.split(".")[1] ?? "").length,
  };
}

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

/** Renders the final value (SSR-safe); counts up from 0 the first time it scrolls into view. */
export function CountUp({ value, className, duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useAnimeScope(
    ref,
    ({ matches }) => {
      const parsed = parseMetric(value);
      const el = ref.current;
      if (!parsed || !el || matches.reduceMotion) return;
      const { prefix, target, suffix, decimals } = parsed;
      const counter = { n: 0 };
      animate(counter, {
        n: target,
        duration,
        ease: "out(3)",
        modifier: utils.round(decimals),
        onUpdate: () => {
          el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`;
        },
        autoplay: onScroll({ target: el, enter: "bottom-=5% top" }),
      });
    },
    [value, duration]
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
