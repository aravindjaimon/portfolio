interface MarkProps {
  className?: string;
  title?: string;
}

/** Site monogram: rose A and air J weighed either side of a copper axis. Sized by the caller (≥22px). */
export function Mark({ className = "", title }: MarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-[0.18em] font-serif font-medium leading-none ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
    >
      <span className="text-primary">A</span>
      <span className="h-[0.9em] w-px bg-copper" />
      <span className="text-air">J</span>
    </span>
  );
}
