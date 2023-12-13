/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export const content = ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}']
export const theme = {
	colors: {
		transparent: colors.transparent
	}
}
export const plugins = []
