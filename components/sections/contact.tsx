"use client";

import { useState } from "react";
import { Check, Copy, Github, Linkedin, Package } from "lucide-react";
import type { PersonalInfo } from "@/lib/data";
import { Flank } from "./section-head";

interface ContactProps {
  profile: PersonalInfo;
}

/** Partnership close: the ask, the address, the ways in. */
const Contact = ({ profile }: ContactProps) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const socials = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: profile.npm, label: "npm", Icon: Package },
  ];

  return (
    <section
      id="contact"
      className="px-4 sm:px-8 py-24 md:py-36 scroll-mt-24 text-center"
      aria-labelledby="contact-title"
    >
      <div className="max-w-6xl mx-auto">
        <Flank>No. 06</Flank>

        <h2
          id="contact-title"
          className="display mt-6 text-[clamp(2.75rem,11vw,7rem)] leading-[0.95]"
        >
          Let&apos;s build
          <br />
          <i className="text-primary">it together.</i>
        </h2>

        <p className="mt-10 mx-auto max-w-[46ch] text-left text-lg leading-relaxed text-muted-foreground">
          First hire at RaftLabs, now a 30+ engineer team and systems serving
          over a million users. If you&apos;re working at that scale —
          architecture, AI, or the team that ships it — I&apos;d like to hear
          about{" "}
          <span className="whitespace-nowrap">
            it.
            {/* End-mark drawn as SVG: the U+264E code point renders as an emoji tile */}
            <svg
              viewBox="0 0 24 24"
              width="0.9em"
              height="0.9em"
              role="img"
              aria-label="Libra"
              className="ml-1.5 inline-block align-baseline text-copper"
            >
              <title>Libra</title>
              <path
                d="M3 15.5h5.25a4.75 4.75 0 1 1 7.5 0H21M3 19.5h18"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </svg>
          </span>
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-12 mx-auto block w-fit max-w-full truncate font-serif italic text-[clamp(1.25rem,5vw,2.5rem)] underline decoration-primary decoration-1 underline-offset-[0.2em] hover:text-primary transition-colors"
        >
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="btn btn-ghost mt-6"
        >
          {copied ? (
            <Check size={16} aria-hidden />
          ) : (
            <Copy size={16} aria-hidden />
          )}
          {copied ? "Copied" : "Copy address"}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied to clipboard" : ""}
        </span>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <Icon size={16} aria-hidden />
              {label}
            </a>
          ))}
        </div>

        <p className="mt-8 eyebrow text-muted-foreground">{profile.location}</p>
      </div>
    </section>
  );
};

export default Contact;
