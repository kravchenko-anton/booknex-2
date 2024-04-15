import { Color } from 'global/colors'

export interface ThemePackType {
	title: string
	slug: string
	statusBar: 'light' | 'dark'
	colorPalette: {
		primary: string
		secondary: string
		textSelection: string
		background: {
			normal: string
			lighter: string
			darker: string
		}
		text: string
	}
}

const statusBar = {
	light: 'light' as const,
	dark: 'dark' as const
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
			textSelection: '#285943',
			text: '#fff'
		}
	},
	{
		title: 'Light',
		slug: 'light',
		statusBar: statusBar.dark,
		colorPalette: {
			primary: Color.primary,
			secondary: '#rb8e6d',
			background: {
				normal: Color.white,
				lighter: '#f9f9f9',
				darker: '#f2f2f2'
			},
			textSelection: '#317259',
			text: Color.black
		}
	},
	{
		title: 'Sepia',
		slug: 'sepia',
		statusBar: statusBar.dark,
		colorPalette: {
			primary: '#c7a17a',
			secondary: '#cf8e6d',
			background: {
				normal: '#f0e9d7',
				lighter: '#f7f1e3',
				darker: '#eae3cf'
			},
			textSelection: '#7a5a3f',
			text: '#5f4b32'
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
			textSelection: '#4f3f6f',
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
			textSelection: '#3d4d5f',
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
			textSelection: '#586e75',
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
			textSelection: '#3d4d5f',
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
			textSelection: '#4f3f6f',
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
			textSelection: '#3d4d5f',
			text: '#c2c8db'
		}
	},
	{
		title: 'Kanagawa Black',
		slug: 'kanagawa-black',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#957fb8',
			secondary: '#ff4848',
			background: {
				normal: '#000000',
				lighter: '#121212',
				darker: '#000000'
			},
			textSelection: '#223249',
			text: '#dcd7ba'
		}
	},
	{
		title: 'Nord',
		slug: 'nord',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#81a1c1',
			secondary: '#bf616a',
			background: {
				normal: '#2e3440',
				lighter: '#3b4252',
				darker: '#242831'
			},
			textSelection: '#4f3f6f',
			text: '#d8dee9'
		}
	},

	{
		title: 'Gruvbox',
		slug: 'gruvbox',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#fb4934',
			secondary: '#fabd2f',
			background: {
				normal: '#282828',
				lighter: '#3c3836',
				darker: '#1d2021'
			},
			textSelection: '#458588',
			text: '#ebdbb2'
		}
	},
	{
		title: 'Twitch Dark',
		slug: 'twitch-dark',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#b48fea',
			secondary: '#e9c55a',
			background: {
				normal: '#232324',
				lighter: '#181817',
				darker: '#141416'
			},
			textSelection: '#333333',
			text: '#e6e5e9'
		}
	},
	{
		title: 'Hiberbee',
		slug: 'hiberbee',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#e7bf57',
			secondary: '#ee7762',
			background: {
				normal: '#171615',
				lighter: '#373635',
				darker: '#121110'
			},
			textSelection: '#214283',
			text: '#e6e1cf'
		}
	}
]
