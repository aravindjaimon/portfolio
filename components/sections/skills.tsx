import SectionHead from "./section-head";
import type { SkillGroup } from "@/lib/data";

interface SkillsProps {
  groups: SkillGroup[];
}

const Skills = ({ groups }: SkillsProps) => (
  <section
    id="skills"
    className="px-4 sm:px-6 py-20 md:py-28 scroll-mt-24"
    aria-labelledby="skills-title"
  >
    <div className="max-w-7xl mx-auto">
      <SectionHead
        id="skills-title"
        index="03"
        title="The toolbox"
        intro="Six groups, one stack — front to back, cloud to model."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => (
          <div key={group.key} className="card flex flex-col">
            <h3 className="flex items-center justify-between px-5 py-3 border-b-2 font-extrabold uppercase tracking-wide">
              {group.label}
              <span className="font-mono text-xs font-normal">
                {String(i + 1).padStart(2, "0")}
              </span>
            </h3>
            <ul className="flex flex-wrap gap-2 p-5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="px-2.5 py-1 border-2 text-sm font-medium hover:bg-highlight"
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

export default Skills;
