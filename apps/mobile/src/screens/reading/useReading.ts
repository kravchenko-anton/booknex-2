import api from '@/api'

import { useTypedNavigation, useTypedRoute, useTypedSelector } from '@/hooks'
import {
	beforeLoad,
	getStyleTag,
	injectStyle
} from '@/screens/reading/helpers/book-viewer-function'
import { useSaveProgress } from '@/screens/reading/helpers/useSaveProgress'

import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import type WebView from 'react-native-webview'
import type { WebViewMessageEvent } from 'react-native-webview'

export interface WebviewMessageType {
	type: 'scroll' | 'finishBook'
	payload: {
		scrollTop: number
		progress: number
	}
}
export const useReading = () => {
	const { params } = useTypedRoute<'Reader'>()
	const queryClient = useQueryClient()

	const id = +params.id
	const { data: ebook } = useQuery({
		queryKey: ['e-books', +params.id],
		queryFn: () => api.book.ebookById(+params.id),
		select: data => data.data
	})
	const [readerUiVisible, setReaderUiVisible] = useState(true)
	const reference = useRef<WebView>(null)

	const { colorScheme, padding, lineHeight, font, fontSize, books } =
		useTypedSelector(state => state.readingSettings)

	const { navigate } = useTypedNavigation()
	const [readerState, setReaderState] = useState({
		progress: Number(books.find(book => book.id === id)?.lastProgress.progress),
		scrollTop: Number(books.find(book => book.id === id)?.lastProgress.location)
	})

	useSaveProgress({
		id,
		readerState
	})
	const { mutateAsync: finishReading, isLoading: finishReadingLoading } =
		useMutation({
			mutationKey: ['end-reading', id],
			mutationFn: (id: number) => api.user.finishReading(id)
		})

	const onMessage = useCallback(
		async (event: WebViewMessageEvent) => {
			const parsedEvent = JSON.parse(
				event.nativeEvent.data
			) as WebviewMessageType
			const { type, payload } = parsedEvent
			if (type === 'scroll') {
				if (readerState.progress === payload.progress) return
				setReaderState({
					progress: payload.progress,
					scrollTop: payload.scrollTop
				})
			}
			if (type === 'finishBook' && !finishReadingLoading) {
				await finishReading(id).then(() => {
					setReaderState({
						progress: 0,
						scrollTop: 0
					})
					successToast('Book successfully finished')
					navigate('BookReview', {
						id
					})
					queryClient.invalidateQueries({
						queryKey: ['user-library']
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

	useEffect(() => {
		reference.current?.injectJavaScript(`
		${injectStyle(styleTag)}
		${beforeLoad(Number(readerState.scrollTop))}
		`)
	}, [])

	const [defaultTheme] = useState(styleTag) // eslint-disable-line react/hook-use-state

	return {
		colorScheme,
		styleTag,
		onMessage,
		progress: Math.round(readerState.progress),
		initialScroll: readerState.scrollTop,
		ebook,
		readerUiVisible,
		setReaderUiVisible,
		reference,
		defaultTheme
	}
}