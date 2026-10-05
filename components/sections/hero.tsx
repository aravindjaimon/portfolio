import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { ImpactMetric, PersonalInfo } from "@/lib/data";
import { titleCase } from "@/utils/formatters";
import { Flank } from "./section-head";

interface HeroProps {
  profile: PersonalInfo;
  /** Two headline metrics weighed in the scale's pans: people (left), systems (right) */
  callouts: [ImpactMetric, ImpactMetric];
}

/** Each pan links to the section that backs its number. */
const PAN_TARGETS = ["#story", "#work"] as const;

const Hero = ({ profile, callouts }: HeroProps) => {
  const [first, ...rest] = titleCase(profile.name).split(" ");

  return (
    <section
      className="px-4 sm:px-8 pt-24 md:pt-28 pb-24 md:pb-36 text-center overflow-x-clip"
      aria-labelledby="hero-name"
    >
      <div className="max-w-6xl mx-auto">
        <Flank>{profile.title}</Flank>

        <h1
          id="hero-name"
          className="display mt-6 text-[clamp(3rem,12vw,6rem)] leading-[0.95] tracking-[-0.02em]"
        >
          {first} <i>{rest.join(" ")}</i>
        </h1>

        <p className="mt-6 mx-auto max-w-[44ch] text-lg md:text-xl leading-relaxed text-muted-foreground text-balance">
          {profile.tagline}
        </p>

        <figure className="scale mt-10">
          <div className="scale-beam" aria-hidden>
            <span className="scale-arch" />
            <span className="scale-opal" />
          </div>
          <ul className="scale-pans">
            {callouts.map((metric, i) => {
              const [from, to] = metric.value.split(" → ");
              return (
                <li key={metric.label} className="scale-pan">
                  <a href={PAN_TARGETS[i]}>
                    <span className="stat">
                      {to ? (
                        <>
                          {from}
                          <span aria-hidden> → </span>
                          <span className="sr-only"> to </span>
                          {to}
                        </>
                      ) : (
                        metric.value
                      )}
                    </span>
                    <span className="scale-dish" aria-hidden />
                    <span className="eyebrow inline-flex items-center gap-1.5 text-muted-foreground">
                      {metric.label}
                      <ArrowDown size={12} aria-hidden />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <figcaption className="scale-base eyebrow text-copper">
            Employee No. 001 ·{" "}
            {profile.subtitle.replace("First Engineer at ", "")}
          </figcaption>
        </figure>

        <a href={`mailto:${profile.email}`} className="btn btn-primary mt-10">
          Start a conversation <ArrowUpRight size={16} aria-hidden />
        </a>
      </div>
    </section>
  );
};

export default Hero;
