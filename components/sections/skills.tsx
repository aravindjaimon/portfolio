"use client";

import { useRef, useState } from "react";
import { Shuffle, Undo2 } from "lucide-react";
import {
  animate,
  createDraggable,
  spring,
  utils,
  type Draggable,
} from "animejs";
import { useAnimeScope, type AnimeScope } from "@/hooks";
import type { SkillGroup } from "@/lib/data";

interface SkillsProps {
  groups: SkillGroup[];
}

/** Spring a draggable to (x, y) without fighting its internal state */
function springTo(d: Draggable, x: number, y: number, rotate = 0) {
  const pos = { x: d.x, y: d.y };
  animate(pos, {
    x,
    y,
    ease: spring({ bounce: 0.45 }),
    duration: 900,
    onUpdate: () => {
      d.setX(pos.x, true);
      d.setY(pos.y, true);
    },
  });
  animate(d.$target, { rotate, ease: spring({ bounce: 0.3 }), duration: 900 });
}

const Skills = ({ groups }: SkillsProps) => {
  const root = useRef<HTMLElement>(null);
  const scopeRef = useRef<AnimeScope | null>(null);
  const [physics, setPhysics] = useState(false);

  useAnimeScope(root, (self) => {
    scopeRef.current = self;
    // Touch scrolling and dragging fight on small screens; reduced motion wants stillness.
    if (self.matches.mobile || self.matches.reduceMotion) return;
    setPhysics(true);

    const arena = root.current!.querySelector<HTMLElement>(".arena")!;
    const draggables = utils.$(".chip").map((chip) =>
      createDraggable(chip, {
        container: arena,
        containerPadding: 8,
        containerFriction: 0.6,
        releaseContainerFriction: 0.85,
        releaseEase: spring({ stiffness: 120, damping: 12 }),
      })
    );

    self.add("shuffle", () => {
      const { width, height } = arena.getBoundingClientRect();
      draggables.forEach((d) => {
        const box = d.$target.getBoundingClientRect();
        const origin = { x: box.left - d.x, y: box.top - d.y };
        const arenaBox = arena.getBoundingClientRect();
        const maxX = arenaBox.left + width - box.width - 8 - origin.x;
        const minX = arenaBox.left + 8 - origin.x;
        const maxY = arenaBox.top + height - box.height - 8 - origin.y;
        const minY = arenaBox.top + 8 - origin.y;
        setTimeout(
          () =>
            springTo(
              d,
              utils.random(minX, maxX),
              utils.random(minY, maxY),
              utils.random(-14, 14)
            ),
          utils.random(0, 300)
        );
      });
    });

    self.add("reset", () => {
      draggables.forEach((d, i) =>
        setTimeout(() => springTo(d, 0, 0, 0), i * 10)
      );
    });

    return () => setPhysics(false);
  });

  return (
    <section
      ref={root}
      id="skills"
      className="bg-grid py-20 md:py-24 px-4 sm:px-6 scroll-mt-20"
      aria-labelledby="skills-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2
              id="skills-title"
              className="font-bebas text-6xl md:text-8xl leading-[0.9] tracking-wide text-foreground mb-6"
            >
              Skills, <span className="text-primary">loose</span> on the table
            </h2>
            <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
              {physics
                ? "Every chip is a physical object. Drag one, throw it, watch it spring off the walls."
                : "Six groups, one stack — front to back, cloud to model."}
            </p>
          </div>
          {physics && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => scopeRef.current?.methods.shuffle()}
                className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-bebas text-lg tracking-[0.15em] hover:bg-volt hover:text-volt-foreground transition-colors duration-200"
              >
                <Shuffle size={14} aria-hidden /> Shuffle
              </button>
              <button
                type="button"
                onClick={() => scopeRef.current?.methods.reset()}
                className="inline-flex items-center gap-2 px-5 py-3 border border-border text-foreground/80 font-bebas text-lg tracking-[0.15em] hover:border-foreground hover:text-foreground transition-colors duration-200"
              >
                <Undo2 size={14} aria-hidden /> Reset
              </button>
            </div>
          )}
        </div>

        <div className="arena relative bg-grid border border-border min-h-[70vh] p-6 md:p-10 grid md:grid-cols-3 gap-x-8 gap-y-10 content-start overflow-hidden">
          {groups.map((group) => (
            <div key={group.key}>
              <h3 className="font-bebas text-2xl tracking-wide text-foreground/80 mb-4 border-b border-border pb-2">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={`chip inline-block bg-background border border-foreground/70 px-3 py-2 text-sm text-foreground select-none shadow-[4px_4px_0_0_hsl(var(--primary))] ${
                      physics
                        ? "cursor-grab active:cursor-grabbing touch-none"
                        : ""
                    }`}
                  >
                    {item}
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

export default Skills;
