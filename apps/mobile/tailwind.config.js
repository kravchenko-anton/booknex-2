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
			white: '#ffffff',
			danger: '#DC3F41',
			success: '#4CAF50',
			warning: '#FFBE0B',
			transparent: colors.transparent
		},
		borderRadius: {
			none: '0',
			sm: '0.125rem',
			DEFAULT: '0.25rem',
			lg: '0.5rem',
			full: '9999px'
		}
	},
	plugins: []
}
