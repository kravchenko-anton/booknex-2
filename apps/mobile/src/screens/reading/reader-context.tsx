import api from '@/api'
import { useTypedNavigation, useTypedSelector } from '@/hooks'
import type { ThemePackType } from '@/screens/reading/reader-customization/helpers/theme-pack'
import {
	getStyleTag,
	injectStyle
} from '@/screens/reading/reader-viewer/stylesFunctions'

import { useSaveProgress } from '@/screens/reading/reader-viewer/useSaveProgress'

import { successToast } from '@/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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

export const ReaderContext = createContext(
	null as unknown as {
		colorScheme: ThemePackType
		styleTag: string
		onMessage: (event: WebViewMessageEvent) => Promise<void>
		progress: number
		initialScroll: number
		reference: React.RefObject<WebView>
		defaultTheme: string
		changeChapter: (chapter: string) => void
	}
)
export interface WebviewMessageType {
	type: 'scroll' | 'finishBook' | 'textSelect' | 'textSelectFail'
	payload: {
		scrollTop: number
		progress: number
		text: string
	}
}

type ReaderProviderProperties = PropsWithChildren<{
	id: number
}>
export const ReadingProvider: FC<ReaderProviderProperties> = ({
	children,
	id
}) => {
	const queryClient = useQueryClient()
	const viewerReference = useRef<WebView>(null)
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
				console.log('scroll', payload)
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
		viewerReference.current?.injectJavaScript(`${injectStyle(styleTag)}`)
	}, [styleTag])

	const [defaultTheme] = useState(styleTag) // eslint-disable-line react/hook-use-state

	const changeChapter = useCallback((link: string) => {
		console.log('changeChapter', link)
		viewerReference.current?.injectJavaScript(
			`window.location.hash = '${link}'`
		)
	}, [])

	const value = {
		colorScheme,
		styleTag,
		onMessage,
		progress: Math.round(readerState.progress),
		initialScroll: readerState.scrollTop,
		reference: viewerReference,
		changeChapter,
		defaultTheme
	}
	console.log('context render' + Math.random())
	return (
		<ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
	)
}

// Custom hook to use the context
export const useReader = () => {
	const context = useContext(ReaderContext)
	if (!context) {
		throw new Error('useReading must be used within a ReadingProvider')
	}
	return context
}
