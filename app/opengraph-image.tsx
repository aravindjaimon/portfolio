import { ImageResponse } from "next/og";
import { bebasFonts } from "./fonts/bebas";

export const alt = "Aravind Jaimon - Lead Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card: the literal code mark top-left, the name bottom-left. */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "#0A0A0A",
        color: "#FAFAFA",
        fontFamily: "Bebas Neue",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -10,
          lineHeight: 1,
        }}
      >
        <span style={{ color: "#FAFAFA" }}>{"<"}</span>
        <span style={{ color: "#C41E3A" }}>A</span>
        <span style={{ color: "#CCFF00" }}>J</span>
        <span style={{ color: "#FAFAFA" }}>{"/>"}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{ fontSize: 132, lineHeight: 0.86, letterSpacing: "0.025em" }}
        >
          Aravind Jaimon
        </div>
        <div
          style={{
            fontSize: 44,
            letterSpacing: "0.15em",
            color: "rgba(250,250,250,0.7)",
          }}
        >
          Lead Software Engineer
        </div>
      </div>
    </div>,
    { ...size, fonts: await bebasFonts() }
  );
}
