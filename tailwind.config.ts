import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#05060A",         // Deep space orbital void
        surface: "#0B0D16",      // Cyber alloy panel
        surfaceHover: "#121626", // Cyber elevated surface
        rule: "#1C2236",         // Structural telemetry border
        ink: "#FFFFFF",          // 100% pure crisp white headings
        muted: "#94A3B8",        // Cool cyber slate secondary text
        accent: "#00F0FF",       // Electric neon cyan
        accentHover: "#38BDF8",  // Bright cyan hover
        neonAmber: "#F59E0B",    // Warning amber telemetry
        neonViolet: "#A855F7",   // Deep cosmic violet
      },
      fontFamily: {
        sans: [
          "'IBM Plex Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
