/** @type {import('tailwindcss').Config} */
import { Color } from '../../libs/ui/colors'

const tailwindcssColors = require('tailwindcss/colors')
const Colors = (({ transparent,  ...o }) => o)(Color)

module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...Colors,
      transparent: tailwindcssColors.transparent
    }
  },
	plugins: []
}
