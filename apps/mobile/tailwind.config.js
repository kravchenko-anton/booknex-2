/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			muted: '#1f2123',
			bordered: '#2d2e30',
			background: '#111113',
			foreground: '#18191b',
			primary: '#306A9C',
			black: '#000000',
			gray: '#9F9F9F',
			white: '#F4F3F2',
			danger: '#DC3F41',
			success: '#4CAF50',
			warning: '#f48c06',
			transparent: colors.transparent
		},
		//TODO: пофиксить border radius и сделать зависимость
		borderRadius: {
			none: '0',
			DEFAULT: '0.25rem',
			md: '0.375rem',
			full: '9999px'
		}
	},
	plugins: []
}
