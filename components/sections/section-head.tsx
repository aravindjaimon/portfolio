interface FlankProps {
  children: React.ReactNode;
  className?: string;
}

/** Centred copper eyebrow held between two equal hairlines. */
export function Flank({ children, className = "" }: FlankProps) {
  return (
    <p
      className={`eyebrow flex items-center justify-center gap-4 text-copper ${className}`}
    >
      <span className="h-px w-6 sm:w-12 bg-copper" aria-hidden />
      {children}
      <span className="h-px w-6 sm:w-12 bg-copper" aria-hidden />
    </p>
  );
}

interface SectionHeadProps {
  id: string;
  index: string;
  title: React.ReactNode;
  intro?: string;
}

/** Centred section header on the page axis: flanked index, Didone title, balanced intro. */
export default function SectionHead({
  id,
  index,
  title,
  intro,
}: SectionHeadProps) {
  return (
    <header className="mb-14 md:mb-20 text-center">
      <Flank>No. {index}</Flank>
      <h2 id={id} className="display mt-6 text-[clamp(2.25rem,6vw,4.5rem)]">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 mx-auto max-w-[52ch] text-lg text-muted-foreground leading-relaxed text-balance">
          {intro}
        </p>
      )}
    </header>
  );
}
