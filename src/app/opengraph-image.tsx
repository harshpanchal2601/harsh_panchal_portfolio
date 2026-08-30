import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f0e0c",
          padding: "64px 80px",
          color: "#eee4d7",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(circle at 75% 35%, rgba(185, 97, 67, 0.18) 0%, transparent 50%), linear-gradient(135deg, #0f0e0c 0%, #15110e 100%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#d68a68",
              fontWeight: 600,
            }}
          >
            01 / Portfolio V2
          </div>
          <div
            style={{
              fontSize: "16px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(238, 228, 215, 0.6)",
            }}
          >
            harshpanchal2601.netlify.app
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "#f3e4d0",
            }}
          >
            HARSH PANCHAL
          </div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "#d68a68",
              textTransform: "uppercase",
            }}
          >
            Full-Stack Developer & Software Engineer
          </div>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.12em",
              color: "rgba(238, 228, 215, 0.72)",
              textTransform: "uppercase",
              marginTop: "8px",
            }}
          >
            Next.js / React / Node.js / AWS / AI Integration
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(238, 228, 215, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(238, 228, 215, 0.8)",
            }}
          >
            Idea → Product → Production
          </div>
          <div
            style={{
              fontSize: "15px",
              letterSpacing: "0.12em",
              color: "#d68a68",
              fontWeight: 600,
            }}
          >
            Explore Selected Work ↗
          </div>
        </div>
      </div>
    ),
    size,
  );
}
