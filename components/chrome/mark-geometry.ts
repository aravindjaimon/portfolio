/** Keystone "AJ" mark geometry. Plain data, shared by the client mark and the image routes. */

export const MARK_VIEWBOX = "0 0 48 48";

/**
 * The A, in brand red: two splayed legs joined only at the flat apex, so the counter
 * is open at the foot. The right leg runs on past the baseline (y 33), turns left and
 * ticks back up to the baseline — that is the J, nested into the A's open bottom.
 * Inner edges are perpendicular offsets of the outer edges, so the leg keeps one weight.
 * Three subpaths: A contour, J descender + hook, J terminal tick.
 */
export const ARCH_PATH =
  "M20.5 3 L27.5 3 L46 33 L35.43 33 L25.2 16.42 L22.8 16.42 L12.57 33 L2 33 Z " +
  "M35.43 33 L46 33 L46 45 L19 45 L19 38.5 L35.43 38.5 Z " +
  "M19 33 L25.5 33 L25.5 38.5 L19 38.5 Z";

/**
 * The keystone, in volt: the crossbar driven through the A at the springing line.
 * Its ends are cut along the leg diagonals so the band sits flush inside the silhouette.
 * It is the piece that ties the two legs — remove it and the A is no longer an A.
 */
export const KEYSTONE_PATH = "M9.4 21 L38.6 21 L42.61 27.5 L5.39 27.5 Z";

export const RED = "#C41E3A";
export const VOLT = "#CCFF00";
