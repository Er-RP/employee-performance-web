/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "var(--primary-main)",
          light: "var(--primary-light)",
        },
        secondary: {
          main: "var(--secondary-main)",
          light: "var(--secondary-light)",
        },
      },
      fontFamily: {
        default: "var(--default-font)",
        title: "var(--title-font)",
        subtitle: "var(--subtitle-font)",
      },
    },
    screens: {
      xs: "460px",
      ...defaultTheme.screens,
      "3xl": "1800px",
    },
  },
  plugins: [],
};
