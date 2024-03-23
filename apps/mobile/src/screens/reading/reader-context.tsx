import api from '@/api'
import { useTypedNavigation, useTypedSelector } from '@/hooks'
import type { ThemePackType } from '@/screens/reading/reader-customization/helpers/theme-pack'
import {
	getStyleTag,
	injectStyle
} from '@/screens/reading/reader-viewer/styles.function'

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
		progress: {
			bookProgress: number
			chapterProgress: number
		}
		reference: React.RefObject<WebView>
		defaultProperties: {
			defaultTheme: string
			scrollPosition: number
		}
		changeChapter: (chapter: string) => void
		padding: number
		lineHeight: number
		font: {
			title: string
			fontFamily: string
		}
		fontSize: number
	}
)
export interface WebviewMessageType {
	type: 'scroll' | 'finishBook' | 'textSelect' | 'textSelectFail'
	payload: {
		scrollTop: number
		progress: number
		currentChapterProgress: number
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
	const [scrollPosition, setScrollPosition] = useState(
		books.find(book => book.id === id)?.latestProgress.scrollPosition || 1
	)
	const [readingProgress, setReadingProgress] = useState({
		bookProgress: 0,
		chapterProgress: 0
	})

	useSaveProgress({
		id,
		scrollPosition,
		progress: readingProgress.bookProgress
	})

	const { mutateAsync: finishReading, isLoading: finishReadingLoading } =
		useMutation({
			mutationKey: ['finish-reading', id],
			mutationFn: (id: number) => api.user.finishReading(id)
		})

	const onMessage = useCallback(
		async (event: WebViewMessageEvent) => {
			const parsedEvent = JSON.parse(
				event.nativeEvent.data
			) as WebviewMessageType
			const { type, payload } = parsedEvent
			console.log(type, payload)
			if (type === 'scroll') {
				console.log('scroll', payload)
				if (readingProgress.bookProgress === payload.progress) return
				setScrollPosition(payload.scrollTop)
				setReadingProgress({
					bookProgress: payload.progress,
					chapterProgress: payload.currentChapterProgress
				})
			}
			if (type === 'finishBook' && !finishReadingLoading) {
				await finishReading(id).then(() => {
					setReadingProgress({
						bookProgress: 1,
						chapterProgress: 0.1
					})
					setScrollPosition(0.1)
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
		[readingProgress]
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

	// eslint-disable-next-line  react/hook-use-state
	const [defaultProperties] = useState({
		defaultTheme: styleTag,
		scrollPosition: scrollPosition
	})

	const changeChapter = useCallback((link: string) => {
		console.log('changeChapter', link)
		viewerReference.current?.injectJavaScript(
			`
			window.location.hash = '${link}'
			`
		)
	}, [])

	const value = {
		colorScheme,
		styleTag,
		onMessage,
		progress: {
			bookProgress: readingProgress.bookProgress,
			chapterProgress: readingProgress.chapterProgress
		},
		reference: viewerReference,
		changeChapter,
		defaultProperties,
		lineHeight,
		padding,
		font,
		fontSize
	}
	return (
		<ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
	)
}

export const useReader = () => {
	const context = useContext(ReaderContext)
	if (!context) {
		throw new Error('useReading must be used within a ReadingProvider')
	}
	return context
}
