import { ImageResponse } from "next/og";
import { archivoFonts } from "./fonts/archivo";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: "AJ" on a highlighter tile with an ink rule. */
export default async function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F5E642",
        border: "3px solid #111111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Archivo Black",
        fontSize: 15,
        letterSpacing: -1,
        color: "#111111",
      }}
    >
      <span style={{ color: "#2B2BFF" }}>A</span>J
    </div>,
    { ...size, fonts: await archivoFonts() }
  );
}
