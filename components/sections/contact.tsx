"use client";

import { useState } from "react";
import { Check, Copy, Github, Linkedin, Package } from "lucide-react";
import type { PersonalInfo } from "@/lib/data";

interface ContactProps {
  profile: PersonalInfo;
}

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
      className="px-4 sm:px-6 py-20 md:py-32 scroll-mt-24"
      aria-labelledby="contact-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-xs tracking-[0.2em]">06 /</span>
          <span className="flex-1 h-[2px] bg-foreground" aria-hidden />
        </div>

        <h2
          id="contact-title"
          className="display text-[clamp(2rem,9.5vw,10rem)]"
        >
          Let&apos;s build
          <br />
          <span className="inline-block bg-primary text-primary-foreground border-2 shadow-hard px-[0.12em] mt-[0.08em]">
            something.
          </span>
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 items-end">
          <p className="lg:col-span-5 text-lg md:text-xl leading-relaxed text-muted-foreground">
            First hire at RaftLabs, now a 30+ engineer team and systems serving
            over a million users. If you&apos;re working at that scale —
            architecture, AI, or the team that ships it — I&apos;d like to hear
            about it.
          </p>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-5">
            <div className="flex">
              <a
                href={`mailto:${profile.email}`}
                className="card press flex-1 min-w-0 px-5 py-5 md:px-7 md:py-6 text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight truncate hover:bg-highlight"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="card press -ml-[2px] px-5 grid place-items-center"
                aria-label={copied ? "Email copied" : "Copy email address"}
              >
                {copied ? (
                  <Check size={22} aria-hidden />
                ) : (
                  <Copy size={22} aria-hidden />
                )}
              </button>
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? "Copied to clipboard" : ""}
            </span>

            <div className="flex flex-wrap items-center gap-4">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card press flex items-center gap-2 px-4 py-3 font-bold uppercase text-sm tracking-wide"
                >
                  <Icon size={18} aria-hidden />
                  {label}
                </a>
              ))}
              <span className="chip ml-auto">{profile.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
