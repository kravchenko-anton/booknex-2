let lastTap: number | undefined
let timer: NodeJS.Timeout
export const handleDoublePress = (handleAction: () => void) => {
	if (lastTap) {
		handleAction()
		clearTimeout(timer)
		lastTap = undefined
	} else {
		lastTap = Date.now()
		timer = setTimeout(() => {
			lastTap = undefined
			clearTimeout(timer)
		}, 300)
	}
}

export const beforeLoad = (lastPosition: number) => `
	window.scrollTo({ top: ${lastPosition} });
`

export const scrollProgressDetect = `
let timerId;

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
 }, 500);
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
}) => {
	return `
	span {
		color: ${colorPalette.text} !important;
	}
		p {
		color: ${colorPalette.text} !important;
	}
	body {
		background: ${colorPalette.background.normal} !important;
		font-family: ${fontFamily} !important;
		font-size: ${fontSize}px;
		line-height: ${lineHeight};
		padding: ${padding}px;
		color: ${colorPalette.text};
	}

	li {
		color: ${colorPalette.text} !important;
	}
	a {
		color: ${colorPalette.secondary} !important;
	}
	h1 {
		font-size: ${fontSize * 1.6}px !important;
		font-weight: bold !important;
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
	`
}
