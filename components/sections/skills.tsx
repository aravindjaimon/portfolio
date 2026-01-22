"use client";

import { useEffect, useRef } from 'react';
import { skills } from '@/lib/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Layout, Server, Brain, Cloud, Boxes, LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  key: keyof typeof skills;
  title: string;
  icon: LucideIcon;
}

const skillCategories: SkillCategory[] = [
  { key: 'languages', title: 'Languages', icon: Code2 },
  { key: 'frontend', title: 'Frontend', icon: Layout },
  { key: 'backend', title: 'Backend', icon: Server },
  { key: 'ai', title: 'AI & LLMs', icon: Brain },
  { key: 'cloud', title: 'Cloud & DevOps', icon: Cloud },
  { key: 'systemDesign', title: 'System Design', icon: Boxes }
];

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

const SkillCard = ({ category, index }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = category.icon;

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group bg-[#1A1A1A] border border-[#2D2D2D] p-4 sm:p-6 hover:border-[#C41E3A]/50 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-[#0A0A0A] group-hover:bg-[#C41E3A]/10 transition-colors duration-300">
          <Icon className="w-5 h-5 text-[#C41E3A]" />
        </div>
        <h3 className="font-bebas text-xl text-white tracking-wide">
          {category.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills[category.key].map((skill, idx) => (
          <span
            key={idx}
            className="text-xs font-mono text-white/60 bg-[#0A0A0A] px-3 py-1.5 border border-[#2D2D2D] hover:border-[#C41E3A]/30 hover:text-white/80 transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section className="bg-[#0A0A0A] py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-wider mb-4">
            TECHNICAL <span className="text-[#C41E3A]">EXPERTISE</span>
          </h2>
          <p className="text-white/50 font-inter text-base md:text-lg max-w-2xl mx-auto">
            Full-stack proficiency from Rust to React, Cloud to AI. Building systems that scale.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.key} category={category} index={index} />
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="w-20 h-px bg-white/10" />
          <span className="text-xs font-mono text-white/30 tracking-widest">5+ YEARS OF CRAFT</span>
          <div className="w-20 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
