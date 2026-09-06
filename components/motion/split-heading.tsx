"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { animate, splitText, stagger } from "animejs";
import { useAnimeScope } from "@/hooks";

interface SplitHeadingProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}

/** Heading whose characters rise into place on mount; renders plain text without JS. */
export function SplitHeading({
  as: Tag = "h1",
  className,
  children,
  id,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useAnimeScope(ref, ({ matches }) => {
    if (matches.reduceMotion) return;
    animate(splitText(ref.current!, { chars: true }).chars, {
      y: ["110%", "0%"],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(22),
      ease: "out(4)",
    });
  });

  return (
    <Tag ref={ref} id={id} className={`overflow-hidden ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
