/** 5×5 pixel monogram states — the hero's grid at glyph scale. Plain data, safe for image routes. */
export const MARK_PATTERNS = {
  a: ".XXX.X...XXXXXXX...XX...X",
  j: "XXXXX...X....X.X..X..XX..",
  grid: "XXXXXXXXXXXXXXXXXXXXXXXXX",
} as const;

export const isOn = (pattern: string, i: number) => pattern[i] === "X";
