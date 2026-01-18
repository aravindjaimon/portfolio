"use client";

import { storyMilestones } from '@/lib/data';
import { useTimelineAnimation } from '@/hooks/useTimelineAnimation';

const About = () => {
  const { sectionRef, titleRef, milestonesRef } = useTimelineAnimation(storyMilestones.length);

  return (
    <section ref={sectionRef} className="bg-[#0A0A0A] py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-wider mb-4">
            THE <span className="text-[#C41E3A]">STORY</span>
          </h2>
          <p className="text-white/50 font-inter text-base md:text-lg max-w-2xl mx-auto">
            From the first line of code to leading engineering teams. A journey of building, scaling, and mentoring.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-16 md:space-y-24">
            {storyMilestones.map((milestone, index) => (
              <div
                key={index}
                ref={el => { milestonesRef.current[index] = el; }}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot indicator */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#C41E3A] rounded-full md:-translate-x-1/2 z-10">
                  <div className="absolute inset-0 bg-[#C41E3A] rounded-full animate-ping opacity-30" />
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                }`}>
                  <span className="inline-block text-[#C41E3A] font-mono text-sm mb-2">
                    {milestone.date}
                  </span>
                  <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wide mb-3">
                    {milestone.phase}
                  </h3>
                  <p className="text-white/60 font-inter text-sm md:text-base leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-24 text-center">
          <blockquote className="font-inter text-xl md:text-2xl text-white/80 italic max-w-3xl mx-auto">
            "Engineering at scale isn't just about code — it's about building systems, teams, and cultures that last."
          </blockquote>
          <div className="w-12 h-px bg-[#C41E3A] mx-auto mt-6" />
        </div>
      </div>
    </section>
  );
};

export default About;
