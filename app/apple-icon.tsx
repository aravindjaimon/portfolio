import { ImageResponse } from "next/og";
import { MARK_PATTERNS, isOn } from "@/components/chrome/mark-patterns";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const CELLS = Array.from({ length: 25 }, (_, i) => i);

/** Home-screen icon: the pixel-grid monogram in its A state */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0A0A0A",
        display: "flex",
        flexWrap: "wrap",
        padding: 30,
        gap: 4,
      }}
    >
      {CELLS.map((i) => (
        <div
          key={i}
          style={{
            width: 20,
            height: 20,
            background: isOn(MARK_PATTERNS.a, i) ? "#C41E3A" : "#1F1F1F",
          }}
        />
      ))}
    </div>,
    { ...size }
  );
}
