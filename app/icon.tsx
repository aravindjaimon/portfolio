import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the literal code mark on the near-black brand ground. */
export default function Icon() {
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
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: -3.5,
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
