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

export type QuoteAndNoteType = {
	type: 'quote' | 'note'
	text: string
	range: {
		startOffset: number
		endOffset: number
	}
}

export type SelectionType = {
	text: string
	range: {
		startOffset: number
		endOffset: number
	}
	isOverlappingMark: boolean
}

export const useReader = (slug: string, initialScrollPosition: number) => {
	const { data: ebook, isLoading: ebookRequestLoading } = useQuery({
		queryKey: QueryKeys.ebook.bySlug(slug),
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data,
		enabled: !!slug,
		networkMode: 'offlineFirst',
		gcTime: 1000 * 60 * 60 * 24 * 365,
		staleTime: 1000 * 60 * 60 * 24 * 365
	})

	const [ebookQuotesAndNotes, setEbookQuotesAndNotes] = useState<
		QuoteAndNoteType[]
	>([])

	const [activeSelectedContent, setActiveSelectedContent] =
		useState<SelectionType>({
			text: '',
			range: {
				startOffset: 0,
				endOffset: 0
			},
			isOverlappingMark: false
		})
	const { loaderAnimation, setReaderLoading, readerLoading } =
		useReaderLoading()
	const { colorScheme, ...restUiProperties } = useCustomizationStore(
		state => state
	)
	const [readerHeaderVisible, setReaderHeaderVisible] = useState(false)
	const viewerReference = useRef<WebView>(null)

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

	const { openModal, modalRefs } = useModalReference(setReaderHeaderVisible, {
		onOpenModal: () =>
			viewerReference.current?.injectJavaScript(
				`window.getSelection().removeAllRanges();`
			)
	})

	useStatusBarStyle({ colorScheme, readerUiVisible: readerHeaderVisible })
	const { onMessage } = useReaderMessage({
		finishReadingLoading,
		onFinishBookPress: onFinish,
		onContentLoadEnd: () => setReaderLoading(false),
		onScroll: updateReadingProgress,
		setActiveSelectedContent
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
