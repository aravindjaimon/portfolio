"use client";

import { useEffect, useRef } from "react";
import { education, certifications, achievements } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Award, Trophy, Users, LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  trophy: Trophy,
  award: Award,
  users: Users,
};

const Education = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-wider mb-4">
            EDUCATION & <span className="text-[#C41E3A]">ACHIEVEMENTS</span>
          </h2>
          <p className="text-white/50 font-inter text-base md:text-lg max-w-2xl mx-auto">
            Continuous learning, recognized excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Column */}
          <div className="space-y-6">
            <h3 className="font-bebas text-xl text-white/80 tracking-wider flex items-center gap-2">
              <GraduationCap size={20} className="text-[#C41E3A]" />
              EDUCATION
            </h3>
            {education.map((edu, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 hover:border-[#C41E3A]/30 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bebas text-lg text-white tracking-wide">
                    {edu.degree}
                  </h4>
                  <span
                    className={`text-xs font-mono px-2 py-1 ${
                      edu.status === "In Progress"
                        ? "text-[#C41E3A] bg-[#C41E3A]/10"
                        : "text-white/40 bg-white/5"
                    }`}
                  >
                    {edu.status}
                  </span>
                </div>
                <p className="text-white/60 font-inter text-sm mb-2">
                  {edu.institution}
                </p>
                <p className="text-white/40 font-mono text-xs">
                  {edu.expected || edu.year}
                </p>
                {edu.note && (
                  <p className="text-white/30 font-inter text-xs mt-2 italic">
                    {edu.note}
                  </p>
                )}
              </div>
            ))}

            {/* Certifications */}
            <h3 className="font-bebas text-xl text-white/80 tracking-wider flex items-center gap-2 mt-8">
              <Award size={20} className="text-[#C41E3A]" />
              CERTIFICATIONS
            </h3>
            <div
              ref={(el) => {
                cardsRef.current[education.length] = el;
              }}
              className="bg-[#1A1A1A] border border-[#2D2D2D] p-6"
            >
              <ul className="space-y-2">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-[#C41E3A] rounded-full mt-2" />
                    <span className="text-white/50 font-inter text-sm">
                      {cert}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Achievements Column */}
          <div className="space-y-6">
            <h3 className="font-bebas text-xl text-white/80 tracking-wider flex items-center gap-2">
              <Trophy size={20} className="text-[#C41E3A]" />
              RECOGNITION
            </h3>
            {achievements.map((achievement, index) => {
              const Icon = iconMap[achievement.icon] || Trophy;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[education.length + 1 + index] = el;
                  }}
                  className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 hover:border-[#C41E3A]/30 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#C41E3A]/10">
                      <Icon size={24} className="text-[#C41E3A]" />
                    </div>
                    <div>
                      <h4 className="font-bebas text-lg text-white tracking-wide mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-white/60 font-inter text-sm mb-1">
                        {achievement.description}
                      </p>
                      <p className="text-white/40 font-mono text-xs">
                        {achievement.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
