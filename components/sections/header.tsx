"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { animate, onScroll } from "animejs";
import { Mark } from "@/components/chrome/mark";
import { useAnimeScope, useScrollPosition } from "@/hooks";
import { siteConfig } from "@/lib/config";
import type { PersonalInfo } from "@/lib/data";

/** Pixels scrolled before the header gains its ground */
const SCROLL_THRESHOLD = 50;

const navLinks = [
  { label: "Story", href: "/#story" },
  { label: "Skills", href: "/#skills" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

interface HeaderProps {
  profile: PersonalInfo;
}

const Header = ({ profile }: HeaderProps) => {
  const isScrolled = useScrollPosition(SCROLL_THRESHOLD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const root = useRef<HTMLElement>(null);

  useAnimeScope(root, ({ matches }) => {
    if (matches.reduceMotion) return;

    // Scroll progress hairline across the top of the viewport
    animate(".progress", {
      scaleX: [0, 1],
      ease: "linear",
      autoplay: onScroll({
        target: document.documentElement,
        enter: "top top",
        leave: "bottom bottom",
        sync: true,
      }),
    });
  });

  return (
    <header
      ref={root}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-background/90 backdrop-blur-sm border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className="progress absolute top-0 left-0 h-[2px] w-full bg-volt origin-left scale-x-0 motion-reduce:hidden"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mark + wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 text-foreground"
            aria-label="Aravind Jaimon — home"
          >
            <Mark animate className="w-7 h-7" />
            <span className="font-bebas text-xl md:text-2xl tracking-wider hidden sm:inline">
              ARAVIND JAIMON
            </span>
          </Link>

          {/* Drafting-sheet title block (pairs with the footer's) */}
          <dl className="hidden xl:flex items-stretch border border-border divide-x divide-border font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            <div className="px-3 py-1.5">
              <dt className="sr-only">Role</dt>
              <dd>{profile.title}</dd>
            </div>
            <div className="px-3 py-1.5">
              <dt className="sr-only">Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div className="px-3 py-1.5 text-volt">
              <dt className="sr-only">Revision</dt>
              <dd>Rev {new Date().getFullYear()}</dd>
            </div>
          </dl>

          {/* Desktop navigation */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link relative font-bebas text-lg tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="ml-2 px-4 py-1.5 bg-volt text-volt-foreground font-bebas text-lg tracking-[0.15em] hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              Get in touch
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden text-foreground/80 hover:text-primary transition-colors duration-200"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden bg-background border-t border-border"
          aria-label="Primary"
        >
          <div className="flex flex-col px-4 sm:px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 font-bebas text-2xl tracking-[0.1em] text-foreground/80 hover:text-primary transition-colors duration-200 border-b border-border last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 w-full py-3 text-center bg-volt text-volt-foreground font-bebas text-2xl tracking-[0.1em]"
            >
              Get in touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
