import Link from "next/link";
import { Mark } from "@/components/chrome/mark";
import type { PersonalInfo } from "@/lib/data";
import { titleCase } from "@/utils/formatters";

interface FooterProps {
  profile: PersonalInfo;
}

const Footer = ({ profile }: FooterProps) => {
  const year = new Date().getFullYear();
  // 2 | AJ | 2 on the page axis
  const left = [
    { href: profile.github, label: "GitHub" },
    { href: profile.linkedin, label: "LinkedIn" },
  ];
  const right = [
    { href: profile.npm, label: "npm" },
    { href: "/feed.xml", label: "RSS" },
  ];

  const renderLinks = (links: typeof left, align: string) => (
    <ul className={`eyebrow flex justify-center gap-6 ${align}`}>
      {links.map(({ href, label }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("/") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="border-t-[3px] border-double border-foreground px-4 sm:px-8 py-12">
      <div className="max-w-6xl mx-auto grid gap-8 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <Link
          href="/"
          className="text-[1.5rem] justify-self-center sm:col-start-2 sm:row-start-1"
        >
          <Mark title="Home" />
        </Link>
        {renderLinks(left, "sm:col-start-1 sm:row-start-1 sm:justify-self-end")}
        {renderLinks(
          right,
          "sm:col-start-3 sm:row-start-1 sm:justify-self-start"
        )}
      </div>
      <div className="max-w-6xl mx-auto mt-10 space-y-2 text-center eyebrow text-muted-foreground text-balance">
        <p>
          © {year} {titleCase(profile.name)} · {profile.location}
        </p>
        <p>Set in Bodoni Moda, Jost &amp; JetBrains Mono</p>
      </div>
    </footer>
  );
};

export default Footer;
