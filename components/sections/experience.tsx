import SectionHead from "./section-head";
import type { Experience as Role } from "@/lib/data";

interface ExperienceProps {
  experience: Role[];
}

/** Mirrored ledger: who/when on the left, what on the right, a copper axis between. */
const Experience = ({ experience }: ExperienceProps) => (
  <section
    id="experience"
    className="px-4 sm:px-8 py-24 md:py-36 scroll-mt-24"
    aria-labelledby="experience-title"
  >
    <div className="max-w-6xl mx-auto">
      <SectionHead id="experience-title" index="04" title="The ledger" />

      <ol className="mx-auto max-w-5xl divide-y">
        {experience.map((role, i) => (
          <li
            key={`${role.company}-${role.period}`}
            className="grid gap-4 py-10 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:gap-x-10"
          >
            <div className="min-w-0 md:text-right">
              <p className="eyebrow text-copper">
                {role.period}
                {i === 0 && <span className="sr-only"> (current role)</span>}
              </p>
              <h3 className="mt-2 font-serif font-medium text-[1.625rem] leading-tight break-words">
                {role.role}
              </h3>
              <p className="mt-2 eyebrow text-muted-foreground">
                @ {role.company}
              </p>
            </div>

            {/* Axis runs edge to edge through the rules; the node marks the role */}
            <div
              className="relative hidden md:block -my-10 bg-copper"
              aria-hidden
            >
              <span
                className={`absolute left-1/2 top-[4.75rem] size-[9px] -translate-x-1/2 rounded-full ${
                  i === 0 ? "bg-primary" : "border border-copper bg-background"
                }`}
              />
            </div>

            <ul className="min-w-0 space-y-2">
              {role.highlights.map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed">
                  <span className="shrink-0 text-copper" aria-hidden>
                    –
                  </span>
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
