import { ReaderFont } from '@/redux/reader/reading-settings-slice'
import { getFileUrl } from 'global/api-config'
import { Color } from 'global/colors'
import type { FunctionType } from 'global/types'

let lastTap: number | null
let timer: NodeJS.Timeout
export const handleDoublePress = (handleAction: FunctionType) => {
	if (lastTap) {
		handleAction()
		clearTimeout(timer)
		lastTap = null
	} else {
		lastTap = Date.now()
		timer = setTimeout(() => {
			lastTap = null
			clearTimeout(timer)
		}, 300)
	}
}

export const finishBookButton = `
		<div
		  class="finish-book-button-container"
		 style="
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 0;
				right: 0;
				height: 70px;
				font-weight: bold;
				">
				
				<div
				 style="
				  display: flex;
				  align-items: center;
				  justify-content: space-between;
					color: ${Color.white};
				font-size: 15px;
				width: 95%;
				">
				Read it till the end?
				<div
				class="finish-book-button"
				onclick="window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finishBook' }))"
				style="
				border: 0;
				color: ${Color.white};
				font-size: 16px;
				border-radius: 12px;
				padding: 6px 12px;
				"
				>
				Finish book
				</div>
</div>

</div>
`

export const ViewerHtml = ({
	title,
	picture,
	file,
	defaultTheme
}: {
	title: string
	picture: string
	file: string[]
	defaultTheme: string
}) => {
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
	return `
	<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
				<title>${title}</title>
				<style>
					${fontFaces.join('')}
</style>
			</head>
			<style>${defaultTheme}</style>
			<div>
				<img style='width:100%; height: 300px; object-fit: contain; object-position: center; padding-top: 40px'
					 src="${getFileUrl(picture)}" alt="${title}" />
				<h1>${title}</h1>
			</div>
			${file}
			${finishBookButton}
	`
}

export const scrollProgressDetect = `
let timerId;
let chapters = document.querySelectorAll('div');

window.addEventListener('scroll', function() {
 clearTimeout(timerId);

 timerId = setTimeout(() => {
   let currentScrollPosition = document.body.scrollTop;

   window.ReactNativeWebView.postMessage(JSON.stringify({
     type: "scroll",
     payload: {
       scrollTop: currentScrollPosition,
       progress: (currentScrollPosition / (document.body.scrollHeight - document.body.clientHeight) * 100)
     }
   }));
   
 }, 1000);
});
`

export const injectStyle = (style: string) => `
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = \`${style}\`;
 document.head.appendChild(style);
		`

export const getStyleTag = ({
	colorPalette,
	fontFamily,
	fontSize,
	lineHeight,
	padding
}: {
	colorPalette: {
		text: string
		background: {
			normal: string
			lighter: string
			darker: string
		}
		primary: string
		secondary: string
	}
	fontFamily: string
	fontSize: number
	lineHeight: number
	padding: number
}) =>
	`
	span {
		color: ${colorPalette.text} !important;
		font-family: ${fontFamily} !important;
	}
		p {
		color: ${colorPalette.text} !important;
		font-family: ${fontFamily}-Regular !important;
	}
	body {
		background: ${colorPalette.background.normal} !important;
		font-family: ${fontFamily}-Regular !important;
		font-size: ${fontSize}px;
		line-height: ${lineHeight};
		padding: ${padding}px;
		color: ${colorPalette.text};
	}

	li {
		color: ${colorPalette.text} !important;
		font-family: ${fontFamily}-Regular !important;
	}
	a {
		color: ${colorPalette.secondary} !important;
		font-family: ${fontFamily}-Bold !important;
	}
	h1 {
		font-size: ${fontSize * 1.6}px !important;
		font-family: ${fontFamily}-Bold !important;
		color: ${colorPalette.primary} !important;
	}
	h2 {
		font-weight: bold !important;
		color: ${colorPalette.primary} !important;
		font-size: ${fontSize * 1.5}px !important;
	}
	h3 {
		font-weight: bold !important;
		color: ${colorPalette.primary} !important;
		font-size: ${fontSize * 1.4}px !important;
	}
	h4 {
		font-weight: bold !important;
		color: ${colorPalette.primary} !important;
		font-size: ${fontSize * 1.3}px !important;
	}
	h5 {
		font-weight: bold !important;
		font-size: ${fontSize * 1.2}px !important;
		color: ${colorPalette.primary} !important;
	}
	h6 {
		font-size: ${fontSize * 1.1}px !important;
		font-weight: bold !important;
		color: ${colorPalette.primary} !important;
	}
	::selection {
		background: ${colorPalette.background.lighter} !important;
		color: ${colorPalette.text} !important;
	}
	ul {
		color: ${colorPalette.text} !important;
		list-style-type: none;
	}
	ol {
	color: ${colorPalette.text} !important;
	list-style-type: none;
	}
	em {
		font-style: italic !important;
	}
	b {
		font-weight: bold !important;
		color: ${colorPalette.primary} !important;
	}
	strong {
		font-weight: bold !important;
		color: ${colorPalette.primary} !important;
	}
	i {
		font-style: italic !important;
		color: ${colorPalette.primary} !important;
	}
	
	.finish-book-button {
		background: ${colorPalette.primary} !important;
		color: ${colorPalette.text} !important;
		
	}
	.finish-book-button-container {
		background: ${colorPalette.background.darker} !important;
	}
	`
