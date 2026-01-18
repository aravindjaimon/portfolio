"use client";

import { useEffect, useRef } from 'react';
import { experience } from '@/lib/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    itemsRef.current.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <section className="bg-[#1A1A1A] py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-wider mb-4">
            CAREER <span className="text-[#C41E3A]">TIMELINE</span>
          </h2>
          <p className="text-white/50 font-inter text-base md:text-lg max-w-2xl mx-auto">
            From intern to tech lead. A progression built on impact.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/10" />

          {/* Experience Items */}
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                ref={el => { itemsRef.current[index] = el; }}
                className="relative pl-16 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-6 w-4 h-4 bg-[#0A0A0A] border-2 border-[#C41E3A] rounded-full top-1">
                  {index === 0 && (
                    <div className="absolute inset-0 bg-[#C41E3A] rounded-full animate-pulse" />
                  )}
                </div>

                {/* Content Card */}
                <div className="bg-[#0A0A0A] border border-[#2D2D2D] p-6 hover:border-[#C41E3A]/30 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="font-bebas text-xl md:text-2xl text-white tracking-wide">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Briefcase size={14} className="text-[#C41E3A]" />
                        <span className="text-white/60 font-inter text-sm">{exp.company}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#C41E3A] mt-2 md:mt-0">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-white/30 rounded-full mt-2" />
                        <span className="text-white/50 font-inter text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
