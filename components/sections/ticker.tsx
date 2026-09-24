import type { ImpactMetric } from "@/lib/data";

interface TickerProps {
  metrics: ImpactMetric[];
}

/** Infinite metrics marquee — pure CSS (`.marquee`), pauses on hover and under reduced motion. */
const Ticker = ({ metrics }: TickerProps) => {
  const row = (hidden: boolean) => (
    <ul
      className="flex items-center shrink-0"
      aria-hidden={hidden || undefined}
    >
      {metrics.map((metric) => (
        <li
          key={metric.label}
          className="flex items-center gap-3 px-6 whitespace-nowrap"
        >
          <span className="display normal-case text-3xl tabular-nums">
            {metric.value}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
            {metric.label}
          </span>
          <span className="ml-6 text-highlight text-2xl" aria-hidden>
            ✱
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Impact at a glance"
      className="bg-foreground text-background overflow-hidden py-5 border-y-2"
    >
      <div
        className="marquee"
        style={{ "--marquee-duration": "45s" } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
};

export default Ticker;
