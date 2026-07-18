import { ImageResponse } from "next/og";

export const alt = "Ravishankar R — Markets aren't found. They're made.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a1628",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#f59e0b",
            marginBottom: 32,
          }}
        >
          Ravishankar R · Marketing &amp; Growth
        </div>
        <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 1.05 }}>
          Markets aren&apos;t found.
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#5b8db8",
          }}
        >
          They&apos;re made.
        </div>
        <div style={{ fontSize: 30, color: "#9fb3c8", marginTop: 40 }}>
          28 years building markets across India, Africa, Europe and the Middle East
        </div>
      </div>
    ),
    { ...size }
  );
}
