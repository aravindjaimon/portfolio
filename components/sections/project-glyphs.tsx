/**
 * Brutalist glyphs for the six case studies, one per `glyph` key in content/projects/*.mdx.
 * Each entry is a path in a 0 0 100 100 box.
 */
export type GlyphName =
  | "ledger"
  | "brain"
  | "terminal"
  | "cube"
  | "joystick"
  | "book";

export const PROJECT_GLYPHS: Record<GlyphName, string> = {
  // stacked ledger bars
  ledger: "M10 20 H90 V32 H10 Z M10 44 H90 V56 H10 Z M10 68 H90 V80 H10 Z",
  // hexagonal node
  brain: "M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z",
  // terminal window with prompt notch
  terminal: "M8 16 H92 V84 H8 Z M20 40 L34 50 L20 60 V54 L28 50 L20 46 Z",
  // isometric cube
  cube: "M50 8 L88 30 V70 L50 92 L12 70 V30 Z M50 30 L88 30 M50 30 L12 30 M50 30 V92",
  // d-pad cross
  joystick: "M38 8 H62 V38 H92 V62 H62 V92 H38 V62 H8 V38 H38 Z",
  // open book
  book: "M8 20 L50 30 L92 20 V80 L50 90 L8 80 Z M50 30 V90",
};

interface ProjectGlyphProps {
  name: GlyphName;
  className?: string;
}

export function ProjectGlyph({ name, className }: ProjectGlyphProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={PROJECT_GLYPHS[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
