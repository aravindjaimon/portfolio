import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Calendar, Users, Briefcase } from "lucide-react";
import { getProjectBySlug, getAllProjectSlugs, projects } from "@/lib/data";
import { siteConfig } from "@/lib/config";
import { BlogContent } from "@/components/blog";
import { CountUp } from "@/components/motion/count-up";
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
    <main id="main-content" className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-grid border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-16 grid gap-10 md:grid-cols-[1fr_auto] items-end">
          <div>
            <Link
              href="/#work"
              className="inline-block mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60 hover:text-volt transition-colors"
            >
              ← Systems shipped
            </Link>
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] tracking-wide mb-5 text-balance">
              {project.title}
            </h1>
            <p className="text-foreground/70 text-lg sm:text-xl max-w-2xl mb-8">
              {project.subtitle}
            </p>
            <dl className="flex flex-wrap gap-x-8 gap-y-3 text-foreground/60 text-sm font-mono">
              <div className="flex items-center gap-2 text-volt">
                <dt className="sr-only">Industry</dt>
                <dd>{project.industry}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={14} aria-hidden />
                <dt className="sr-only">Role</dt>
                <dd>{project.role}</dd>
              </div>
              {project.timeline && (
                <div className="flex items-center gap-2">
                  <Calendar size={14} aria-hidden />
                  <dt className="sr-only">Timeline</dt>
                  <dd>{project.timeline}</dd>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-2">
                  <Users size={14} aria-hidden />
                  <dt className="sr-only">Team</dt>
                  <dd>{project.teamSize}</dd>
                </div>
              )}
            </dl>
          </div>
          <ProjectGlyph
            name={project.glyph}
            className="hidden md:block w-40 h-40 text-primary"
          />
        </div>
      </header>

      {/* Metrics */}
      <section
        aria-label="Key metrics"
        className="border-b border-border bg-background"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border border-x border-border">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="p-6 sm:p-8">
              <CountUp
                value={metric.value}
                className="block font-bebas text-4xl sm:text-5xl text-primary tracking-wide tabular-nums"
              />
              <div className="text-foreground/60 text-xs font-mono mt-2 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case study body (MDX) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <BlogContent code={project.content} />

        <section className="mt-16 pt-10 border-t border-border">
          <h2 className="font-bebas text-3xl text-foreground tracking-wide mb-6">
            Stack
          </h2>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="px-3 py-1.5 border border-border text-foreground/70 text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border border-border bg-grid p-8 sm:p-12">
          <h2 className="font-bebas text-4xl sm:text-5xl text-foreground tracking-wide mb-4 text-balance">
            Working on something like this?
          </h2>
          <p className="text-foreground/70 mb-8 max-w-xl">
            Happy to compare notes on architecture, delivery and building teams
            — the details above are the short version.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-volt text-volt-foreground font-bebas text-xl tracking-[0.1em] hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Get in touch
              <ArrowUpRight size={14} aria-hidden />
            </a>
            <Link
              href={`/projects/${next.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground/70 font-bebas text-xl tracking-[0.1em] hover:border-foreground hover:text-foreground transition-colors"
            >
              Next: {next.title}
              <ArrowUpRight size={14} aria-hidden />
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center justify-center px-6 py-3 text-foreground/60 font-bebas text-xl tracking-[0.1em] hover:text-foreground transition-colors"
            >
              All case studies
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
