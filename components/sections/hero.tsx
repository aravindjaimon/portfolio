"use client";

import { useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import {
  animate,
  createTimeline,
  splitText,
  stagger,
  svg,
  utils,
} from "animejs";
import { useAnimeScope } from "@/hooks";
import type { ImpactMetric, PersonalInfo } from "@/lib/data";

const GRID = 13;
const CELLS = Array.from({ length: GRID * GRID }, (_, i) => i);
const VOLT = "#CCFF00";
const HAIRLINE = "#2D2D2D";
/** Minimum ms between pointer ripples */
const RIPPLE_THROTTLE = 120;
/** Cells within this Chebyshev distance of the pointer flash volt */
const RIPPLE_RADIUS = 2;

interface HeroProps {
  profile: PersonalInfo;
  /** Two metrics rendered as dimension callouts on the grid edges */
  callouts: [ImpactMetric, ImpactMetric];
}

/** Wraps the leading letter of each word in the brand red */
function BrandName({ name }: { name: string }) {
  return (
    <>
      {name.split(" ").map((word, i) => (
        <span key={word} className="inline-block whitespace-nowrap">
          {i > 0 && <span className="inline-block w-[0.18em]" aria-hidden />}
          <span className="text-primary">{word[0]}</span>
          {word.slice(1)}
        </span>
      ))}
    </>
  );
}

const Hero = ({ profile, callouts }: HeroProps) => {
  const root = useRef<HTMLElement>(null);

  useAnimeScope(root, ({ matches }) => {
    if (matches.reduceMotion) return;
    const section = root.current!;
    const layer = section.querySelector<HTMLElement>(".cells")!;
    const cells = utils.$(".cell");

    // Breathing 13×13 grid from the centre
    animate(cells, {
      scale: [0.8, 0.45, 0.8],
      duration: 2400,
      delay: stagger(50, { grid: [GRID, GRID], from: "center" }),
      loop: true,
      ease: "inOutSine",
    });

    // Pointer ripple in volt from the nearest cell
    let last = 0;
    const ripple = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < RIPPLE_THROTTLE) return;
      last = now;
      const box = layer.getBoundingClientRect();
      const col = utils.clamp(
        Math.floor(((e.clientX - box.left) / box.width) * GRID),
        0,
        GRID - 1
      );
      const row = utils.clamp(
        Math.floor(((e.clientY - box.top) / box.height) * GRID),
        0,
        GRID - 1
      );
      const near = cells.filter((_, i) => {
        const r = Math.floor(i / GRID);
        const c = i % GRID;
        return Math.max(Math.abs(r - row), Math.abs(c - col)) <= RIPPLE_RADIUS;
      });
      animate(near, {
        borderColor: [VOLT, HAIRLINE],
        duration: 450,
        delay: stagger(30, { from: "center" }),
        ease: "out(2)",
      });
    };
    section.addEventListener("pointermove", ripple);

    // Name letters spring up, then the meta column follows
    const { chars } = splitText(".hero-name", { chars: true });
    createTimeline({ defaults: { ease: "out(4)" } })
      .add(chars, {
        y: ["110%", "0%"],
        opacity: [0, 1],
        duration: 900,
        delay: stagger(28),
      })
      .add(
        ".hero-meta > *",
        { y: [24, 0], opacity: [0, 1], duration: 700, delay: stagger(90) },
        "-=500"
      )
      .add(
        ".callout",
        { opacity: [0, 1], duration: 600, delay: stagger(150) },
        "-=400"
      );

    // Nested squares badge — each ring spins at its own speed and direction
    animate(".badge-ring:nth-child(odd)", {
      rotate: 360,
      duration: stagger(6000, { start: 7000 }),
      loop: true,
      ease: "linear",
    });
    animate(".badge-ring:nth-child(even)", {
      rotate: -360,
      duration: stagger(6000, { start: 10000 }),
      loop: true,
      ease: "linear",
    });

    // Scroll cue draws down, over and over
    animate(svg.createDrawable(".cue"), {
      draw: ["0 0", "0 1", "1 1"],
      duration: 1800,
      loop: true,
      ease: "inOut(2)",
    });

    return () => section.removeEventListener("pointermove", ripple);
  });

  const socials = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <section
      ref={root}
      className="relative min-h-svh bg-background overflow-hidden flex flex-col"
      aria-labelledby="hero-name"
    >
      {/* Animated cell layer: a square that always covers the viewport */}
      <div
        className="cells absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid w-[max(100vw,100svh)] h-[max(100vw,100svh)] pointer-events-none"
        style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
        aria-hidden="true"
      >
        {CELLS.map((i) => (
          <span key={i} className="cell border border-border/40" />
        ))}
      </div>

      {/* Dark plate so the name and action always sit on near-black, whatever the grid is doing */}
      <div
        className="absolute inset-x-0 bottom-0 h-[62%] bg-[radial-gradient(ellipse_120%_90%_at_30%_100%,hsl(var(--background))_35%,transparent_75%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Dimension callouts (drafting-sheet grammar) */}
      <div
        className="callout absolute top-24 left-6 right-6 hidden md:flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-volt"
        aria-hidden="true"
      >
        <span className="w-px h-3 bg-volt" />
        <span className="flex-1 h-px bg-volt/60" />
        <span className="px-2">
          {callouts[0].value} {callouts[0].label}
        </span>
        <span className="flex-1 h-px bg-volt/60" />
        <span className="w-px h-3 bg-volt" />
      </div>
      <div
        className="callout absolute right-6 top-32 bottom-32 hidden lg:flex flex-col items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-volt"
        aria-hidden="true"
      >
        <span className="h-px w-3 bg-volt" />
        <span className="flex-1 w-px bg-volt/60" />
        <span className="py-2 [writing-mode:vertical-rl]">
          {callouts[1].value} {callouts[1].label}
        </span>
        <span className="flex-1 w-px bg-volt/60" />
        <span className="h-px w-3 bg-volt" />
      </div>

      {/* Rotating squares badge */}
      <div
        className="absolute top-28 md:top-36 right-6 lg:right-16 w-24 h-24 md:w-32 md:h-32 grid place-items-center"
        aria-hidden="true"
      >
        {[1, 0.78, 0.56, 0.34].map((s, i) => (
          <span
            key={s}
            className={`badge-ring absolute border ${i % 2 ? "border-volt" : "border-primary"}`}
            style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
          />
        ))}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 bg-background px-1">
          since 2020
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end w-full max-w-7xl mx-auto px-4 sm:px-6 pt-40 pb-20 md:pb-24">
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-end">
          <h1
            id="hero-name"
            className="hero-name font-bebas text-[clamp(3.5rem,13vw,7.5rem)] lg:text-[clamp(5rem,8.2vw,7.5rem)] leading-[0.86] tracking-wide text-foreground overflow-hidden"
          >
            <BrandName name={profile.name} />
          </h1>

          <div className="hero-meta flex flex-col gap-5 lg:pb-3">
            <p className="font-bebas text-3xl md:text-4xl tracking-wide text-foreground">
              {profile.title}
            </p>
            <p className="font-bebas text-xl tracking-[0.15em] text-primary">
              {profile.subtitle}
            </p>
            <p className="text-foreground/70 text-base md:text-lg leading-relaxed max-w-md">
              {profile.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center px-6 py-3 bg-volt text-volt-foreground font-bebas text-xl tracking-[0.15em] shadow-[6px_6px_0_0_hsl(var(--primary))] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_hsl(var(--primary))] transition-[transform,box-shadow] duration-150"
              >
                Start a conversation
              </a>
              <ul className="flex items-center gap-4">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="block p-2 border border-border text-foreground/60 hover:text-volt hover:border-volt transition-colors duration-200"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#story"
        className="absolute bottom-6 left-4 sm:left-6 flex items-center gap-3 text-foreground/50 hover:text-volt transition-colors"
        aria-label="Scroll to the story"
      >
        <svg width="2" height="48" viewBox="0 0 2 48" aria-hidden="true">
          <line
            className="cue"
            x1="1"
            y1="0"
            x2="1"
            y2="48"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
          Scroll
        </span>
        <ArrowDown size={14} aria-hidden />
      </a>
    </section>
  );
};

export default Hero;
