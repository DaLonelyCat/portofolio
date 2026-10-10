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
        page: "#090A10",        // Interstellar void background
        surface: "#11131E",     // Deep-space observatory surface
        surfaceHover: "#181B2B",// Elevated hover state
        rule: "#222638",        // Celestial hairline borders
        ink: "#F0F2F8",         // Crisp starlight primary text
        muted: "#949AB0",       // Cosmic dust secondary text
        accent: "#E07A5F",      // Solar flare / pulsar copper-amber
        accentHover: "#C9664D", // Accent hover state
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
