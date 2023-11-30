/** @type {import('tailwindcss').Config} */
import { Color } from '../../libs/ui/colors'

const tailwindcssColors = require('tailwindcss/colors')
const Colors = (({ transparent,  ...o }) => o)(Color)
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
      colors: {
        ...Colors,
        transparent: tailwindcssColors.transparent
      }
  },
  darkMode: "class",
  plugins: []
}

