/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ------------------------------------------------------------
      // OCHIGA DESIGN TOKENS
      // Architectural cinema: black / charcoal / warm white, with a
      // single controlled accent (Ochiga Red). See DESIGN_SYSTEM.md.
      // ------------------------------------------------------------
      colors: {
        ochiga: {
          black: "#050505",
          charcoal: "#141414",
          graphite: "#232323",
          grey: {
            100: "#f5f4f2",
            300: "#d8d5cf",
            500: "#8c887f",
            700: "#57534a",
          },
          warmwhite: "#f6f3ec",
          white: "#ffffff",
          red: {
            DEFAULT: "#b3241b",
            muted: "#8a1e17",
            bright: "#d3372c",
          },
        },
      },
      fontFamily: {
        display: [
          "Georgia",
          "Iowan Old Style",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "720px",
        wide: "1200px",
        cinematic: "1600px",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "10px",
      },
      transitionDuration: {
        fast: "180ms",
        base: "320ms",
        slow: "600ms",
        cinematic: "1200ms",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      letterSpacing: {
        eyebrow: "0.16em",
      },
    },
  },
  plugins: [],
};
