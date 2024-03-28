import { ReaderFont } from '@/redux/reader/reading-settings-slice'

export const injectFont = () => {
	const fonts = ReaderFont.map(font => font.fontFamily)
	const fontFaces = fonts.map(
		font => `
		@font-face {
    font-family: '${font}-Bold';
    src:url('file:///android_asset/fonts/${font}-Bold.ttf') format('truetype')
		}

		@font-face {
			font-family: '${font}-Regular';
			src:url('file:///android_asset/fonts/${font}-Regular.ttf') format('truetype')
		}
		
		@font-face {
			font-family: '${font}-Light';
			src:url('file:///android_asset/fonts/${font}-Light.ttf') format('truetype')
		}
	`
	)
	return fontFaces.join('')
}
