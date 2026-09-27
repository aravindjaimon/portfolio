import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ImpactMetric, PersonalInfo } from "@/lib/data";

interface HeroProps {
  profile: PersonalInfo;
  /** Two headline metrics shown as stat cards */
  callouts: [ImpactMetric, ImpactMetric];
}

const Hero = ({ profile, callouts }: HeroProps) => {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section
      className="px-4 sm:px-6 pt-32 md:pt-40 pb-20 md:pb-28"
      aria-labelledby="hero-name"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="chip bg-card">{profile.title}</span>
          <span className="chip bg-card">{profile.location}</span>
        </div>

        <h1
          id="hero-name"
          className="display text-[clamp(3rem,16vw,13rem)] break-words"
        >
          {first}
          <br />
          <span className="relative inline-block">
            {rest.join(" ")}
            <span
              className="absolute -right-2 -bottom-1 w-[0.18em] h-[0.18em] translate-x-full bg-primary border-2"
              aria-hidden
            />
          </span>
        </h1>

        <div className="mt-14 md:mt-20 grid gap-10 lg:grid-cols-12 items-end">
          <div className="lg:col-span-6">
            <p className="text-2xl md:text-3xl font-bold leading-snug tracking-tight">
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="btn press bg-primary text-primary-foreground"
              >
                Start a conversation <ArrowUpRight size={18} aria-hidden />
              </a>
              <a href="#work" className="btn press bg-card">
                See the work <ArrowDownRight size={18} aria-hidden />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 relative">
            <p className="sticker absolute -top-5 right-4 z-10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
              Employee #001 ·{" "}
              {profile.subtitle.replace("First Engineer at ", "")}
            </p>
            <dl className="grid grid-cols-2">
              {callouts.map((metric, i) => (
                <div
                  key={metric.label}
                  className={`card flex flex-col-reverse p-4 sm:p-6 ${i ? "-ml-[2px]" : "bg-highlight"}`}
                >
                  <dt className="mt-3 font-mono text-xs uppercase tracking-[0.15em]">
                    {metric.label}
                  </dt>
                  <dd className="display normal-case text-2xl sm:text-4xl whitespace-nowrap tabular-nums">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
