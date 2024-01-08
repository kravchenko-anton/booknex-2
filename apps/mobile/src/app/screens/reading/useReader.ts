import { useTypedNavigation } from '@/hooks'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {
	beforeLoad,
	getStyleTag,
	scrollProgressDetect
} from '@/screens/reading/additional-function'
import type { WebviewMessage } from '@/screens/reading/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppState } from 'react-native'
import type { WebViewMessageEvent } from 'react-native-webview'

export const useReader = (id: number) => {
	const { colorScheme, padding, lineHeight, font, fontSize, books } =
		useTypedSelector(state => state.readingSettings)
	//TODO: возможно пофиксить положение по возвращению к книге, оно другое
	console.log(
		books.find(book => book.id === id)?.lastProgress.progress || 0,
		books.find(book => book.id === id)?.lastProgress.location || 0
	)
	const [readerState, setReaderState] = useState({
		progress: books.find(book => book.id === id)?.lastProgress.progress || 0,
		scrollTop: books.find(book => book.id === id)?.lastProgress.location || 0
	})
	const { addListener } = useTypedNavigation()
	const { updateReadingProgress } = useAction()

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
	const injectedJavaScriptBeforeLoad = `
		${beforeLoad(readerState.scrollTop)}
		${scrollProgressDetect}
		`

	useEffect(() => {
		const unsubscribe = addListener('beforeRemove', () => {
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
	}, [addListener, id, readerState, updateReadingProgress])

	const styleTag = getStyleTag({
		colorPalette: colorScheme.colorPalette,
		fontFamily: font.fontFamily,
		fontSize: fontSize,
		lineHeight,
		padding
	})

	console.log('readerState.progress', readerState.progress)
	return useMemo(
		() => ({
			colorScheme,
			styleTag,
			onMessage,
			progress: Math.round(readerState.progress),
			injectedJavaScriptBeforeLoad
		}),
		[
			colorScheme,
			injectedJavaScriptBeforeLoad,
			onMessage,
			readerState.progress,
			styleTag
		]
	)
}
