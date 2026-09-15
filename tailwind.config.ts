import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        cream: "#FAF6EC",
        paper: "#FFFDF8",
        yolk: "#FFC700",
        bubblegum: "#FF4D8D",
        mint: "#4ADE80",
        violet: "#7B61FF",
        sky: "#5FB9FF",
        peach: "#FFB27A",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brut: "4px 4px 0 0 #111111",
        "brut-sm": "2px 2px 0 0 #111111",
        "brut-lg": "8px 8px 0 0 #111111",
        "brut-white": "4px 4px 0 0 #FFFFFF",
      },
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
