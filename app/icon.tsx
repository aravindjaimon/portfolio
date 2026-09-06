import { ImageResponse } from "next/og";
import { MARK, isOn } from "@/components/chrome/mark-patterns";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const CELL = 2;
const GAP = 1;
const CELLS = Array.from({ length: MARK.cols * MARK.rows }, (_, i) => i);

/** Favicon: the pixel-grid "AJ" lockup, red on near-black */
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
