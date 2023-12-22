/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}',
		'../../libs/ui/react/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				foreground: '#23272f',
				vibrant: '#374151',
				shade: '#16181d',
				background: '#191c22',
				primary: '#0d6d8c',
				secondary: '#087ea4',
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
