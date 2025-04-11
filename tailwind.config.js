/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react")
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "450px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
