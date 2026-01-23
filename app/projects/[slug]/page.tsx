import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Users,
  Briefcase,
  Tag,
} from "lucide-react";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

const { baseUrl } = siteConfig;

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Case Study | Aravind Jaimon`,
    description: project.overview || project.challenge,
    keywords: [...project.stack, project.industry, "case study", "portfolio"],
    openGraph: {
      title: `${project.title} - Case Study`,
      description: project.overview || project.challenge,
      type: "article",
      url: `${baseUrl}/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Case Study`,
      description: project.overview || project.challenge,
    },
    alternates: {
      canonical: `${baseUrl}/projects/${slug}`,
    },
  };
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-4 bg-secondary border border-border text-center">
      <div className="font-bebas text-2xl sm:text-3xl text-primary tracking-wide">
        {value}
      </div>
      <div className="text-white/50 text-xs font-mono mt-1">{label}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mb-6 flex items-center gap-3">
      <span className="w-8 h-px bg-primary" />
      {children}
    </h2>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-white/60 hover:text-primary font-mono text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Industry Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
            <Tag size={12} />
            {project.industry}
          </div>

          <h1 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-wide mb-4">
            {project.title}
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-3xl mb-8">
            {project.subtitle}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-white/50 text-sm font-mono">
            <div className="flex items-center gap-2">
              <Briefcase size={14} />
              {project.role}
            </div>
            {project.timeline && (
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {project.timeline}
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-center gap-2">
                <Users size={14} />
                {project.teamSize}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Metrics */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.metrics.map((metric, index) => (
              <MetricCard
                key={index}
                value={metric.value}
                label={metric.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* Overview */}
        {project.overview && (
          <section>
            <SectionTitle>Overview</SectionTitle>
            <p className="text-white/70 text-lg leading-relaxed">
              {project.overview}
            </p>
          </section>
        )}

        {/* The Challenge */}
        <section>
          <SectionTitle>The Challenge</SectionTitle>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            {project.challenge}
          </p>
          {project.problemDetails && (
            <ul className="space-y-3">
              {project.problemDetails.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-white/60"
                >
                  <span className="w-1.5 h-1.5 bg-primary mt-2.5 flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* The Solution */}
        <section>
          <SectionTitle>The Solution</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {project.solution.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-secondary border border-border text-white/70"
              >
                <span className="text-primary font-mono text-sm mr-2">
                  0{index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>

          {project.technicalApproach && (
            <>
              <h3 className="font-bebas text-xl text-white/80 tracking-wide mb-4">
                Technical Approach
              </h3>
              <ul className="space-y-3">
                {project.technicalApproach.map((approach, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white/60"
                  >
                    <span className="w-1.5 h-1.5 bg-primary mt-2.5 flex-shrink-0" />
                    {approach}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* Key Decisions */}
        {project.keyDecisions && (
          <section>
            <SectionTitle>Key Decisions</SectionTitle>
            <div className="space-y-6">
              {project.keyDecisions.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-secondary border border-border"
                >
                  <h4 className="font-bebas text-lg text-white tracking-wide mb-2">
                    {item.decision}
                  </h4>
                  <p className="text-white/60 text-sm">
                    <span className="text-primary font-mono">Why:</span>{" "}
                    {item.reasoning}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        {project.results && (
          <section>
            <SectionTitle>Results</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.results.map((result, index) => (
                <div
                  key={index}
                  className="p-4 bg-background border-l-2 border-primary text-white/70"
                >
                  {result}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lessons Learned */}
        {project.lessons && (
          <section>
            <SectionTitle>Lessons Learned</SectionTitle>
            <ul className="space-y-3">
              {project.lessons.map((lesson, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-white/60"
                >
                  <span className="text-primary font-mono text-sm flex-shrink-0">
                    {index + 1}.
                  </span>
                  {lesson}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tech Stack */}
        <section>
          <SectionTitle>Tech Stack</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-secondary border border-border text-white/60 text-sm font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pt-8 border-t border-border">
          <div className="p-8 bg-secondary border border-border text-center">
            <h3 className="font-bebas text-2xl text-white tracking-wide mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              I help companies build scalable systems and solve complex
              engineering challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:dev@aravindjaimon.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-mono text-sm hover:bg-primary/80 transition-colors"
              >
                Get in Touch
                <ExternalLink size={14} />
              </a>
              <Link
                href="/#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-white/60 font-mono text-sm hover:border-primary hover:text-white transition-colors"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
