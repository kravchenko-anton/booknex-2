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
				foreground: '#242424',
				vibrant: '#323232',
				shade: '#131313',
				background: '#0d0d0d',
				primary: '#5e548e',
				secondary: '#685369',
				black: '#000000',
				gray: '#9F9F9F',
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
