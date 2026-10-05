import SectionHead from "./section-head";
import type { SkillGroup } from "@/lib/data";

interface SkillsProps {
  groups: SkillGroup[];
}

/** Six centred groups set as magazine credits, symmetric at every breakpoint. */
const Skills = ({ groups }: SkillsProps) => (
  <section
    id="skills"
    className="px-4 sm:px-8 py-24 md:py-36 scroll-mt-24"
    aria-labelledby="skills-title"
  >
    <div className="max-w-6xl mx-auto">
      <SectionHead
        id="skills-title"
        index="03"
        title={
          <>
            Both sides
            <br />
            <i className="text-air">of the stack.</i>
          </>
        }
        intro="Six groups, one stack — front to back, cloud to model."
      />

      <div className="grid gap-y-16 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => (
          <div key={group.key} className="min-w-0 text-center">
            <p className="eyebrow text-copper">
              No. {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-serif font-medium text-2xl">
              {group.label}
            </h3>
            <ul className="credits mt-4 text-muted-foreground">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
