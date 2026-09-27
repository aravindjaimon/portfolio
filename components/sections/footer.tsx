import Link from "next/link";
import { Mark } from "@/components/chrome/mark";
import type { PersonalInfo } from "@/lib/data";

interface FooterProps {
  profile: PersonalInfo;
}

const Footer = ({ profile }: FooterProps) => {
  const year = new Date().getFullYear();
  const links = [
    { href: profile.github, label: "GitHub" },
    { href: profile.linkedin, label: "LinkedIn" },
    { href: profile.npm, label: "npm" },
    { href: "/feed.xml", label: "RSS" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-xs uppercase tracking-[0.15em]">
        <p className="flex items-center gap-3">
          <Link
            href="/"
            className="text-base font-bold normal-case tracking-[-0.08em] [&_.text-primary]:text-highlight"
          >
            <Mark title="Home" />
          </Link>
          <span>
            © {year} {profile.name} · {profile.location}
          </span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("/") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="hover:text-highlight underline-offset-4 hover:underline"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
