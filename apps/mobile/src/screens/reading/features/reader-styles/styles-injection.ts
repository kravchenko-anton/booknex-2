import type { ThemePackType } from '@/screens/reading/features/reader-styles/theme-pack'

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
	colorPalette: ThemePackType['colorPalette']
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
		scroll-behavior: smooth !important;
		
		line-height: ${lineHeight};
		word-wrap: break-word !important;
		max-width: 100% !important;
		
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
		background: ${colorPalette.textSelection} !important;
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
		background: ${colorPalette.background.lighter} !important;
		color: ${colorPalette.text} !important;
		
	}
	.finish-book-button-container {
		background: ${colorPalette.background.darker} !important;
	}
	`
