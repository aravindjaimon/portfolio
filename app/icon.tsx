import { ImageResponse } from "next/og";
import { MARK_PATTERNS, isOn } from "@/components/chrome/mark-patterns";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const CELLS = Array.from({ length: 25 }, (_, i) => i);

/** Favicon: the pixel-grid monogram in its A state, red on near-black */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0A0A0A",
        display: "flex",
        flexWrap: "wrap",
        padding: 4,
        gap: 1,
      }}
    >
      {CELLS.map((i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: 4,
            background: isOn(MARK_PATTERNS.a, i) ? "#C41E3A" : "#1F1F1F",
          }}
        />
      ))}
    </div>,
    { ...size }
  );
}
