/**
 * Brutalist glyphs for the six case studies, one per `glyph` key in content/projects/*.mdx.
 * Each entry is a closed polygon path in a 0 0 100 100 box; `alt` is the shape it morphs
 * into on hover (anime.js `svg.morphTo` resamples, so vertex counts need not match).
 */
export type GlyphName =
  | "ledger"
  | "brain"
  | "terminal"
  | "cube"
  | "joystick"
  | "book";

export const PROJECT_GLYPHS: Record<GlyphName, { d: string; alt: string }> = {
  // stacked ledger bars → rising staircase
  ledger: {
    d: "M10 20 H90 V32 H10 Z M10 44 H90 V56 H10 Z M10 68 H90 V80 H10 Z",
    alt: "M10 80 H30 V60 H50 V40 H70 V20 H90 V80 Z",
  },
  // hexagonal node → octagon
  brain: {
    d: "M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z",
    alt: "M35 8 H65 L92 35 V65 L65 92 H35 L8 65 V35 Z",
  },
  // terminal window with prompt notch → diamond
  terminal: {
    d: "M8 16 H92 V84 H8 Z M20 40 L34 50 L20 60 V54 L28 50 L20 46 Z",
    alt: "M50 8 L92 50 L50 92 L8 50 Z",
  },
  // isometric cube → three stacked squares
  cube: {
    d: "M50 8 L88 30 V70 L50 92 L12 70 V30 Z M50 30 L88 30 M50 30 L12 30 M50 30 V92",
    alt: "M20 8 H80 V32 H20 Z M20 38 H80 V62 H20 Z M20 68 H80 V92 H20 Z",
  },
  // d-pad cross → circle-ish octagon
  joystick: {
    d: "M38 8 H62 V38 H92 V62 H62 V92 H38 V62 H8 V38 H38 Z",
    alt: "M50 8 L80 20 L92 50 L80 80 L50 92 L20 80 L8 50 L20 20 Z",
  },
  // open book → square
  book: {
    d: "M8 20 L50 30 L92 20 V80 L50 90 L8 80 Z M50 30 V90",
    alt: "M12 12 H88 V88 H12 Z",
  },
};

interface ProjectGlyphProps {
  name: GlyphName;
  className?: string;
  /** Rendered on the morph target `<path>` so a parent scope can select it */
  pathClassName?: string;
}

/** Static glyph; the projects section animates the inner path with `svg.morphTo`. */
export function ProjectGlyph({
  name,
  className,
  pathClassName,
}: ProjectGlyphProps) {
  const glyph = PROJECT_GLYPHS[name];
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path className="glyph-alt" d={glyph.alt} />
        <path className="glyph-base" d={glyph.d} />
      </defs>
      <path
        className={pathClassName}
        d={glyph.d}
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
