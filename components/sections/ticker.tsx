import type { ImpactMetric } from "@/lib/data";

interface TickerProps {
  metrics: ImpactMetric[];
}

/** Static balance sheet: metrics weighed 1|1 / 3|3 on a copper fulcrum between ledger double rules. */
const Ticker = ({ metrics }: TickerProps) => (
  <section aria-label="Impact at a glance" className="px-4 sm:px-8">
    <dl className="fulcrum max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-6 gap-y-10 py-10 border-y-[3px] border-double border-foreground">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="@container flex flex-col-reverse justify-end items-center text-center px-3 min-w-0"
        >
          <dt className="eyebrow mt-2 text-muted-foreground">{metric.label}</dt>
          <dd className="stat text-[clamp(1.75rem,22cqi,2.75rem)]">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default Ticker;
