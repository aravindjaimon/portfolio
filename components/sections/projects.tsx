import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "./section-head";
import { ProjectGlyph } from "./project-glyphs";
import { decision, type Project } from "@/lib/data";

interface ProjectsProps {
  projects: Project[];
}

const Arrow = () => (
  <ArrowUpRight
    size={14}
    className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    aria-hidden
  />
);

/** Mini beam tipped so the chosen (left) side sinks: the heavier argument won. */
const Beam = () => (
  <svg viewBox="0 0 40 16" className="h-4 w-10 text-copper" aria-hidden>
    <path
      transform="rotate(-10 20 8)"
      d="M3 8h34"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path d="M20 8l-3 7h6z" fill="currentColor" />
  </svg>
);

const Projects = ({ projects }: ProjectsProps) => (
  <section
    id="work"
    className="px-4 sm:px-8 py-24 md:py-36 scroll-mt-24"
    aria-labelledby="work-title"
  >
    <div className="max-w-6xl mx-auto">
      <SectionHead
        id="work-title"
        index="02"
        title={
          <>
            Weighed,
            <br />
            <i className="text-air">then shipped.</i>
          </>
        }
        intro="Six production systems across six industries. Each one a case study in trade-offs — read the decisions, not just the stack."
      />

      {/* Hairline grid: the 1px gaps show the border colour behind the cells */}
      <ul className="grid md:grid-cols-2 gap-px bg-border border">
        {projects.map((project, i) => {
          const metrics = project.metrics.slice(0, 2);
          const d = decision(project);
          return (
            <li key={project.slug} className="bg-background min-w-0">
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col items-center text-center p-6 sm:p-10 transition-colors hover:bg-card"
              >
                <p className="eyebrow text-copper break-words">
                  No. {String(i + 1).padStart(2, "0")} · {project.industry}
                </p>
                <ProjectGlyph
                  name={project.glyph}
                  className="mt-6 size-11 text-copper"
                />
                <h3 className="display mt-5 text-[clamp(1.5rem,3vw,2.25rem)] decoration-primary decoration-1 underline-offset-[0.2em] group-hover:underline">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-muted-foreground line-clamp-2">
                  {project.challenge}
                </p>

                {d && (
                  <p className="mt-6 grid w-full grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] items-center gap-3 text-sm break-words">
                    <span className="sr-only">Key decision: </span>
                    <span className="text-right font-semibold text-balance">
                      {d.chosen}
                    </span>
                    <Beam />
                    <span className="sr-only"> chosen over </span>
                    <span className="text-left text-muted-foreground text-balance">
                      {d.over}
                    </span>
                  </p>
                )}

                <dl className="fulcrum mt-auto pt-8 grid w-full grid-cols-2">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="@container flex flex-col-reverse justify-end items-center px-3 min-w-0"
                    >
                      <dt className="eyebrow mt-2 text-muted-foreground break-words">
                        {metric.label}
                      </dt>
                      <dd className="stat">{metric.value}</dd>
                    </div>
                  ))}
                </dl>

                <span className="eyebrow mt-8 inline-flex items-center gap-1.5 text-primary">
                  Read the case study
                  <Arrow />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Projects;
