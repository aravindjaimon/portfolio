interface MarkProps {
  className?: string;
  title?: string;
}

/** The site mark stays deliberately simple: literal code in the site's mono typeface. */
export function Mark({ className, title }: MarkProps) {
  return (
    <span
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
    >
      <span className="text-foreground">{"<"}</span>
      <span className="text-primary">A</span>
      <span className="text-volt">J</span>
      <span className="text-foreground">{"/>"}</span>
    </span>
  );
}
