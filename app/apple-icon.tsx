import { ImageResponse } from "next/og";
import {
  ARCH_PATH,
  KEYSTONE_PATH,
  MARK_VIEWBOX,
  RED,
  VOLT,
} from "@/components/chrome/mark-geometry";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the keystone "AJ" on the near-black ground */
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
      <svg viewBox={MARK_VIEWBOX} width={148} height={148}>
        <path d={ARCH_PATH} fill={RED} />
        <path d={KEYSTONE_PATH} fill={VOLT} />
      </svg>
    </div>,
    { ...size }
  );
}
