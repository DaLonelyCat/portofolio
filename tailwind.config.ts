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
        background: "#080a11",
        cyber: {
          void: "#080a11",
          dark: "#0d111a",
          surface: "#111622",
          surfaceElevated: "#161d2d",
          cyan: "#38bdf8",
          cyanHover: "#0ea5e9",
          magenta: "#f43f5e",
          magentaHover: "#e11d48",
          yellow: "#f59e0b",
          yellowHover: "#fbbf24",
          yellowMuted: "#d97706",
          green: "#10b981",
          muted: "#94a3b8",
          dim: "#475569",
          border: "rgba(56, 189, 248, 0.2)",
          borderMagenta: "rgba(244, 63, 94, 0.25)",
          borderYellow: "rgba(245, 158, 11, 0.28)",
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
        "neon-cyan": "0 4px 20px -2px rgba(56, 189, 248, 0.25)",
        "neon-cyan-sm": "0 2px 10px -1px rgba(56, 189, 248, 0.2)",
        "neon-magenta": "0 4px 20px -2px rgba(244, 63, 94, 0.25)",
        "neon-magenta-sm": "0 2px 10px -1px rgba(244, 63, 94, 0.2)",
        "neon-yellow": "0 4px 20px -2px rgba(245, 158, 11, 0.25)",
        "neon-yellow-sm": "0 2px 10px -1px rgba(245, 158, 11, 0.2)",
        "cyber-card": "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
