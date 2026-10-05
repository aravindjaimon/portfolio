import SectionHead from "./section-head";
import type { StoryMilestone } from "@/lib/data";
import { titleCase } from "@/utils/formatters";

interface StoryProps {
  milestones: StoryMilestone[];
}

/** Milestones on a copper spine: mirrored left/right on md+, left-edge spine below. */
const Story = ({ milestones }: StoryProps) => (
  <section
    id="story"
    className="px-4 sm:px-8 py-24 md:py-36 scroll-mt-24"
    aria-labelledby="story-title"
  >
    <div className="max-w-6xl mx-auto">
      <SectionHead
        id="story-title"
        index="01"
        title={
          <>
            Employee one,
            <br />
            <i className="text-primary">then thirty.</i>
          </>
        }
        intro="No codebase, no standards, no team — then a company default stack, a CI every project runs on, and thirty engineers shipping on it."
      />

      <ol className="relative mx-auto max-w-4xl before:absolute before:inset-y-2 before:left-[5px] md:before:left-1/2 before:w-px before:bg-copper">
        {milestones.map((m, i) => {
          const left = i % 2 === 0;
          const last = i === milestones.length - 1;
          return (
            <li
              key={m.phase}
              className={`relative pl-8 pb-14 last:pb-0 md:w-1/2 ${left ? "md:pl-0 md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}
            >
              <span
                aria-hidden
                className={`absolute top-1.5 left-0 size-[11px] rounded-full border ${left ? "md:left-auto md:-right-[5.5px]" : "md:-left-[5.5px]"} ${last ? "bg-primary border-primary" : "bg-background border-copper"}`}
              />
              <p className="eyebrow text-copper">{m.date}</p>
              <h3 className="mt-1 font-serif font-medium text-[1.75rem] leading-tight">
                {titleCase(m.phase.replace(/^THE /, ""))}
              </h3>
              <p
                className={`mt-2 max-w-[40ch] leading-relaxed text-muted-foreground ${left ? "md:ml-auto" : ""}`}
              >
                {m.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default Story;
