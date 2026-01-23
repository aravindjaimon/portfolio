"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects, Project } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

gsap.registerPlugin(ScrollTrigger);

/** Animation configuration for project cards */
const CARD_ANIMATION = {
  /** Initial Y offset in pixels for fade-in effect */
  INITIAL_Y_OFFSET: 50,
  /** Animation duration in seconds */
  DURATION: 0.7,
  /** Delay multiplier between staggered card animations */
  STAGGER_DELAY: 0.15,
  /** Viewport trigger point (card starts animating when 85% from top) */
  TRIGGER_START: "top 85%",
} as const;

/** Section title animation config */
const TITLE_ANIMATION = {
  INITIAL_Y_OFFSET: 50,
  DURATION: 0.8,
  TRIGGER_START: "top 80%",
} as const;

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

const ProjectCard = ({ project, index, onSelect }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const hasExtendedContent =
    project.overview || project.problemDetails || project.technicalApproach;
  const animationRef = hasExtendedContent ? linkRef : cardRef;

  useEffect(() => {
    gsap.fromTo(
      animationRef.current,
      { opacity: 0, y: CARD_ANIMATION.INITIAL_Y_OFFSET },
      {
        opacity: 1,
        y: 0,
        duration: CARD_ANIMATION.DURATION,
        delay: index * CARD_ANIMATION.STAGGER_DELAY,
        scrollTrigger: {
          trigger: animationRef.current,
          start: CARD_ANIMATION.TRIGGER_START,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index, animationRef]);

  const CardContent = (
    <>
      {/* Industry tag */}
      <div className="absolute top-4 right-4">
        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1">
          {project.industry}
        </span>
      </div>

      {/* Content */}
      <div className="mb-6 pr-20">
        <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wide mb-1">
          {project.title}
        </h3>
        <p className="text-white/50 font-inter text-sm">{project.subtitle}</p>
      </div>

      {/* Challenge preview */}
      <p className="text-white/40 font-inter text-sm leading-relaxed mb-6 line-clamp-2">
        {project.challenge}
      </p>

      {/* Metrics preview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {project.metrics.slice(0, 2).map((metric, idx) => (
          <div key={idx} className="text-center p-3 bg-background">
            <div className="font-bebas text-xl text-primary">
              {metric.value}
            </div>
            <div className="text-xs font-mono text-white/40">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Stack preview */}
      <div className="flex flex-wrap gap-1 mb-4">
        {project.stack.slice(0, 4).map((tech, idx) => (
          <span
            key={idx}
            className="text-[10px] font-mono text-white/40 bg-background px-2 py-1"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="text-[10px] font-mono text-white/30 bg-background px-2 py-1">
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      {/* View more indicator */}
      <div className="flex items-center gap-2 text-white/30 group-hover:text-primary transition-colors duration-300">
        <span className="text-xs font-mono tracking-wide">VIEW CASE STUDY</span>
        <ArrowUpRight
          size={14}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
        />
      </div>
    </>
  );

  // Link to case study page if extended content exists, otherwise use modal
  if (hasExtendedContent) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        ref={linkRef}
        className="group relative bg-secondary border border-border p-4 sm:p-6 cursor-pointer hover:border-primary/50 transition-all duration-300 block"
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(project)}
      className="group relative bg-secondary border border-border p-4 sm:p-6 cursor-pointer hover:border-primary/50 transition-all duration-300"
    >
      {CardContent}
    </div>
  );
};

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, open, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-secondary border-border text-white max-w-[95vw] sm:max-w-xl md:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 mb-3 inline-block">
                {project.industry}
              </span>
              <DialogTitle className="font-bebas text-3xl md:text-4xl text-white tracking-wide">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-white/50 font-inter text-sm mt-1">
                {project.subtitle} • {project.role}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Challenge */}
          <div>
            <h4 className="font-bebas text-lg text-white/80 tracking-wide mb-3">
              THE CHALLENGE
            </h4>
            <p className="text-white/60 font-inter text-sm leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h4 className="font-bebas text-lg text-white/80 tracking-wide mb-3">
              THE SOLUTION
            </h4>
            <ul className="space-y-2">
              {project.solution.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span className="text-white/60 font-inter text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          <div>
            <h4 className="font-bebas text-lg text-white/80 tracking-wide mb-3">
              IMPACT
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="text-center p-4 bg-background border border-border"
                >
                  <div className="font-bebas text-2xl text-primary">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono text-white/40 mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-bebas text-lg text-white/80 tracking-wide mb-3">
              TECH STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono text-white/60 bg-background px-3 py-1.5 border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Projects = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: TITLE_ANIMATION.INITIAL_Y_OFFSET },
      {
        opacity: 1,
        y: 0,
        duration: TITLE_ANIMATION.DURATION,
        scrollTrigger: {
          trigger: titleRef.current,
          start: TITLE_ANIMATION.TRIGGER_START,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section className="bg-background py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-wider mb-4">
            SELECTED <span className="text-primary">WORK</span>
          </h2>
          <p className="text-white/50 font-inter text-base md:text-lg max-w-2xl mx-auto">
            Systems built for millions. From high-scale affiliate platforms to
            AI assistants and cross-platform applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={handleSelectProject}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default Projects;
