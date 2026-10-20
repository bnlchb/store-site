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
        background: "var(--background)",
        foreground: "var(--foreground)",
        bone: "#F2EFE6",
        paper: "#FBF9F4",
        ink: "#111110",
        volt: "#D8FF3E",
        sand: "#E7E1D5",
        muted: "#77736A",
        line: "#D8D2C4",
        brand: {
          green: "#8BC34A",
          black: "#000000",
          white: "#FFFFFF",
          accent: "#333333",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        display: ["var(--font-geist-sans)", "Arial Black", "sans-serif"],
        graffiti: ["Impact", "Arial Black", "sans-serif"],
        body: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #000000",
        brutalMd: "6px 6px 0px 0px #000000",
        brutalLg: "8px 8px 0px 0px #000000",
      },
      borderWidth: {
        3: "3px",
        6: "6px",
        8: "8px",
      },
      rotate: {
        15: "15deg",
        30: "30deg",
      },
      screens: {
        xs: "475px",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "skew-in": {
          "0%": { transform: "skewX(-10deg) translateX(-100%)" },
          "100%": { transform: "skewX(0deg) translateX(0%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        pop: "pop 0.3s ease-in-out",
        "skew-in": "skew-in 0.6s ease-out",
        "fade-up": "fade-up 0.6s ease-out",
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
