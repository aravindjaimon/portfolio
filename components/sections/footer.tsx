"use client";

import { personalInfo } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2D2D2D] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <a
              href="#"
              className="font-bebas text-2xl text-white tracking-wider"
            >
              <span className="text-[#C41E3A]">A</span>RAVIND{" "}
              <span className="text-[#C41E3A]">J</span>AIMON
            </a>
            <p className="text-white/40 font-inter text-sm mt-1">
              Engineering at Scale
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#C41E3A] transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#C41E3A] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-white/40 hover:text-[#C41E3A] transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-[#2D2D2D]/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-mono text-xs">
            © {currentYear} Aravind Jaimon. All rights reserved.
          </p>
          <p className="text-white/20 font-mono text-xs">
            Built with passion & precision
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
