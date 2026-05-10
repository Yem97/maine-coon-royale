import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        "gold-light": "#F5E6A3",
        "gold-dark": "#A0821A",
        navy: "#0D0D1A",
        "navy-light": "#1a1a2e",
        "navy-mid": "#16213e",
        cream: "#FDF8F0",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #D4AF37 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
