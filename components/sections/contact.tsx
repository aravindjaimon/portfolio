"use client";

import { personalInfo } from "@/lib/data";
import { Github, Linkedin, Mail, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="bg-[#1A1A1A] py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-wider mb-4">
          LET&apos;S <span className="text-[#C41E3A]">BUILD</span> SOMETHING
        </h2>
        <p className="text-white/50 font-inter text-base md:text-lg max-w-xl mx-auto mb-12">
          Currently building at RaftLabs. Open to interesting conversations
          about architecture, AI, and engineering at scale.
        </p>

        {/* Contact Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12">
          <a
            href={`mailto:${personalInfo.email}`}
            className="group flex items-center gap-4 bg-[#0A0A0A] border border-[#2D2D2D] p-4 hover:border-[#C41E3A]/50 transition-all duration-300"
          >
            <div className="p-2 bg-[#1A1A1A] group-hover:bg-[#C41E3A]/10 transition-colors duration-300">
              <Mail size={20} className="text-[#C41E3A]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono text-white/40 mb-0.5">
                EMAIL
              </div>
              <div className="text-white/80 font-inter text-sm">
                {personalInfo.email}
              </div>
            </div>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-[#0A0A0A] border border-[#2D2D2D] p-4 hover:border-[#C41E3A]/50 transition-all duration-300"
          >
            <div className="p-2 bg-[#1A1A1A] group-hover:bg-[#C41E3A]/10 transition-colors duration-300">
              <Linkedin size={20} className="text-[#C41E3A]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono text-white/40 mb-0.5">
                LINKEDIN
              </div>
              <div className="text-white/80 font-inter text-sm">
                aravindjaimon
              </div>
            </div>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-[#0A0A0A] border border-[#2D2D2D] p-4 hover:border-[#C41E3A]/50 transition-all duration-300"
          >
            <div className="p-2 bg-[#1A1A1A] group-hover:bg-[#C41E3A]/10 transition-colors duration-300">
              <Github size={20} className="text-[#C41E3A]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono text-white/40 mb-0.5">
                GITHUB
              </div>
              <div className="text-white/80 font-inter text-sm">
                aravindjaimon
              </div>
            </div>
          </a>

          <a
            href={personalInfo.npm}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-[#0A0A0A] border border-[#2D2D2D] p-4 hover:border-[#C41E3A]/50 transition-all duration-300"
          >
            <div className="p-2 bg-[#1A1A1A] group-hover:bg-[#C41E3A]/10 transition-colors duration-300">
              <Package size={20} className="text-[#C41E3A]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono text-white/40 mb-0.5">NPM</div>
              <div className="text-white/80 font-inter text-sm">
                ~aravindjaimon
              </div>
            </div>
          </a>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="bg-[#C41E3A] hover:bg-[#A01830] text-white font-bebas text-lg tracking-wider px-8 py-6 transition-all duration-300"
        >
          <a href={`mailto:${personalInfo.email}`}>GET IN TOUCH</a>
        </Button>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 mt-8 text-white/30">
          <MapPin size={14} />
          <span className="text-xs font-mono">{personalInfo.location}</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
