import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      blurple: {
        300: "#7983f5",
        400: "#5865F2",
        500: "#4752c4",
        600: "#3c45a5",
      },
      black: "#23272A",
      white: "#FFFFFF",
      green: {
        400: "#57F287",
        500: "#23A55A",
      },
      yellow: "#FEE75C",
      red: "#ED4245",
      fuchsia: "#EB459E",
      blue: "#00a8fc",
      gray: {
        900: "#1e1f22",
        800: "#2b2d31",
        700: "#313338",
        600: "#949ba4",
        500: "#b5bac1",
        400: "#d4d7dc",
        300: "#e3e5e8",
        200: "#ebedef",
        100: "#f2f3f5",
      },
    },
    fontFamily: {
      sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      headline: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
