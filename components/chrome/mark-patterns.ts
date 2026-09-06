/** 10×5 pixel "AJ" lockup — the hero's grid at glyph scale. Plain data, safe for image routes. */
export const MARK = {
  cols: 10,
  rows: 5,
  cells:
    ".XXX..XXXX" + "X...X...X." + "XXXXX...X." + "X...X.X.X." + "X...X..XX.",
} as const;

if (MARK.cells.length !== MARK.cols * MARK.rows) {
  throw new Error("MARK.cells must be cols × rows characters");
}

export const isOn = (i: number) => MARK.cells[i] === "X";
