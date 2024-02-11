import { Color } from 'global/colors'
import type { StatusBarStyle } from 'react-native/Libraries/Components/StatusBar/StatusBar'

export interface ThemePackType {
	title: string
	slug: string
	statusBar: StatusBarStyle
	colorPalette: {
		primary: string
		secondary: string
		background: {
			normal: string
			lighter: string
			darker: string
		}
		text: string
	}
}

const statusBar = {
	light: 'light-content' as 'light-content',
	dark: 'dark-content' as 'dark-content'
}

export const themePack: ThemePackType[] = [
	{
		title: 'Dark',
		slug: 'dark',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#4d92d3',
			secondary: '#cf8e6d',
			background: {
				normal: '#202020',
				lighter: '#2b2b2b',
				darker: '#1a1a1a'
			},
			text: '#fff'
		}
	},
	{
		title: 'Light',
		slug: 'light',
		statusBar: statusBar.light,
		colorPalette: {
			primary: Color.primary,
			secondary: '#rb8e6d',
			background: {
				normal: Color.white,
				lighter: '#f9f9f9',
				darker: '#f2f2f2'
			},
			text: Color.black
		}
	},
	{
		title: 'Sepia',
		slug: 'sepia',
		statusBar: statusBar.dark,
		colorPalette: {
			primary: '#606c38',
			secondary: '#684E32',
			background: {
				normal: '#f4eee8',
				lighter: '#f9f5f0',
				darker: '#eae2d6'
			},
			text: '#2d2a32'
		}
	},
	{
		title: 'Dark purple',
		slug: 'dark-purple',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#bb77b0',
			secondary: '#ebbcba',
			background: {
				normal: '#1f1d2e',
				lighter: '#272433',
				darker: '#1a1928'
			},
			text: '#d3cedc'
		}
	},

	{
		title: 'Tokyo night',
		slug: 'tokyo-night',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#72d7c8',
			secondary: '#ffc66d',
			background: {
				normal: '#1a1b26',
				lighter: '#222332',
				darker: '#13131c'
			},
			text: '#b7bcd9'
		}
	},
	{
		title: 'Solarized',
		slug: 'solarized',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#b58900',
			secondary: '#cb4b16',
			background: {
				normal: '#002b36',
				lighter: '#003847',
				darker: '#001f26'
			},
			text: '#a8b4b5'
		}
	},
	{
		title: 'Blue night',
		slug: 'blue-night',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#24b5a8',
			secondary: '#3398d3',
			background: {
				normal: '#121726',
				lighter: '#1a2533',
				darker: '#0c111a'
			},
			text: '#c2c8db'
		}
	},
	{
		title: 'Kanagawa',
		slug: 'kanagawa',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#957fb8',
			secondary: '#ff4848',
			background: {
				normal: '#1f1f28',
				lighter: '#272732',
				darker: '#1a1a22'
			},
			text: '#dcd7ba'
		}
	},
	{
		title: 'Pink owl',
		slug: 'pink-owl',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#ff699a',
			secondary: '#e7de79',
			background: {
				normal: '#13111b',
				lighter: '#1b1825',
				darker: '#0c0a12'
			},
			text: '#dcd7ba'
		}
	}
]
