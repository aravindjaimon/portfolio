import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "./section-head";
import { ProjectGlyph } from "./project-glyphs";
import type { Project } from "@/lib/data";

interface ProjectsProps {
  projects: Project[];
}

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
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="card press group grid grid-cols-[auto_1fr_auto] md:grid-cols-[6rem_1fr_auto_auto] items-stretch"
            >
              <span className="display grid place-items-center px-4 md:px-0 text-3xl md:text-4xl border-r-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="p-5 md:p-7 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="chip">{project.industry}</span>
                  {project.timeline && (
                    <span className="chip hidden sm:inline-flex">
                      {project.timeline}
                    </span>
                  )}
                </div>
                <h3 className="display text-2xl sm:text-3xl md:text-4xl leading-none">
                  {project.title}
                </h3>
                <p className="mt-3 text-muted-foreground max-w-2xl line-clamp-2">
                  {project.challenge}
                </p>
              </div>

              <dl className="hidden md:flex border-l-2">
                {project.metrics.slice(0, 2).map((metric) => (
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

              <span className="flex flex-col items-center justify-between gap-4 p-4 md:p-5 border-l-2">
                <ProjectGlyph
                  name={project.glyph}
                  className="w-10 h-10 md:w-12 md:h-12"
                />
                <ArrowUpRight
                  size={22}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Projects;
