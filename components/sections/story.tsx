import SectionHead from "./section-head";
import type { StoryMilestone } from "@/lib/data";

interface StoryProps {
  milestones: StoryMilestone[];
}

/** Desktop lift per step, in rem — the cards climb like the team did. */
const STEP = 3;

const Story = ({ milestones }: StoryProps) => (
  <section
    id="story"
    className="px-4 sm:px-6 py-20 md:py-28 scroll-mt-24"
    aria-labelledby="story-title"
  >
    <div className="max-w-7xl mx-auto">
      <SectionHead
        id="story-title"
        index="01"
        title={
          <>
            Employee one,
            <br />
            then thirty.
          </>
        }
        intro="No codebase, no standards, no team — then a company default stack, a CI every project runs on, and thirty engineers shipping on it."
      />

      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:items-end">
        {milestones.map((m, i) => (
          <li
            key={m.phase}
            className={`card p-6 flex flex-col lg:min-h-72 lg:mb-[var(--lift)] ${i === milestones.length - 1 ? "bg-primary text-primary-foreground" : ""}`}
            style={{ "--lift": `${STEP * i}rem` } as React.CSSProperties}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-10">
              <span className="display text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">
                {m.date}
              </span>
            </div>
            <h3 className="mt-auto text-lg font-extrabold uppercase tracking-wide">
              {m.phase.replace(/^THE /, "")}
            </h3>
            <p className="mt-2 leading-relaxed opacity-80">{m.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Story;
