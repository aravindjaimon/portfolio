import SectionHead from "./section-head";
import type { Experience as Role } from "@/lib/data";

interface ExperienceProps {
  experience: Role[];
}

const Experience = ({ experience }: ExperienceProps) => (
  <section
    id="experience"
    className="px-4 sm:px-6 py-20 md:py-28 scroll-mt-24"
    aria-labelledby="experience-title"
  >
    <div className="max-w-7xl mx-auto">
      <SectionHead id="experience-title" index="04" title="The ledger" />

      <ol className="card">
        {experience.map((role, i) => (
          <li
            key={`${role.company}-${role.period}`}
            className="grid gap-4 md:grid-cols-[12rem_1fr_1.4fr] p-6 md:p-8 border-b-2 last:border-b-0"
          >
            <div className="flex md:flex-col items-start gap-3">
              <span className="font-mono text-sm">{role.period}</span>
              {i === 0 && (
                <span className="sticker px-2 py-0.5 font-mono text-[11px] font-bold uppercase">
                  Now
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                {role.role}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                @ {role.company}
              </p>
            </div>
            <ul className="space-y-2">
              {role.highlights.map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed">
                  <span
                    className="mt-2.5 w-2 h-2 shrink-0 bg-foreground"
                    aria-hidden
                  />
                  {h}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
