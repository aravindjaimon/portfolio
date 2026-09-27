import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "./section-head";
import { ProjectGlyph } from "./project-glyphs";
import type { Project } from "@/lib/data";

interface ProjectsProps {
  projects: Project[];
}

const Arrow = () => (
  <ArrowUpRight
    size={22}
    className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    aria-hidden
  />
);

const Projects = ({ projects }: ProjectsProps) => (
  <section
    id="work"
    className="px-4 sm:px-6 py-20 md:py-28 scroll-mt-24"
    aria-labelledby="work-title"
  >
    <div className="max-w-7xl mx-auto">
      <SectionHead
        id="work-title"
        index="02"
        title="Systems shipped"
        intro="Six production systems across six industries. Each one a case study in trade-offs — read the decisions, not just the stack."
      />

      <ul className="flex flex-col gap-5">
        {projects.map((project, i) => {
          const metrics = project.metrics.slice(0, 2);
          return (
            <li key={project.slug}>
              {/* Below lg the metrics drop under the text; from lg they sit in their own columns */}
              <Link
                href={`/projects/${project.slug}`}
                className="card press group grid grid-cols-[3.5rem_minmax(0,1fr)] sm:grid-cols-[5rem_minmax(0,1fr)] lg:grid-cols-[6rem_minmax(0,1fr)_auto_auto] items-stretch"
              >
                <span className="display grid place-items-center text-2xl sm:text-3xl lg:text-4xl border-r-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex flex-col">
                  <div className="p-4 sm:p-6 lg:p-7">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex flex-wrap gap-2 min-w-0">
                        <span className="chip">{project.industry}</span>
                        {project.timeline && (
                          <span className="chip hidden sm:inline-flex">
                            {project.timeline}
                          </span>
                        )}
                      </div>
                      <span className="lg:hidden flex items-center gap-3 shrink-0">
                        <ProjectGlyph
                          name={project.glyph}
                          className="hidden sm:block w-8 h-8"
                        />
                        <Arrow />
                      </span>
                    </div>
                    <h3 className="display text-xl sm:text-2xl md:text-3xl xl:text-4xl leading-none">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground max-w-2xl line-clamp-2">
                      {project.challenge}
                    </p>
                  </div>

                  <dl className="lg:hidden mt-auto grid grid-cols-2 border-t-2">
                    {metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="@container flex flex-col-reverse px-3 py-3 sm:px-6 sm:py-4 border-r-2 last:border-r-0 min-w-0"
                      >
                        <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground break-words">
                          {metric.label}
                        </dt>
                        <dd className="stat">{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <dl className="hidden lg:flex border-l-2">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex flex-col-reverse justify-center w-44 px-5 border-r-2 last:border-r-0"
                    >
                      <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        {metric.label}
                      </dt>
                      <dd className="display normal-case text-2xl whitespace-nowrap tabular-nums">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <span className="hidden lg:flex flex-col items-center justify-between gap-4 p-5 border-l-2">
                  <ProjectGlyph name={project.glyph} className="w-12 h-12" />
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
