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
		mark: {
			background: string
			text: string
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
			mark: {
				background: '#22333B',
				text: '#fff'
			},
			primary: '#4d92d3',
			secondary: '#cf8e6d',
			background: {
				normal: '#121212',
				lighter: '#1a1a1a',
				darker: '#0c0c0c'
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
			mark: {
				background: '#7D387D',
				text: '#FFF'
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
				normal: '#FBF0D9',
				lighter: '#f7f1e3',
				darker: '#eae3cf'
			},
			mark: {
				background: '#b5a08f',
				text: '#fff'
			},
			textSelection: '#F0E1B9',
			text: '#5F4B32'
		}
	},
	{
		title: 'One Dark',
		slug: 'one-dark',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#61afef',
			secondary: '#e06c75',
			background: {
				normal: '#282c34',
				lighter: '#2c313a',
				darker: '#1e222a'
			},
			mark: {
				background: '#4A6D7C',
				text: '#fff'
			},
			textSelection: '#3e4451',
			text: '#abb2bf'
		}
	},
	{
		title: 'Gerry Dark',
		slug: 'gerry-dark',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#ff6c6b',
			secondary: '#f9c859',
			background: {
				normal: '#1f1f1f',
				lighter: '#2b2b2b',
				darker: '#131313'
			},
			mark: {
				background: '#6A2E35',
				text: '#fff'
			},
			textSelection: '#4f3f6f',
			text: '#F4F3F2'
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
			// get random mark color based on the theme
			mark: {
				background: '#55286F',
				text: '#fff'
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
			mark: {
				background: '#475657',
				text: '#fff'
			},
			textSelection: '#3d4d5f',
			text: '#b7bcd9'
		}
	},
	{
		title: 'Cobalt 2',
		slug: 'cobalt-2',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#e1efff',
			secondary: '#f07178',
			background: {
				normal: '#193549',
				lighter: '#1d3e5e',
				darker: '#142b40'
			},
			mark: {
				background: '#2C4251',
				text: '#fff'
			},
			textSelection: '#3d4d5f',
			text: '#b9c0cb'
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
			mark: {
				background: '#073642',
				text: '#fff'
			},
			textSelection: '#586e75',
			text: '#a8b4b5'
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
			mark: {
				background: '#63557A',
				text: '#fff'
			},
			textSelection: '#4f3f6f',
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
			mark: {
				background: '#323C50',
				text: '#fff'
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
			mark: {
				background: '#504945',
				text: '#fff'
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
			mark: {
				background: '#333344',
				text: '#fff'
			},
			textSelection: '#333333',
			text: '#e6e5e9'
		}
	},
	{
		title: "Dracula's Castle",
		slug: 'draculas-castle',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#ff79c6',
			secondary: '#bd93f9',
			background: {
				normal: '#282a36',
				lighter: '#373844',
				darker: '#1e2029'
			},
			mark: {
				background: '#4F3A65',
				text: '#fff'
			},
			textSelection: '#44475a',
			text: '#f8f8f2'
		}
	}
]
