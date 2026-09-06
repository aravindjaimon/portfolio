import { ImageResponse } from "next/og";
import { MARK, isOn } from "@/components/chrome/mark-patterns";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const CELL = 15;
const GAP = 3;
const CELLS = Array.from({ length: MARK.cols * MARK.rows }, (_, i) => i);

/** Home-screen icon: the pixel-grid "AJ" lockup */
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
          flexWrap: "wrap",
          width: MARK.cols * CELL + (MARK.cols - 1) * GAP,
          gap: GAP,
        }}
      >
        {CELLS.map((i) => (
          <div
            key={i}
            style={{
              width: CELL,
              height: CELL,
              background: isOn(i) ? "#C41E3A" : "#1F1F1F",
            }}
          />
        ))}
      </div>
    </div>,
    { ...size }
  );
}
