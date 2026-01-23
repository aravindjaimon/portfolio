"use client";

import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Metrics from "@/components/sections/metrics";
import Experience from "@/components/sections/experience";
import Education from "@/components/sections/education";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Header />
      <main>
        <Hero />
        <section id="story">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="work">
          <Projects />
        </section>
        <Metrics />
        <section id="experience">
          <Experience />
        </section>
        <Education />
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
