"use client";

import Link from "next/link";
import { Mail, Menu } from "lucide-react";
import { Mark } from "@/components/chrome/mark";
import { siteConfig } from "@/lib/config";

/** Weighed either side of the mark: three links left, two plus the ask right. */
const leftLinks = [
  { label: "Story", href: "/#story" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
];
const rightLinks = [
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
];

const linkClass =
  "text-[0.8125rem] font-medium uppercase tracking-[0.14em] decoration-primary underline-offset-[0.45em]";
const iconPill =
  "size-11 rounded-full border border-rule flex items-center justify-center cursor-pointer hover:bg-card";
const mailto = `mailto:${siteConfig.email}`;

const homeLink = (
  <Link
    href="/"
    className="text-[1.375rem] justify-self-center"
    aria-label="Aravind Jaimon — home"
  >
    <Mark />
  </Link>
);

const Header = () => (
  <header className="fixed inset-x-0 top-0 z-50 h-16 border-b bg-background/90 backdrop-blur">
    {/* lg+: 3 | AJ | 3 on a 1fr|auto|1fr grid, so the mark sits on the axis */}
    <nav
      className="hidden lg:grid h-full max-w-6xl mx-auto px-8 grid-cols-[1fr_auto_1fr] items-center gap-12"
      aria-label="Primary"
    >
      <ul className="flex gap-8 justify-self-end">
        {leftLinks.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className={`${linkClass} hover:underline`}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {homeLink}
      <ul className="flex gap-8 justify-self-start">
        {rightLinks.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className={`${linkClass} hover:underline`}>
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <a href={mailto} className={`${linkClass} text-primary underline`}>
            Email me
          </a>
        </li>
      </ul>
    </nav>

    {/* Below lg: Menu | AJ | Mail */}
    <div className="lg:hidden h-full px-4 grid grid-cols-[2.75rem_1fr_2.75rem] items-center">
      <details className="group">
        <summary
          className={`${iconPill} list-none [&::-webkit-details-marker]:hidden group-open:bg-card`}
          aria-label="Menu"
        >
          <Menu size={20} aria-hidden />
        </summary>
        <nav
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b bg-background text-center px-4"
          aria-label="Primary"
          // Close the disclosure once a link is chosen
          onClick={(e) =>
            e.currentTarget.closest("details")?.removeAttribute("open")
          }
        >
          <ul className="divide-y">
            {[...leftLinks, ...rightLinks].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block py-4 font-serif font-medium text-2xl hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={mailto}
                className="block py-4 font-serif font-medium italic text-2xl text-primary"
              >
                Email me
              </a>
            </li>
          </ul>
        </nav>
      </details>
      {homeLink}
      <a href={mailto} className={iconPill} aria-label="Email Aravind">
        <Mail size={18} aria-hidden />
      </a>
    </div>
  </header>
);

export default Header;
