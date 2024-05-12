import { Color } from 'global/colors';
const statusBar = {
    light: 'light',
    dark: 'dark'
};
export const themePack = [
    {
        title: 'Dark',
        slug: 'dark',
        statusBar: statusBar.light,
        colorPalette: {
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
        title: 'Nord Frost',
        slug: 'nord-frost',
        statusBar: statusBar.light,
        colorPalette: {
            primary: '#81a1c1',
            secondary: '#bf616a',
            background: {
                normal: '#eceff4',
                lighter: '#f7fafc',
                darker: '#d8dee9'
            },
            textSelection: '#4f3f6f',
            text: '#2e3440'
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
            textSelection: '#44475a',
            text: '#f8f8f2'
        }
    },
    {
        title: "80's Neon",
        slug: '80s-neon',
        statusBar: statusBar.light,
        colorPalette: {
            primary: '#ffcc66',
            secondary: '#ff6b72',
            background: {
                normal: '#101010',
                lighter: '#121212',
                darker: '#0e0e0e'
            },
            textSelection: '#44475a',
            text: '#f8f8f2'
        }
    },
    {
        title: 'Dark Knight',
        slug: 'dark-knight',
        statusBar: statusBar.light,
        colorPalette: {
            primary: '#ff79c6',
            secondary: '#8be9fd',
            background: {
                normal: '#1a1a1a',
                lighter: '#1c1c1c',
                darker: '#181818'
            },
            textSelection: '#44475a',
            text: '#f8f8f2'
        }
    },
    {
        title: 'Cyberpunk',
        slug: 'cyberpunk',
        statusBar: statusBar.light,
        colorPalette: {
            primary: '#f7768e',
            secondary: '#bd93f9',
            background: {
                normal: '#1b1b2f',
                lighter: '#1f1f38',
                darker: '#161625'
            },
            textSelection: '#3d4d5f',
            text: '#f8f8f2'
        }
    },
    {
        title: "Hacker's Delight",
        slug: 'hackers-delight',
        statusBar: statusBar.light,
        colorPalette: {
            primary: '#50fa7b',
            secondary: '#ff79c6',
            // dark background
            background: {
                normal: '#141414',
                lighter: '#202020',
                darker: '#111111'
            },
            textSelection: '#44475a',
            text: '#f8f8f2'
        }
    },
    {
        title: 'Ayu',
        slug: 'ayu',
        statusBar: statusBar.light,
        colorPalette: {
            primary: '#ffd163',
            secondary: '#ffa965',
            background: {
                normal: '#0b0e14',
                lighter: '#0e1116',
                darker: '#080a0f'
            },
            textSelection: '#3d4d5f',
            text: '#f8f8f2'
        }
    },
    {
        title: 'Bearded Bear',
        slug: 'bearded-bear',
        statusBar: statusBar.light,
        colorPalette: {
            primary: '#87dc76',
            secondary: '#78e8bb',
            background: {
                normal: '#141414',
                lighter: '#202020',
                darker: '#0e0e0e'
            },
            textSelection: '#44475a',
            text: '#f8f8f2'
        }
    },
    {
        title: 'Rainglow',
        slug: 'rainglow',
        statusBar: statusBar.light,
        colorPalette: {
            primary: '#167b96',
            secondary: '#89dbbc',
            background: {
                normal: '#0e1114',
                lighter: '#12161a',
                darker: '#060708'
            },
            textSelection: '#3d4d5f',
            text: '#e6eaef'
        }
    }
];
//# sourceMappingURL=theme-pack.js.map