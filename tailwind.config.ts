import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#10131a",
        mist: "#f6f8fb",
        pine: "#11645a",
        coral: "#e86b5f",
        gold: "#d8a31a",
      },
      boxShadow: {
        glass: "0 24px 80px rgba(15, 23, 42, 0.14)",
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(circle at 18% 18%, rgba(232,107,95,.20), transparent 28%), radial-gradient(circle at 82% 16%, rgba(17,100,90,.18), transparent 30%), radial-gradient(circle at 55% 82%, rgba(216,163,26,.16), transparent 30%)",
        "mesh-dark":
          "radial-gradient(circle at 18% 18%, rgba(232,107,95,.16), transparent 28%), radial-gradient(circle at 82% 16%, rgba(55,178,162,.16), transparent 30%), radial-gradient(circle at 55% 82%, rgba(216,163,26,.11), transparent 30%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
