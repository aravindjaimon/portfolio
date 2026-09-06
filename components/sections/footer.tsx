"use client";

import { useRef } from "react";
import { Github, Linkedin, Mail, Package } from "lucide-react";
import { animate, onScroll, svg } from "animejs";
import { useAnimeScope } from "@/hooks";
import { Mark } from "@/components/chrome/mark";
import type { PersonalInfo } from "@/lib/data";

interface FooterProps {
  profile: PersonalInfo;
}

const Footer = ({ profile }: FooterProps) => {
  const root = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useAnimeScope(root, ({ matches }) => {
    if (matches.reduceMotion) return;
    // Top rule draws itself in as the footer enters
    animate(svg.createDrawable(".rule"), {
      draw: ["0 0", "0 1"],
      ease: "inOut(3)",
      duration: 1600,
      autoplay: onScroll({ target: root.current!, enter: "bottom top+=40" }),
    });
    animate(".wordmark", {
      y: ["30%", "0%"],
      opacity: [0, 1],
      ease: "out(4)",
      duration: 1200,
      autoplay: onScroll({ target: ".wordmark", enter: "bottom top" }),
    });
  });

  const socials = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: profile.npm, label: "npm", Icon: Package },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <footer ref={root} className="relative bg-grid overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-[2px]"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          className="rule"
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke="hsl(var(--volt))"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-8">
        {/* Outline wordmark */}
        <p
          className="wordmark font-bebas outline-text text-foreground/70 leading-[0.85] tracking-wide text-[17vw] lg:text-[13rem] select-none"
          aria-hidden="true"
        >
          {profile.name}
        </p>

        {/* Drafting-sheet title block */}
        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 border border-border divide-x divide-y md:divide-y-0 divide-border bg-background/80 font-mono text-xs uppercase tracking-[0.15em]">
          <div className="p-4">
            <dt className="text-foreground/60 mb-1">Drawn by</dt>
            <dd className="text-foreground">{profile.name}</dd>
          </div>
          <div className="p-4">
            <dt className="text-foreground/60 mb-1">Role</dt>
            <dd className="text-foreground">{profile.title}</dd>
          </div>
          <div className="p-4">
            <dt className="text-foreground/60 mb-1">Location</dt>
            <dd className="text-foreground">{profile.location}</dd>
          </div>
          <div className="p-4">
            <dt className="text-foreground/60 mb-1">Revision</dt>
            <dd className="text-volt">{year}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <ul className="flex items-center gap-5">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="text-foreground/50 hover:text-volt transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-3 text-foreground/60 font-mono text-xs">
            <Mark className="shrink-0 font-mono text-xs font-bold leading-none tracking-[-0.12em]" />
            <span>
              © {year} {profile.name}. Built with Next.js and anime.js.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
