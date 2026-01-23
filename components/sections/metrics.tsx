"use client";

import { useEffect, useRef } from "react";
import { impactMetrics } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Metrics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    metricsRef.current.forEach((metric, index) => {
      gsap.fromTo(
        metric,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: metric,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A0A0A] py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-white/20 rotate-45" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-wider mb-4">
            BY THE <span className="text-[#C41E3A]">NUMBERS</span>
          </h2>
          <p className="text-white/50 font-inter text-base md:text-lg max-w-2xl mx-auto">
            Measurable impact across systems, teams, and users.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {impactMetrics.map((metric, index) => (
            <div
              key={index}
              ref={(el) => {
                metricsRef.current[index] = el;
              }}
              className="group relative bg-[#1A1A1A] border border-[#2D2D2D] p-4 sm:p-6 md:p-8 text-center hover:border-[#C41E3A]/50 transition-all duration-300"
            >
              {/* Value */}
              <div className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white group-hover:text-[#C41E3A] transition-colors duration-300 mb-2">
                {metric.value}
              </div>
              {/* Label */}
              <div className="text-xs md:text-sm font-mono text-white/40 tracking-wide uppercase">
                {metric.label}
              </div>
              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4">
            <div className="w-16 h-px bg-[#C41E3A]/30" />
            <span className="text-xs font-mono text-white/30 tracking-widest">
              REAL IMPACT. REAL NUMBERS.
            </span>
            <div className="w-16 h-px bg-[#C41E3A]/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
