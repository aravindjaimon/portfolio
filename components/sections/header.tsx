"use client";

import { useState, useEffect } from 'react';
import { personalInfo } from '@/lib/data';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#2D2D2D]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="font-bebas text-xl md:text-2xl text-white tracking-wider">
            <span className="text-[#C41E3A]">A</span>J
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-mono text-white/60 hover:text-[#C41E3A] transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </button>
            ))}
            <Button
              asChild
              variant="outline"
              className="border-[#C41E3A] text-[#C41E3A] hover:bg-[#C41E3A] hover:text-white font-mono text-xs tracking-wider transition-all duration-300"
            >
              <a href={`mailto:${personalInfo.email}`}>HIRE ME</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-[#C41E3A] transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#2D2D2D]">
          <nav className="flex flex-col px-4 sm:px-6 py-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-left py-3 text-sm font-mono text-white/60 hover:text-[#C41E3A] transition-colors duration-300 tracking-wide border-b border-[#2D2D2D]/50 last:border-b-0"
              >
                {link.label}
              </button>
            ))}
            <Button
              asChild
              className="w-full bg-[#C41E3A] hover:bg-[#A01830] text-white font-mono text-xs tracking-wider transition-all duration-300 mt-4"
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
