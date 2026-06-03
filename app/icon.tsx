import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
          background: "linear-gradient(135deg, #ff7a18, #ffd2a4)",
          color: "#05070c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
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
