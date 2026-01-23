"use client";

import { useState } from "react";
import Link from "next/link";
import { personalInfo } from "@/lib/data";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks";

/** Pixels scrolled before header style changes (adds background) */
const SCROLL_THRESHOLD = 50;

const navLinks: { label: string; href: string; isExternal?: boolean }[] = [
  { label: "Story", href: "#story" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog", isExternal: true },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const isScrolled = useScrollPosition(SCROLL_THRESHOLD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-bebas text-xl md:text-2xl text-white tracking-wider"
          >
            <span className="text-primary">A</span>J
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isExternal ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-mono text-white/60 hover:text-primary transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-mono text-white/60 hover:text-primary transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </button>
              )
            )}
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white font-mono text-xs tracking-wider transition-all duration-300"
            >
              <a href={`mailto:${personalInfo.email}`}>HIRE ME</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-primary transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col px-4 sm:px-6 py-4">
            {navLinks.map((link) =>
              link.isExternal ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-3 text-sm font-mono text-white/60 hover:text-primary transition-colors duration-300 tracking-wide border-b border-border/50 last:border-b-0"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left py-3 text-sm font-mono text-white/60 hover:text-primary transition-colors duration-300 tracking-wide border-b border-border/50 last:border-b-0"
                >
                  {link.label}
                </button>
              )
            )}
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/80 text-white font-mono text-xs tracking-wider transition-all duration-300 mt-4"
            >
              <a href={`mailto:${personalInfo.email}`}>HIRE ME</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
