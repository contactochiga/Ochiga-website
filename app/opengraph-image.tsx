import { ImageResponse } from "next/og";
import { seoConfig } from "@/lib/seo";

export const runtime = "edge";
export const alt = "Ochiga — Development. Technology. Private Capital.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 22% 18%, rgba(179, 36, 27, 0.34), transparent 28%), radial-gradient(circle at 80% 18%, rgba(246,243,236,0.10), transparent 20%), linear-gradient(135deg, #050505 0%, #141414 60%, #050505 100%)",
          color: "white",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 24, zIndex: 1 }}>
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: 24,
              background: "linear-gradient(135deg, #ff7a18, #ffd2a4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#08090d",
              fontSize: 42,
              fontWeight: 800,
            }}
          >
            O
          </div>
          <div style={{ fontSize: 34, letterSpacing: 2, color: "rgba(255,255,255,0.74)" }}>
            {seoConfig.siteName.toUpperCase()}
          </div>
        </div>
        <div style={{ zIndex: 1, maxWidth: 920 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 800, letterSpacing: -3 }}>
            We Build Intelligent Places.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, color: "rgba(255,255,255,0.72)" }}>
            Development. Technology. Private Capital.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
