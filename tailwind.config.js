/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      blurple: "#5865F2",
      black: "#23272A",
      green: "#57F287",
      yellow: "#FEE75C",
      red: "#ED4245",
      fuchsia: "#EB459E",
      gray: {
        900: "#202225",
        800: "#2f3136",
        700: "#36393f",
        600: "#4f545c",
        400: "#d4d7dc",
        300: "#e3e5e8",
        200: "#ebedef",
        100: "#f2f3f5",
      },
    },
    extend: {},
  },
  plugins: [],
};
