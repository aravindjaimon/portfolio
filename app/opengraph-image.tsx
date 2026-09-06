import { ImageResponse } from "next/og";
import { bebasFonts } from "./fonts/bebas";
import {
  ARCH_PATH,
  KEYSTONE_PATH,
  MARK_VIEWBOX,
  RED,
  VOLT,
} from "@/components/chrome/mark-geometry";

export const alt = "Aravind Jaimon - Lead Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card: the keystone "AJ" mark top-left, the name bottom-left, on the near-black ground */
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
      <svg viewBox={MARK_VIEWBOX} width={150} height={150}>
        <path d={ARCH_PATH} fill={RED} />
        <path d={KEYSTONE_PATH} fill={VOLT} />
      </svg>
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
