import api from '@/api'
import { useTypedNavigation, useTypedRoute, useTypedSelector } from '@/hooks'
import type { ThemePackType } from '@/screens/reading/reader-customization/theme-pack'
import {
	getStyleTag,
	injectStyle
} from '@/screens/reading/reader-viewer/reader-viewer-function'
import { useSaveProgress } from '@/screens/reading/reader-viewer/useSaveProgress'

import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { EbookByIdOutput } from 'global/api-client'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type FC,
	type PropsWithChildren
} from 'react'
import type WebView from 'react-native-webview'
import type { WebViewMessageEvent } from 'react-native-webview'

export const ReadingContext = createContext(
	null as unknown as {
		colorScheme: ThemePackType
		styleTag: string
		onMessage: (event: WebViewMessageEvent) => Promise<void>
		progress: number
		initialScroll: number
		ebook: EbookByIdOutput | undefined
		reference: React.RefObject<WebView>
		defaultTheme: string
	}
)
export interface WebviewMessageType {
	type: 'scroll' | 'finishBook'
	payload: {
		scrollTop: number
		progress: number
	}
}

export const ReadingProvider: FC<PropsWithChildren> = ({ children }) => {
	const { params } = useTypedRoute<'Reader'>()
	const queryClient = useQueryClient()
	const id = +params.id
	const { data: ebook } = useQuery({
		queryKey: ['e-books', +params.id],
		queryFn: () => api.book.ebookById(+params.id),
		select: data => data.data
	})
	const reference = useRef<WebView>(null)
	const { colorScheme, padding, lineHeight, font, fontSize } = useTypedSelector(
		state => state.readingUi
	)
	const { books } = useTypedSelector(state => state.readingProgress)
	const { navigate } = useTypedNavigation()
	const [readerState, setReaderState] = useState({
		progress: books.find(book => book.id === id)?.latestProgress.progress || 1,
		scrollTop: books.find(book => book.id === id)?.latestProgress.location || 1
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
    `)
	}, [])

	const [defaultTheme] = useState(styleTag) // eslint-disable-line react/hook-use-state

	const value = {
		colorScheme,
		styleTag,
		onMessage,
		progress: Math.round(readerState.progress),
		initialScroll: readerState.scrollTop,
		ebook,
		reference,
		defaultTheme
	}

	return (
		<ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
	)
}

// Custom hook to use the context
export const useReader = () => {
	const context = useContext(ReadingContext)
	if (!context) {
		throw new Error('useReading must be used within a ReadingProvider')
	}
	return context
}
