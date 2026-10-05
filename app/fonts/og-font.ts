import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Archivo Black for `ImageResponse` routes (satori cannot use next/font). OFL, vendored. */
export async function archivoFonts() {
  const data = await readFile(
    join(process.cwd(), "app/fonts/ArchivoBlack-Regular.ttf")
  );
  return [
    {
      name: "Archivo Black",
      data,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}
