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
      {metrics.map((metric, i) => (
        <li
          key={metric.label}
          className="flex items-center gap-4 px-6 font-mono text-sm uppercase tracking-[0.2em] whitespace-nowrap"
        >
          <span className="font-bebas text-3xl tracking-wide text-foreground tabular-nums">
            {metric.value}
          </span>
          <span className="text-foreground/60">{metric.label}</span>
          <span
            className={`ml-2 w-2 h-2 ${i % 2 === 0 ? "bg-primary" : "bg-volt"}`}
            aria-hidden
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Impact at a glance"
      className="border-y border-border bg-background overflow-hidden py-4"
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
