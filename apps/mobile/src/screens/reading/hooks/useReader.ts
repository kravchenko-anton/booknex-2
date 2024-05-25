import api from '@/api'

import { useFinishBook } from '@/screens/reading/hooks/useFinishBook'
import { useModalReference } from '@/screens/reading/hooks/useModalReference'
import { useReaderLoading } from '@/screens/reading/hooks/useReaderLoading'
import { useReaderMessage } from '@/screens/reading/hooks/useReaderMessage'
import { useReadingProgress } from '@/screens/reading/hooks/useReadingProgress'
import { useStatusBarStyle } from '@/screens/reading/hooks/useStatusBarStyle'
import { useStyleTag } from '@/screens/reading/hooks/useStyleTag'
import { useCustomizationStore } from '@/screens/reading/store/customization-store'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useRef, useState } from 'react'
import type WebView from 'react-native-webview'

export type SelectionType = {
	text: string
	range: {
		startOffset: number
		endOffset: number
		xpath: string
	}
	isOverlappingMark: boolean
}
//TODO: переписать на mobx
export const useReader = (slug: string, initialScrollPosition: number) => {
	const { setEbookQuotesAndNotes, ebookQuotesAndNotes } = {
		ebookQuotesAndNotes: [],
		setEbookQuotesAndNotes: () => null
	}
	const { data: ebook, isLoading: ebookRequestLoading } = useQuery({
		queryKey: QueryKeys.ebook.bySlug(slug),
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data,
		enabled: !!slug,
		networkMode: 'offlineFirst',
		gcTime: 1000 * 60 * 60 * 24 * 365
	})

	const { loaderAnimation, setReaderLoading, readerLoading } =
		useReaderLoading()
	const { colorScheme, ...restUiProperties } = useCustomizationStore(
		state => state
	)
	const [readerHeaderVisible, setReaderHeaderVisible] = useState(false)
	const viewerReference = useRef<WebView>(null)

	const [activeSelectedContent, setActiveSelectedContent] =
		useState<SelectionType>({
			text: '',
			range: {
				startOffset: 0,
				endOffset: 0,
				xpath: ''
			},
			isOverlappingMark: false
		})
	const {
		readingProgress,
		scrollPosition,
		updateReadingProgress,
		clearProgress
	} = useReadingProgress({
		slug,
		readerLoading,
		initialScrollPosition: initialScrollPosition
	})

	const { finishReadingLoading, onFinish } = useFinishBook({
		slug,
		onFinishComplete: clearProgress
	})
	const { onMessage } = useReaderMessage({
		finishReadingLoading,
		onFinishBookPress: onFinish,
		onContentLoadEnd: () => setReaderLoading(false),
		onScroll: updateReadingProgress,
		setActiveSelectedContent
	})

	const { openModal, modalRefs } = useModalReference(setReaderHeaderVisible, {
		onOpenModal: () =>
			viewerReference.current?.injectJavaScript(
				`window.getSelection().removeAllRanges();`
			)
	})

	useStatusBarStyle({
		colorScheme,
		isVisible: readerHeaderVisible && !readerLoading
	})

	const { defaultProperties, styleTag } = useStyleTag(
		{ colorScheme, ...restUiProperties },
		scrollPosition,
		ebookQuotesAndNotes
	)

	return {
		ebook,
		activeSelectedContent,
		readerLoading,
		loaderAnimation,
		readerHeaderVisible,
		colorScheme,
		viewerReference,
		setReaderHeaderVisible,
		modalRefs,
		ebookRequestLoading,
		readingProgress,
		ebookQuotesAndNotes,
		setEbookQuotesAndNotes,
		openModal,
		onMessage,
		defaultProperties,
		styleTag
	}
}
