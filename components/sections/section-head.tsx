interface SectionHeadProps {
  id: string;
  index: string;
  title: React.ReactNode;
  intro?: string;
}

/** Spec-sheet section header: mono index, expanded title, ink rule. */
export default function SectionHead({
  id,
  index,
  title,
  intro,
}: SectionHeadProps) {
  return (
    <header className="mb-12 md:mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs tracking-[0.2em]">{index} /</span>
        <span className="flex-1 h-[2px] bg-foreground" aria-hidden />
      </div>
      <h2 id={id} className="display text-[clamp(2.5rem,7vw,5.5rem)]">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {intro}
        </p>
      )}
    </header>
  );
}
