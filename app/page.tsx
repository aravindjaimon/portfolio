import Hero from "@/components/sections/hero";
import Ticker from "@/components/sections/ticker";
import Story from "@/components/sections/story";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Metrics from "@/components/sections/metrics";
import Experience from "@/components/sections/experience";
import Education from "@/components/sections/education";
import Contact from "@/components/sections/contact";
import {
  achievements,
  certifications,
  education,
  experience,
  impactMetrics,
  personalInfo,
  projects,
  skillGroups,
  storyMilestones,
} from "@/lib/data";

export default function Home() {
  const [teamGrowth, usersServed] = impactMetrics;

  return (
    <main className="bg-background">
      <Hero profile={personalInfo} callouts={[usersServed, teamGrowth]} />
      <Ticker metrics={impactMetrics} />
      <Story milestones={storyMilestones} />
      <Skills groups={skillGroups} />
      <Projects projects={projects} />
      <Metrics metrics={impactMetrics} />
      <Experience experience={experience} />
      <Education
        education={education}
        certifications={certifications}
        achievements={achievements}
      />
      <Contact profile={personalInfo} />
    </main>
  );
}
