import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 42,
          background:
            "radial-gradient(circle at 28% 22%, rgba(246,243,236,0.35), transparent 18%), linear-gradient(135deg, #b3241b, #050505 74%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 92,
          fontWeight: 900,
          fontFamily: "Arial, sans-serif",
        }}
      >
        O
      </div>
    ),
    size,
  );
}
