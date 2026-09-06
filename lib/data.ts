// Portfolio data adapter — content lives in content/data/*.yaml and content/projects/*.mdx
// (built by velite into .velite). This module only re-shapes it under stable names.
import {
  profile,
  milestones,
  skills as skillsCollection,
  metrics,
  experience as experienceCollection,
  education as educationCollection,
  projects as projectsCollection,
  type Project as VeliteProject,
} from "#site/content";

export type PersonalInfo = typeof profile;
export const personalInfo: PersonalInfo = profile;

export type StoryMilestone = (typeof milestones.items)[number];
export const storyMilestones: StoryMilestone[] = milestones.items;

export type SkillGroup = (typeof skillsCollection.groups)[number];
export const skillGroups: SkillGroup[] = skillsCollection.groups;

export type ProjectMetric = (typeof metrics.items)[number];
export type ImpactMetric = ProjectMetric;
export const impactMetrics: ImpactMetric[] = metrics.items;

export type Experience = (typeof experienceCollection.items)[number];
export const experience: Experience[] = experienceCollection.items;

export type Education = (typeof educationCollection.education)[number];
export const education: Education[] = educationCollection.education;
export const certifications: string[] = educationCollection.certifications;

export type Achievement = (typeof educationCollection.achievements)[number];
export const achievements: Achievement[] = educationCollection.achievements;

export type Project = VeliteProject;
export const projects: Project[] = [...projectsCollection].sort(
  (a, b) => a.id - b.id
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
