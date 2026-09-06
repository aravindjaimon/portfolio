import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the literal code mark on the near-black brand ground. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: 54,
          fontWeight: 700,
          letterSpacing: -7,
          lineHeight: 1,
        }}
      >
        <span style={{ color: "#FAFAFA" }}>{"<"}</span>
        <span style={{ color: "#C41E3A" }}>A</span>
        <span style={{ color: "#CCFF00" }}>J</span>
        <span style={{ color: "#FAFAFA" }}>{"/>"}</span>
      </div>
    </div>,
    { ...size }
  );
}
