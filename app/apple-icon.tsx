import { ImageResponse } from "next/og";
import { archivoFonts } from "./fonts/archivo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the favicon tile at full size. */
export default async function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F5E642",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Archivo Black",
        fontSize: 84,
        letterSpacing: -4,
        color: "#111111",
      }}
    >
      <span style={{ color: "#2B2BFF" }}>A</span>J
    </div>,
    { ...size, fonts: await archivoFonts() }
  );
}
