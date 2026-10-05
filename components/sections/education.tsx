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
      className="px-4 sm:px-8 py-24 md:py-36"
      aria-labelledby="education-title"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHead id="education-title" index="05" title="On record" />

        {/* Three equal ledger columns; the middle one sits on the page axis */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {columns.map((col) => (
            <div
              key={col.title}
              className="min-w-0 border-t-[3px] border-double border-foreground text-center"
            >
              <h3 className="eyebrow py-4 text-copper">{col.title}</h3>
              <ul className="divide-y">
                {col.rows.map((row) => (
                  <li key={row.head} className="py-5 break-words">
                    <p className="font-semibold leading-snug">{row.head}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {row.sub}
                    </p>
                    {row.foot && (
                      <p className="mt-2 eyebrow text-muted-foreground">
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
