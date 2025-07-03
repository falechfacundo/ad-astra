const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "electric-violet": {
          50: "#faf3ff",
          100: "#f4e3ff",
          200: "#eacdff",
          300: "#daa5ff",
          400: "#c46cff",
          500: "#ae35ff",
          600: "#9b0fff",
          700: "#8f00ff",
          800: "#7306c3",
          900: "#5f079c",
          950: "#400076",
        },
        turquoise: {
          50: "#eefffb",
          100: "#c5fff7",
          200: "#8bfff0",
          300: "#47ffe7",
          400: "#14edd8",
          500: "#00d1bf",
          600: "#00a89d",
          700: "#00857f",
          800: "#056a66",
          900: "#0a5754",
          950: "#003535",
        },
      },
      animation: {
        meteor: "meteor 10s linear infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-800px)",
            opacity: 0,
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [nextui()],
};
