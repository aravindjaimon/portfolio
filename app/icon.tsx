import { ImageResponse } from "next/og";
import {
  ARCH_PATH,
  KEYSTONE_PATH,
  MARK_VIEWBOX,
  RED,
  VOLT,
} from "@/components/chrome/mark-geometry";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the keystone "AJ" on the near-black ground. The mark is square, so it fills. */
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
      <svg viewBox={MARK_VIEWBOX} width={32} height={32}>
        <path d={ARCH_PATH} fill={RED} />
        <path d={KEYSTONE_PATH} fill={VOLT} />
      </svg>
    </div>,
    { ...size }
  );
}
