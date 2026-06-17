import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // GUARD brand palette — olive + gold
        navy: {
          DEFAULT: "#b5b557", // light olive (primary surface)
          dark: "#9c9c39",   // deeper olive (gradients / depth)
        },
        ink: {
          DEFAULT: "#23290b", // near-black olive — text on light surfaces
          light: "#3a4a10",
        },
        gold: {
          DEFAULT: "#C9A84C", // shield gold (accent)
          light: "#DBC078",
          dark: "#A98A38",
        },
        olive: {
          DEFAULT: "#6a760c", // main olive
          dark: "#4a5208",
          light: "#8a9a1a",
        },
        danger: "#E63030",
        light: "#F4F5EE", // slightly warm light bg
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "Helvetica", "sans-serif"],
        heading: ["var(--font-heading)", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #9c9c39 0%, #b5b557 100%)",
        "navy-gradient-r": "linear-gradient(90deg, #9c9c39 0%, #b5b557 100%)",
      },
      boxShadow: {
        card: "0 4px 24px -6px rgba(30, 42, 6, 0.12)",
        "card-hover": "0 12px 40px -8px rgba(30, 42, 6, 0.25)",
        gold: "0 0 0 1px #C9A84C, 0 12px 32px -8px rgba(201, 168, 76, 0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "fade-in-up": "fade-in-up 0.7s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
