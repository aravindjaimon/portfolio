import { ImageResponse } from "next/og";
import { impactMetrics, personalInfo } from "@/lib/data";
import { titleCase } from "@/utils/formatters";
import { ogFonts } from "./fonts/og-font";

export const alt = "Aravind Jaimon - Lead Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#231C27";
const MUTED = "#5F5562";
const COPPER = "#94562F";
const LINE = `2px solid ${COPPER}`;

/** Share card: the hero's level scale on porcelain inside a hairline frame. */
export default async function Image() {
  const name = titleCase(personalInfo.name);
  const company = personalInfo.subtitle.replace("First Engineer at ", "");

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "#FAF6F1",
        color: INK,
        fontFamily: "Bodoni Moda",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
          border: "1px solid #E3D9D2",
        }}
      />

      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 5,
          color: COPPER,
        }}
      >
        {`${personalInfo.title} · ${personalInfo.location}`.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 12,
          fontSize: 104,
          lineHeight: 1,
          letterSpacing: -2,
        }}
      >
        {name}
      </div>

      {/* The scale: beam spans pan centre to pan centre; arch + opal at the pivot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: 640,
          marginTop: 28,
          paddingTop: 24,
        }}
      >
        <div
          style={{ display: "flex", width: 320, height: 2, background: COPPER }}
        />
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 640,
            paddingBottom: 16,
          }}
        >
          {/* Pillar: pivot to base */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 319,
              width: 2,
              background: COPPER,
            }}
          />
          {impactMetrics.slice(0, 2).map((metric) => {
            const [from, to] = metric.value.split(" → ");
            return (
              <div
                key={metric.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 320,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 2,
                    height: 40,
                    background: COPPER,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 60,
                    lineHeight: 1.1,
                  }}
                >
                  {from}
                  {to && (
                    <svg width="44" height="20" style={{ margin: "0 14px" }}>
                      <path
                        d="M2 10h34M28 3l8 7-8 7"
                        stroke={INK}
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  )}
                  {to}
                </div>
                <div
                  style={{
                    display: "flex",
                    width: 180,
                    height: 12,
                    borderLeft: LINE,
                    borderRight: LINE,
                    borderBottom: LINE,
                    borderRadius: "0 0 90px 90px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    marginTop: 10,
                    fontSize: 22,
                    letterSpacing: 4,
                    color: MUTED,
                  }}
                >
                  {metric.label.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
        {/* Base line */}
        <div
          style={{ display: "flex", width: 140, height: 2, background: COPPER }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 296,
            width: 48,
            height: 24,
            borderTop: LINE,
            borderLeft: LINE,
            borderRight: LINE,
            borderRadius: "24px 24px 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 313,
            width: 14,
            height: 14,
            borderRadius: 7,
            background: "#F4DFE2",
            border: LINE,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 16,
          fontSize: 22,
          letterSpacing: 4,
          color: COPPER,
        }}
      >
        {`Employee No. 001 · ${company}`.toUpperCase()}
      </div>
    </div>,
    { ...size, fonts: await ogFonts() }
  );
}
