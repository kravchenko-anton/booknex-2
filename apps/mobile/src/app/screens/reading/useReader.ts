import { useTypedNavigation } from '@/hooks'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {
	beforeLoad,
	handleDoublePress,
	scrollProgressDetect
} from '@/screens/reading/additional-function'
import type { WebviewMessage } from '@/screens/reading/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppState } from 'react-native'
import type { WebViewMessageEvent } from 'react-native-webview'

export const useReader = (id: number) => {
	const { colorScheme, padding, lineHeight, font, fontSize, books } =
		useTypedSelector(state => state.readingSettings)
	const [readerUiVisible, setReaderUiVisible] = useState(true)
	const [readerState, setReaderState] = useState({
		progress: books.find(book => book.id === id)?.lastProgress.progress || 0,
		scrollTop: books.find(book => book.id === id)?.lastProgress.location || 0
	} as {
		progress: number
		scrollTop: number
	})
	const { addListener } = useTypedNavigation()
	const { updateReadingProgress } = useAction()
	const styleTag = `
	span {
		color: ${colorScheme.colorPalette.text} !important;
	}
		p {
		color: ${colorScheme.colorPalette.text} !important;
	}
	body {
		background: ${colorScheme.colorPalette.background.normal} !important;
		font-family: ${font.fontFamily} !important;
		font-size: ${fontSize}px;
		line-height: ${lineHeight};
		padding: ${padding}px;
		color: ${colorScheme.colorPalette.text};
	}

	li {
		color: ${colorScheme.colorPalette.text} !important;
	}
	a {
		color: ${colorScheme.colorPalette.secondary} !important;
	}
	h1 {
		font-size: ${fontSize * 1.6}px !important;
		font-weight: bold !important;
		color: ${colorScheme.colorPalette.primary} !important;
	}
	h2 {
		font-weight: bold !important;
		color: ${colorScheme.colorPalette.primary} !important;
		font-size: ${fontSize * 1.5}px !important;
	}
	h3 {
		font-weight: bold !important;
		color: ${colorScheme.colorPalette.primary} !important;
		font-size: ${fontSize * 1.4}px !important;
	}
	h4 {
		font-weight: bold !important;
		color: ${colorScheme.colorPalette.primary} !important;
		font-size: ${fontSize * 1.3}px !important;
	}
	h5 {
		font-weight: bold !important;
		font-size: ${fontSize * 1.2}px !important;
		color: ${colorScheme.colorPalette.primary} !important;
	}
	h6 {
		font-size: ${fontSize * 1.1}px !important;
		font-weight: bold !important;
		color: ${colorScheme.colorPalette.primary} !important;
	}
	::selection {
		background: ${colorScheme.colorPalette.background.lighter} !important;
		color: ${colorScheme.colorPalette.text} !important;
	}
	ul {
		color: ${colorScheme.colorPalette.text} !important;
		list-style-type: none;
	}
	ol {
	color: ${colorScheme.colorPalette.text} !important;
	list-style-type: none;
	}
	em {
		font-style: italic !important;
	}
	b {
		font-weight: bold !important;
		color: ${colorScheme.colorPalette.primary} !important;
	}
	strong {
		font-weight: bold !important;
		color: ${colorScheme.colorPalette.primary} !important;
	}
	i {
		font-style: italic !important;
		color: ${colorScheme.colorPalette.primary} !important;
	}
	`
	const doubleTap = () =>
		handleDoublePress(() => setReaderUiVisible(!readerUiVisible))

	const onMessage = useCallback(
		(event: WebViewMessageEvent) => {
			const parsedEvent = JSON.parse(event.nativeEvent.data) as WebviewMessage
			const { type, payload } = parsedEvent
			if (type === 'scroll') {
				if (readerState.progress === payload.progress) return
				setReaderState({
					progress: payload.progress,
					scrollTop: payload.scrollTop
				})
			}
		},
		[readerState.progress]
	)
	console.log(readerState.progress)
	const injectedJavaScriptBeforeLoad = `
		${beforeLoad(readerState.scrollTop)}
		${scrollProgressDetect}
		`
	useEffect(() => {
		const unsubscribe = addListener('beforeRemove', e => {
			updateReadingProgress({
				id,
				progress: readerState.progress,
				location: readerState.scrollTop
			})
		})
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (/inactive|background/.test(nextAppState)) {
				updateReadingProgress({
					id,
					progress: readerState.progress,
					location: readerState.scrollTop
				})
			}
		})
		return () => {
			unsubscribe()
			subscription.remove()
		}
	}, [readerState])

	return useMemo(
		() => ({
			doubleTap,
			styleTag,
			onMessage,
			readerUiVisible,
			progress: Math.round(readerState.progress),
			injectedJavaScriptBeforeLoad
		}),
		[
			doubleTap,
			styleTag,
			onMessage,
			readerUiVisible,
			Math.round(readerState.progress),
			injectedJavaScriptBeforeLoad
		]
	)
}
