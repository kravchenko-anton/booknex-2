/** @type {import('tailwindcss').Config} */
const tailwindcssColors = require('tailwindcss/colors')
const { Color } = require('../../libs/ui/colors.ts')
const Colors = (({ transparent, ...o }) => o)(Color)
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
	plugins: []
}
