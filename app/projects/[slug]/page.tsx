import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Calendar, Users, Briefcase } from "lucide-react";
import { getProjectBySlug, getAllProjectSlugs, projects } from "@/lib/data";
import { siteConfig } from "@/lib/config";
import { BlogContent } from "@/components/blog";
import { ProjectGlyph } from "@/components/sections/project-glyphs";
import type { Metadata } from "next";

const { baseUrl, email } = siteConfig;

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const description = project.challenge;
  return {
    title: `${project.title} | Case Study | Aravind Jaimon`,
    description,
    keywords: [...project.stack, project.industry, "case study", "portfolio"],
    openGraph: {
      title: `${project.title} - Case Study`,
      description,
      type: "article",
      url: `${baseUrl}/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Case Study`,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/projects/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <main
      id="main-content"
      className="min-h-screen px-4 sm:px-8 pt-28 md:pt-36 pb-24"
    >
      <div className="max-w-5xl mx-auto">
        <Link
          href="/#work"
          className="eyebrow inline-block mb-10 transition-colors hover:text-primary"
        >
          ← Weighed, then shipped
        </Link>

        {/* Header: centred on the page axis, no card */}
        <header className="text-center">
          <ProjectGlyph
            name={project.glyph}
            className="mx-auto size-16 text-copper"
          />
          <p className="eyebrow mt-6 text-copper">{project.industry}</p>
          <h1 className="display mt-4 text-[clamp(2rem,6vw,4.5rem)]">
            {project.title}
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground text-balance">
            {project.subtitle}
          </p>
          <dl className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 eyebrow text-muted-foreground">
            <div className="inline-flex items-center gap-1.5">
              <Briefcase size={12} aria-hidden />
              <dt className="sr-only">Role</dt>
              <dd>{project.role}</dd>
            </div>
            {project.timeline && (
              <div className="inline-flex items-center gap-1.5">
                <Calendar size={12} aria-hidden />
                <dt className="sr-only">Timeline</dt>
                <dd>{project.timeline}</dd>
              </div>
            )}
            {project.teamSize && (
              <div className="inline-flex items-center gap-1.5">
                <Users size={12} aria-hidden />
                <dt className="sr-only">Team</dt>
                <dd>{project.teamSize}</dd>
              </div>
            )}
          </dl>
        </header>

        {/* Metrics: hairline cells, copper fulcrum on the centre line */}
        <dl
          aria-label="Key metrics"
          className="fulcrum mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px border bg-border"
        >
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="@container flex flex-col-reverse justify-end items-center bg-background p-6 text-center min-w-0"
            >
              <dt className="eyebrow mt-2 text-muted-foreground break-words">
                {metric.label}
              </dt>
              <dd className="stat">{metric.value}</dd>
            </div>
          ))}
        </dl>

        {/* Case study body (MDX) */}
        <div className="max-w-3xl mx-auto mt-20">
          <BlogContent code={project.content} />

          <section className="mt-16 pt-10 border-t text-center">
            <h2 className="eyebrow mb-5 text-copper">Stack</h2>
            <ul className="credits">
              {project.stack.map((tech) => (
                <li key={tech} className="font-medium">
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-20 bg-rose-tint p-8 sm:p-12 text-center">
          <h2 className="display text-[clamp(1.5rem,6vw,3.5rem)]">
            Working on something like this?
          </h2>
          <p className="mt-5 mb-8 mx-auto max-w-xl text-lg text-balance">
            Happy to compare notes on architecture, delivery and building teams
            — the details above are the short version.
          </p>
          {/* Mirrored pair: equal-width columns either side of the axis */}
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            <a href={`mailto:${email}`} className="btn btn-primary min-w-0">
              Get in touch <ArrowUpRight size={16} aria-hidden />
            </a>
            <Link
              href={`/projects/${next.slug}`}
              className="btn btn-ghost min-w-0"
            >
              <span className="truncate">Next: {next.title}</span>
              <ArrowUpRight size={16} className="shrink-0" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
