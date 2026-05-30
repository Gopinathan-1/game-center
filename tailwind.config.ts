import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#1c1011",
        graphite: "#251819",
        platinum: "#f5ddde",
        ice: "#55d6f5",
        champagne: "#ffb2ba",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
      },
      boxShadow: {
        halo: "0 0 80px rgba(85, 214, 245, 0.18)",
        champagne: "0 0 80px rgba(255, 178, 186, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
