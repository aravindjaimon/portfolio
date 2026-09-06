"use client";

import { useRef } from "react";
import { animate, onScroll, svg } from "animejs";
import { useAnimeScope } from "@/hooks";
import { CountUp } from "@/components/motion/count-up";
import type { ImpactMetric } from "@/lib/data";

interface MetricsProps {
  metrics: ImpactMetric[];
}

/* Serpentine rails along the base of each row — a dimension line under the figures, never through them */
const PATH_DESKTOP = "M12 91 H388 V191 H12";
const PATH_MOBILE = "M12 91 H188 V191 H12 V291 H188 V391 H12";

const Metrics = ({ metrics }: MetricsProps) => {
  const root = useRef<HTMLElement>(null);

  useAnimeScope(root, ({ matches }) => {
    if (matches.reduceMotion) return;
    const layer = matches.mobile ? ".rail-mobile" : ".rail-desktop";
    const path = root.current!.querySelector<SVGPathElement>(`${layer} .rail`)!;
    const dot = root.current!.querySelector<SVGElement>(`${layer} .dot`)!;
    const scrub = () =>
      onScroll({
        target: ".metric-grid",
        enter: "bottom-=15% top",
        leave: "top+=15% bottom",
        sync: true,
      });

    // The volt dot rides the rail as the grid scrolls through
    animate(dot, {
      ...svg.createMotionPath(path),
      ease: "linear",
      autoplay: scrub(),
    });
    animate(svg.createDrawable(path), {
      draw: ["0 0", "0 1"],
      ease: "linear",
      autoplay: scrub(),
    });
  });

  return (
    <section
      ref={root}
      className="bg-grid border-y border-border py-24 md:py-32 px-4 sm:px-6"
      aria-labelledby="metrics-title"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="metrics-title"
          className="font-bebas text-6xl md:text-8xl leading-[0.9] tracking-wide text-foreground mb-14 max-w-3xl"
        >
          Numbers that <span className="text-primary">shipped</span>
        </h2>

        {/* Dimension line: the readings are measurements, drafted */}
        <div
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-volt mb-3"
          aria-hidden="true"
        >
          <span className="w-px h-3 bg-volt" />
          <span className="flex-1 h-px bg-volt/60" />
          <span className="px-2">
            Measured 2020 → {new Date().getFullYear()} · production figures
          </span>
          <span className="flex-1 h-px bg-volt/60" />
          <span className="w-px h-3 bg-volt" />
        </div>

        <div className="metric-grid relative aspect-[1/2] md:aspect-[2/1]">
          {/* Rails: one per layout, sized exactly to the grid so path units stay square */}
          <svg
            className="rail-desktop hidden md:block absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 200"
            aria-hidden="true"
          >
            <path
              className="rail"
              d={PATH_DESKTOP}
              fill="none"
              stroke="hsl(var(--volt))"
              strokeWidth="1.5"
            />
            <rect
              className="dot"
              x="-6"
              y="-6"
              width="12"
              height="12"
              fill="hsl(var(--volt))"
            />
          </svg>
          <svg
            className="rail-mobile md:hidden absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 200 400"
            aria-hidden="true"
          >
            <path
              className="rail"
              d={PATH_MOBILE}
              fill="none"
              stroke="hsl(var(--volt))"
              strokeWidth="1.5"
            />
            <rect
              className="dot"
              x="-6"
              y="-6"
              width="12"
              height="12"
              fill="hsl(var(--volt))"
            />
          </svg>

          <dl className="grid grid-cols-2 md:grid-cols-4 h-full border border-border bg-background/70 backdrop-blur-[2px]">
            {metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`flex flex-col items-center justify-center text-center p-4 border-border ${
                  i % 2 === 1 ? "border-l" : ""
                } ${i >= 2 ? "border-t" : ""} md:border-l md:first:border-l-0 md:[&:nth-child(5)]:border-l-0 md:[&:nth-child(-n+4)]:border-t-0`}
              >
                <dd
                  className={`order-1 font-bebas tracking-wide tabular-nums whitespace-nowrap ${
                    i < 4
                      ? "text-5xl sm:text-6xl lg:text-7xl text-foreground"
                      : "text-3xl sm:text-4xl lg:text-4xl text-foreground/80"
                  }`}
                >
                  <CountUp value={metric.value} />
                </dd>
                <dt
                  className={`order-2 font-mono uppercase tracking-[0.2em] text-foreground/60 mt-2 ${
                    i < 4 ? "text-[11px] sm:text-xs" : "text-[10px]"
                  }`}
                >
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
