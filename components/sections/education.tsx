import SectionHead from "./section-head";
import type { Achievement, Education as Degree } from "@/lib/data";

interface EducationProps {
  education: Degree[];
  certifications: string[];
  achievements: Achievement[];
}

const Education = ({
  education,
  certifications,
  achievements,
}: EducationProps) => {
  const columns: Array<{
    title: string;
    rows: Array<{ head: string; sub: string; foot?: string }>;
  }> = [
    {
      title: "Education",
      rows: education.map((e) => ({
        head: e.degree,
        sub: e.institution,
        foot: e.expected
          ? `${e.status} · expected ${e.expected}`
          : `${e.status} · ${e.year}`,
      })),
    },
    {
      title: "Certifications",
      rows: certifications.map((c) => ({ head: c, sub: "Google Cloud" })),
    },
    {
      title: "Recognition",
      rows: achievements.map((a) => ({
        head: a.title,
        sub: a.description,
        foot: a.detail,
      })),
    },
  ];

  return (
    <section
      className="px-4 sm:px-6 py-20 md:py-28"
      aria-labelledby="education-title"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHead id="education-title" index="05" title="On record" />

        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((col, ci) => (
            <div
              key={col.title}
              className={`card ${ci === 2 ? "bg-highlight" : ""}`}
            >
              <h3 className="px-5 py-3 border-b-2 font-mono text-xs uppercase tracking-[0.2em]">
                {col.title}
              </h3>
              <ul>
                {col.rows.map((row) => (
                  <li
                    key={row.head}
                    className="px-5 py-4 border-b-2 last:border-b-0"
                  >
                    <p className="font-bold leading-snug">{row.head}</p>
                    <p className="mt-1 text-sm opacity-75">{row.sub}</p>
                    {row.foot && (
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em]">
                        {row.foot}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
