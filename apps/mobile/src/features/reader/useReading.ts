import { getStyleTag } from '@/features/reader/book-viewer-function'
import { useSaveProgress } from '@/features/reader/useSaveProgress'
import { userServices } from '@/shared/api/services/user/user-service'
import { useTypedNavigation, useTypedSelector } from '@/shared/hooks'
import { successToast } from '@/shared/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import type { WebViewMessageEvent } from 'react-native-webview'

export type WebviewMessage = {
	type: 'scroll' | 'finishBook'
	payload: {
		scrollTop: number
		progress: number
	}
}
export const useReading = (id: number) => {
	const { colorScheme, padding, lineHeight, font, fontSize, books } =
		useTypedSelector(state => state.readingSettings)
	const { navigate, goBack } = useTypedNavigation()
	const [readerState, setReaderState] = useState({
		progress: books.find(book => book.id === id)?.lastProgress.progress,
		scrollTop: books.find(book => book.id === id)?.lastProgress.location
	})

	useSaveProgress({ id, readerState })
	const { mutateAsync: finishReading } = useMutation(
		['end reading book'],
		(id: number) => userServices.finishReading(id)
	)

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
					navigate('BookFeedback', {
						id
					})
				})
			}
		},
		[readerState.progress]
	)

	const styleTag = getStyleTag({
		colorPalette: colorScheme.colorPalette,
		fontFamily: font.fontFamily,
		fontSize: fontSize,
		lineHeight,
		padding
	})

	return useMemo(
		() => ({
			goBack,
			colorScheme,
			styleTag,
			onMessage,
			progress: Math.round(readerState.progress),
			initialScroll: readerState.scrollTop
		}),
		[
			goBack,
			colorScheme,
			onMessage,
			readerState.progress,
			readerState.scrollTop,
			styleTag
		]
	)
}
