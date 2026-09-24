"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Mark } from "@/components/chrome/mark";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Story", href: "/#story" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
];

const Header = () => (
  <header className="fixed top-3 inset-x-3 sm:top-4 sm:inset-x-4 z-50">
    <div className="card max-w-7xl mx-auto flex items-center justify-between h-14 pl-4 pr-2">
      <Link
        href="/"
        className="font-mono text-lg font-bold tracking-[-0.08em]"
        aria-label="Aravind Jaimon — home"
      >
        <Mark />
      </Link>

      <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="px-3 py-1.5 text-sm font-semibold uppercase tracking-wide hover:bg-highlight"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={`mailto:${siteConfig.email}`}
          className="ml-2 px-4 py-2 bg-primary text-primary-foreground border-2 text-sm font-bold uppercase tracking-wide shadow-hard-sm press"
        >
          Email me
        </a>
      </nav>

      {/* Mobile: native disclosure */}
      <details className="md:hidden group">
        <summary
          className="list-none [&::-webkit-details-marker]:hidden p-2 border-2 cursor-pointer group-open:bg-highlight"
          aria-label="Menu"
        >
          <Menu size={20} aria-hidden />
        </summary>
        <nav
          className="card absolute left-0 right-0 top-[calc(100%+0.75rem)] flex flex-col p-2"
          aria-label="Primary"
          // Close the disclosure once a link is chosen
          onClick={(e) =>
            e.currentTarget.closest("details")?.removeAttribute("open")
          }
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-3 text-lg font-bold uppercase border-b-2 last:border-b-0 hover:bg-highlight"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 px-3 py-3 bg-primary text-primary-foreground border-2 text-lg font-bold uppercase text-center"
          >
            Email me
          </a>
        </nav>
      </details>
    </div>
  </header>
);

export default Header;
