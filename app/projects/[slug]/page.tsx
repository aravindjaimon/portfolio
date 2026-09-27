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
      className="min-h-screen px-4 sm:px-6 pt-28 md:pt-36 pb-24"
    >
      <div className="max-w-5xl mx-auto">
        <Link
          href="/#work"
          className="inline-block mb-8 font-mono text-xs uppercase tracking-[0.2em] hover:bg-highlight"
        >
          ← Systems shipped
        </Link>

        {/* Header card */}
        <header className="card grid md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="p-5 sm:p-10 min-w-0">
            <span className="chip mb-6">{project.industry}</span>
            <h1 className="display text-[clamp(1.75rem,7vw,4.5rem)] text-balance">
              {project.title}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl">
              {project.subtitle}
            </p>
            <dl className="mt-8 flex flex-wrap gap-3 [&_.chip]:whitespace-normal">
              <div className="chip">
                <Briefcase size={12} aria-hidden />
                <dt className="sr-only">Role</dt>
                <dd>{project.role}</dd>
              </div>
              {project.timeline && (
                <div className="chip">
                  <Calendar size={12} aria-hidden />
                  <dt className="sr-only">Timeline</dt>
                  <dd>{project.timeline}</dd>
                </div>
              )}
              {project.teamSize && (
                <div className="chip">
                  <Users size={12} aria-hidden />
                  <dt className="sr-only">Team</dt>
                  <dd>{project.teamSize}</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="hidden md:grid place-items-center p-10 border-l-2 bg-highlight">
            <ProjectGlyph name={project.glyph} className="w-32 h-32" />
          </div>
        </header>

        {/* Metrics */}
        <dl
          aria-label="Key metrics"
          className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {project.metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`@container card flex flex-col-reverse p-4 sm:p-6 min-w-0 ${i === 0 ? "bg-primary text-primary-foreground" : ""}`}
            >
              <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] break-words">
                {metric.label}
              </dt>
              <dd className="stat">{metric.value}</dd>
            </div>
          ))}
        </dl>

        {/* Case study body (MDX) */}
        <div className="max-w-3xl mx-auto mt-20">
          <BlogContent code={project.content} />

          <section className="mt-16 pt-10 border-t-2">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] mb-5">
              Stack
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="px-2.5 py-1 border-2 bg-card text-sm font-medium"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-20 card bg-highlight p-6 sm:p-12">
          <h2 className="display text-[clamp(1.5rem,6vw,3.5rem)] text-balance">
            Working on something like this?
          </h2>
          <p className="mt-5 mb-8 max-w-xl text-lg">
            Happy to compare notes on architecture, delivery and building teams
            — the details above are the short version.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:${email}`}
              className="btn press bg-primary text-primary-foreground justify-center"
            >
              Get in touch <ArrowUpRight size={18} aria-hidden />
            </a>
            <Link
              href={`/projects/${next.slug}`}
              className="btn press bg-card justify-center"
            >
              Next: {next.title} <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
