import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Bodoni Moda SemiBold (static opsz 28) for `ImageResponse` routes (satori cannot use next/font). OFL, vendored. */
export async function ogFonts() {
  const data = await readFile(
    join(process.cwd(), "app/fonts/BodoniModa-SemiBold.ttf")
  );
  return [
    {
      name: "Bodoni Moda",
      data,
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}
