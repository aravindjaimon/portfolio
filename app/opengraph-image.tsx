import { ImageResponse } from "next/og";
import { archivoFonts } from "./fonts/archivo";

export const alt = "Aravind Jaimon - Lead Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#111111";

/** Share card: a spec-sheet index card on paper. */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        padding: 56,
        background: "#F3F0E8",
        color: INK,
        fontFamily: "Archivo Black",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background: "#FFFFFF",
          border: `4px solid ${INK}`,
          boxShadow: `14px 14px 0 0 ${INK}`,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", fontSize: 56, letterSpacing: -4 }}>
          {"<"}
          <span style={{ color: "#2B2BFF" }}>A</span>J{"/>"}
        </div>
        <div
          style={{
            position: "absolute",
            top: 52,
            right: 56,
            display: "flex",
            padding: "10px 18px",
            background: "#F5E642",
            border: `4px solid ${INK}`,
            fontSize: 26,
            transform: "rotate(-3deg)",
          }}
        >
          EMPLOYEE #001
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 118,
              lineHeight: 0.9,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            Aravind Jaimon
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 28 }}>
            <div
              style={{
                display: "flex",
                padding: "10px 20px",
                background: "#2B2BFF",
                color: "#FFFFFF",
                border: `4px solid ${INK}`,
                fontSize: 28,
                whiteSpace: "nowrap",
              }}
            >
              LEAD SOFTWARE ENGINEER
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: 24,
                fontSize: 28,
                whiteSpace: "nowrap",
              }}
            >
              1 → 30+ · 1M+ USERS
            </div>
          </div>
        </div>
      </div>
    </div>,
    { ...size, fonts: await archivoFonts() }
  );
}
