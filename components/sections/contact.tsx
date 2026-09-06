"use client";

import { useRef, useState } from "react";
import { Check, Copy, Github, Linkedin, MapPin, Package } from "lucide-react";
import {
  animate,
  createDraggable,
  splitText,
  spring,
  stagger,
  utils,
} from "animejs";
import { useAnimeScope } from "@/hooks";
import type { PersonalInfo } from "@/lib/data";

interface ContactProps {
  profile: PersonalInfo;
}

const Contact = ({ profile }: ContactProps) => {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useAnimeScope(root, ({ matches }) => {
    if (matches.reduceMotion) return;
    const headline = root.current!.querySelector<HTMLElement>(".shout")!;
    const { chars } = splitText(headline, { chars: true });

    // Letters scatter under the pointer and spring home when it leaves
    const scatter = () =>
      animate(chars, {
        x: () => utils.random(-40, 40),
        y: () => utils.random(-40, 40),
        rotate: () => utils.random(-25, 25),
        delay: stagger(8, { from: "random" }),
        ease: "out(3)",
        duration: 400,
      });
    const home = () =>
      animate(chars, {
        x: 0,
        y: 0,
        rotate: 0,
        delay: stagger(8, { from: "random" }),
        ease: spring({ bounce: 0.5 }),
        duration: 900,
      });
    headline.addEventListener("pointerenter", scatter);
    headline.addEventListener("pointerleave", home);

    // The business card is a draggable object that springs back to its slot
    if (!matches.mobile) {
      const card = createDraggable(".card", {
        container: root.current!,
        containerPadding: 12,
        releaseEase: spring({ bounce: 0.6 }),
        onRelease: (d) => {
          const pos = { x: d.x, y: d.y };
          animate(pos, {
            x: 0,
            y: 0,
            ease: spring({ bounce: 0.4 }),
            duration: 1000,
            delay: 250,
            onUpdate: () => {
              d.setX(pos.x, true);
              d.setY(pos.y, true);
            },
          });
        },
      });
      // Idle sway so the card reads as movable before anyone touches it
      animate(card.$target, {
        rotate: [-1.5, 1.5],
        alternate: true,
        loop: true,
        duration: 3200,
        ease: "inOutSine",
      });
    }

    return () => {
      headline.removeEventListener("pointerenter", scatter);
      headline.removeEventListener("pointerleave", home);
    };
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section
      ref={root}
      id="contact"
      className="contact-arena relative bg-grid border-t border-border py-24 md:py-32 px-4 sm:px-6 overflow-hidden scroll-mt-20"
      aria-labelledby="contact-title"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-14 items-center">
        <div>
          <h2
            id="contact-title"
            className="shout font-bebas text-[clamp(4rem,14vw,12rem)] leading-[0.85] tracking-wide text-foreground cursor-default select-none"
          >
            Let&apos;s <span className="text-primary">build</span>
          </h2>
          <p className="mt-8 text-foreground/70 text-lg md:text-xl leading-relaxed max-w-xl">
            Currently leading engineering at RaftLabs. Open to lead and staff
            roles, and to serious conversations about architecture, AI, and
            scaling teams.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center px-6 py-3 bg-volt text-volt-foreground font-bebas text-xl tracking-[0.15em] shadow-[6px_6px_0_0_hsl(var(--primary))] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_hsl(var(--primary))] transition-[transform,box-shadow] duration-150"
            >
              Email me
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 border border-border text-foreground/80 font-mono text-sm hover:border-foreground hover:text-foreground transition-colors duration-200"
              aria-live="polite"
            >
              {copied ? (
                <Check size={16} aria-hidden />
              ) : (
                <Copy size={16} aria-hidden />
              )}
              {copied ? "Copied" : profile.email}
            </button>
          </div>
        </div>

        {/* Business card */}
        <div className="flex lg:justify-end">
          <article
            className="card w-full max-w-sm bg-background border border-foreground/80 shadow-[10px_10px_0_0_hsl(var(--primary))] cursor-grab active:cursor-grabbing touch-none select-none"
            aria-label="Business card"
          >
            <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
              <span className="font-bebas text-2xl tracking-wider">
                {profile.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                est. 2020
              </span>
            </div>
            <div className="px-6 py-6 space-y-4">
              <p className="font-bebas text-3xl tracking-wide text-foreground leading-none">
                {profile.title}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-volt">
                {profile.subtitle}
              </p>
              <dl className="pt-4 border-t border-border font-mono text-sm text-foreground/80 space-y-2">
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Email</dt>
                  <dd>{profile.email}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin
                    size={14}
                    className="text-foreground/50"
                    aria-hidden
                  />
                  <dt className="sr-only">Location</dt>
                  <dd>{profile.location}</dd>
                </div>
              </dl>
              <ul className="flex items-center gap-3 pt-2">
                {[
                  { href: profile.github, label: "GitHub", Icon: Github },
                  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
                  { href: profile.npm, label: "npm", Icon: Package },
                ].map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 border border-border text-foreground/60 hover:text-volt hover:border-volt transition-colors"
                      aria-label={label}
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Contact;
