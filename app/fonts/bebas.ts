import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Bebas Neue for `ImageResponse` routes (satori cannot use next/font). OFL, vendored. */
export async function bebasFonts() {
  const data = await readFile(
    join(process.cwd(), "app/fonts/BebasNeue-Regular.ttf")
  );
  return [
    { name: "Bebas Neue", data, weight: 400 as const, style: "normal" as const },
  ];
}
