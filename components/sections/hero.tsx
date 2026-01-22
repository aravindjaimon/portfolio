"use client";

import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';

const Hero = () => {
  const { nameRef, subtitleRef, taglineRef, iconsRef, scrollRef } = useHeroAnimation();

  const renderName = () => {
    return personalInfo.name.split('').map((char, index) => {
      const isHighlighted = (char === 'A' && index === 0) || (char === 'J' && index === 8);

      return (
        <span
          key={index}
          className={`letter inline-block ${char === ' ' ? 'w-2 sm:w-4 md:w-6' : ''} ${
            isHighlighted ? 'text-[#C41E3A]' : ''
          }`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 border border-white/20 rotate-45" />
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 border border-white/20 rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] md:w-[600px] h-[280px] sm:h-[400px] md:h-[600px] border border-white/10 rounded-full" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
        {/* Name */}
        <h1
          ref={nameRef}
          className="font-bebas text-[clamp(36px,11vw,60px)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-wider mb-4 whitespace-nowrap"
        >
          {renderName()}
        </h1>

        {/* Title */}
        <div ref={subtitleRef} className="mb-6">
          <p className="text-lg md:text-xl text-white/80 font-inter tracking-wide">
            {personalInfo.title}
          </p>
          <p className="text-sm md:text-base text-[#C41E3A] font-medium mt-1">
            {personalInfo.subtitle}
          </p>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-white/60 font-inter text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {personalInfo.tagline}
        </p>

        {/* Social Icons */}
        <div ref={iconsRef} className="flex items-center justify-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-[#C41E3A] transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-[#C41E3A] transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-white/60 hover:text-[#C41E3A] transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs font-inter tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} />
      </div>

      {/* Red accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C41E3A] to-transparent opacity-60" />
    </section>
  );
};

export default Hero;
