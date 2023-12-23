/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}',
		'../../libs/ui/react-native/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				foreground: '#26262C',
				vibrant: '#4d5058',
				shade: '#1b1b1f',
				background: '#151517',
				primary: '#685369',
				secondary: '#605770',
				black: '#000000',
				gray: '#959caf',
				white: '#ffffff',
				danger: '#DC3F41',
				success: '#4CAF50',
				warning: '#FFBE0B',
				transparent: colors.transparent
			}
		}
	},
	plugins: []
}
