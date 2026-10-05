import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: a split disc, rose | air either side of a porcelain axis. Font-free. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#FAF6F1",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32">
        <path d="M15 3a13 13 0 0 0 0 26z" fill="#A3324F" />
        <path d="M17 3a13 13 0 0 1 0 26z" fill="#306083" />
      </svg>
    </div>,
    size
  );
}
