/** @type {import('tailwindcss').Config} */
const { Color } = require('../../libs/ui/colors')
const tailwindcssColors = require('tailwindcss/colors')
const Colors = (({ transparent, ...o }) => o)(Color)

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
