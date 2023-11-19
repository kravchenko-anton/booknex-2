import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { handleDoublePress } from '@/screens/reading/reader/additional-function'
import type { WebviewMessage } from '@/screens/reading/reader/types'
import type { WebViewMessageEvent } from 'react-native-webview'

export const useReader = (id: number) => {
	const { colorScheme, padding, lineHeight, font, fontSize } = useTypedSelector(
		state => state.readingSettings
	)
	const { toggleReadingUi, updateReadingProgress, setProgress } = useAction()
	const styleTag = `body {
		background: ${colorScheme.theme.body.background} !important;
		font-family: ${font.fontFamily} !important;
		font-size: ${fontSize}px;
		line-height: ${lineHeight};
		padding: ${padding}px;
	}
	i {
		color: ${colorScheme.colorPalette.primary} !important;
	}
	span {
		color: ${colorScheme.colorPalette.text} !important;
	}
	p {
		color: ${colorScheme.colorPalette.text} !important;
	}
	li {
		color: ${colorScheme.colorPalette.text} !important;
	}
	a {
		color: ${colorScheme.colorPalette.secondary} !important;
		'font-weight': "bold !important";
		textDecoration: "none !important";
		'font-style': "italic !important";
	}
	h1 {
		font-size: ${fontSize * 1.6}px !important;
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
	}
	h2 {
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
		font-size: ${fontSize * 1.5}px !important;
	}
	h3 {
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
		font-size: ${fontSize * 1.4}px !important;
	}
	h4 {
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
		font-size: ${fontSize * 1.3}px !important;
	}
	h5 {
		'font-weight': "bold !important";
		font-size: ${fontSize * 1.2}px !important;
		color: ${colorScheme.colorPalette.primary} !important;
	}
	h6 {
		font-size: ${fontSize * 1.1}px !important;
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
	}
	'::selection' {
		background: ${colorScheme.colorPalette.primary} !important;
		color: ${colorScheme.colorPalette.text} !important;
	}
	ul {
		color: ${colorScheme.colorPalette.text} !important;
		'list-style-type': "none";
	}
	ol {
		color: ${colorScheme.colorPalette.text} !important;
		'list-style-type': "none";
	}
	strong {
		'font-weight': "bold !important" !important;
	}
	em {
		'font-style': "italic !important";
	}
	b {
		'font-weight': "bold !important";
		color: ${colorScheme.colorPalette.primary} !important;
	}`
	const doubleTap = () => handleDoublePress(() => toggleReadingUi())
	const onMessage = (event: WebViewMessageEvent) => {
		const parsedEvent = JSON.parse(event.nativeEvent.data) as WebviewMessage
		const { type, payload } = parsedEvent
		if (type === 'scroll') {
			setProgress(payload.progress)
			updateReadingProgress({
				id,
				progress: payload.progress,
				location: payload.scrollTop
			})
		}
	}

	return {
		doubleTap,
		onMessage,
		styleTag,
		colorScheme
	}
}
