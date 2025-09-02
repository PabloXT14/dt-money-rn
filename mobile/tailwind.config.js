import { colors } from "./src/shared/colors"
import { fontSize } from "./src/shared/font-size"
import { fontFamily } from "./src/shared/font-family"

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontSize,
      fontFamily,
    },
  },
  plugins: [],
}
