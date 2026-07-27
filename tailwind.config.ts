import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F6F4",
        ink: "#10151A",
        panel: "#10222B",
        heat: "#FF6B35",
        cool: "#1E88A8",
        steel: "#C7CDD1",
        "hightlight-light": "#DADBF8",
        "accent-light": "#D9EAE3",
        "primary-light": "#FFCFE1",
        "secondary-light": "#FFFCE5",
        primary: "#FF0F67",
        secondary: "#FFF07C",
        accent: "#439775",
        neutral: "#222222",
        "base-100": "#f0f0f0",
        "base-200": "#ffffff",
        "base-300": "#F2F2F2",
        "base-content": "#0A0A0A",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
        highlight: "#454ADE",
        muted: "#777777",
      },
      fontFamily: {
        display: ["'Gilroy'", "'Helvetica Neue'", "Arial", "sans-serif"],
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Barlow'", "sans-serif"],
        kanit: ["'Kanit'", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
