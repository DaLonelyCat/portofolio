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
        background: "#030308",
        cyber: {
          void: "#030308",
          dark: "#080911",
          surface: "#0d0f1a",
          surfaceElevated: "#131625",
          cyan: "#00f0ff",
          cyanHover: "#00d4e3",
          magenta: "#ff0055",
          magentaHover: "#e6004c",
          yellow: "#ffe600",
          yellowHover: "#ffd600",
          yellowMuted: "#b2a100",
          green: "#00ff9f",
          muted: "#94a3b8",
          dim: "#475569",
          border: "rgba(0, 240, 255, 0.2)",
          borderMagenta: "rgba(255, 0, 85, 0.3)",
          borderYellow: "rgba(255, 230, 0, 0.35)",
        },
      },
      fontFamily: {
        sans: [
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
      boxShadow: {
        "neon-cyan": "0 0 20px -3px rgba(0, 240, 255, 0.45), 0 0 8px 0px rgba(0, 240, 255, 0.3)",
        "neon-cyan-sm": "0 0 10px -2px rgba(0, 240, 255, 0.4)",
        "neon-magenta": "0 0 20px -3px rgba(255, 0, 85, 0.5), 0 0 8px 0px rgba(255, 0, 85, 0.35)",
        "neon-magenta-sm": "0 0 10px -2px rgba(255, 0, 85, 0.4)",
        "neon-yellow": "0 0 20px -3px rgba(255, 230, 0, 0.55), 0 0 8px 0px rgba(255, 230, 0, 0.4)",
        "neon-yellow-sm": "0 0 10px -2px rgba(255, 230, 0, 0.45)",
        "cyber-card": "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
