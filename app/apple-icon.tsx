import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the favicon disc, padded for the iOS mask on a porcelain tile. Font-free. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#FAF6F1",
      }}
    >
      <svg width="180" height="180" viewBox="-5 -5 42 42">
        <path d="M15 3a13 13 0 0 0 0 26z" fill="#A3324F" />
        <path d="M17 3a13 13 0 0 1 0 26z" fill="#306083" />
      </svg>
    </div>,
    size
  );
}
