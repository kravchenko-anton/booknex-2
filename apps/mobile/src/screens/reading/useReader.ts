import { getStyleTag } from '@/screens/reading/additional-function'
import type { WebviewMessage } from '@/screens/reading/types'
import { userServices } from '@/shared/api/services/user/user-service'
import { useAction, useTypedNavigation, useTypedSelector } from '@/shared/hooks'
import { successToast } from '@/shared/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppState } from 'react-native'
import type { WebViewMessageEvent } from 'react-native-webview'

export const useReader = (id: number) => {
	const { colorScheme, padding, lineHeight, font, fontSize, books } =
		useTypedSelector(state => state.readingSettings)
	//TODO: возможно пофиксить положение по возвращению к книге, оно другое
	const [readerState, setReaderState] = useState({
		progress: books.find(book => book.id === id)?.lastProgress.progress,
		scrollTop: books.find(book => book.id === id)?.lastProgress.location
	})
	const { navigate } = useTypedNavigation()
	const { mutateAsync: finishReading } = useMutation(
		['end reading book'],
		(id: number) => userServices.finishReading(id)
	)
	const { addListener } = useTypedNavigation()
	const { updateReadingProgress } = useAction()

	const onMessage = useCallback(
		async (event: WebViewMessageEvent) => {
			const parsedEvent = JSON.parse(event.nativeEvent.data) as WebviewMessage
			const { type, payload } = parsedEvent
			if (type === 'scroll') {
				if (readerState.progress === payload.progress) return
				setReaderState({
					progress: payload.progress,
					scrollTop: payload.scrollTop
				})
			}
			if (type === 'finishBook') {
				await finishReading(id).then(() => {
					setReaderState({
						progress: 0,
						scrollTop: 0
					})
					successToast('Book successfully finished')
					navigate('Feedback', {
						id
					})
				})
			}
		},
		[readerState.progress]
	)

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

	return useMemo(
		() => ({
			colorScheme,
			styleTag,
			onMessage,
			progress: Math.round(readerState.progress),
			initialScroll: readerState.scrollTop
		}),
		[
			colorScheme,
			onMessage,
			readerState.progress,
			readerState.scrollTop,
			styleTag
		]
	)
}
