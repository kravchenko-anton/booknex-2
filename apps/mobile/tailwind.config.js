/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			gray: '#666666',
			primary: '#2B6B76',
			secondary: '#75471E',
			pale: '#FDF7F4',
			dust: '#F2E4DC',
			canvas: '#F9EFE8',
			black: '#000000',
			white: '#ffffff',
			alert: '#DC3F41',
			highlight: '#FFBE0B',
			transparent: colors.transparent
		}
	},
	plugins: []
}
