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

export const useReader = (slug: string, initialScrollPosition: number) => {
	const [readingSessionKey] = useState(slug + Math.random() * 1000)

	const { data: ebook } = useQuery({
		queryKey: QueryKeys.ebook.bySlug(slug),
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data,
		enabled: !!slug,
		cacheTime: 0,
		staleTime: 0
	})

	const { colorScheme, ...restUiProperties } = useCustomizationStore(
		state => state
	)
	const [readerHeaderVisible, setReaderHeaderVisible] = useState(false)
	const viewerReference = useRef<WebView>(null)

	const { loaderAnimation, setReaderLoading, readerLoading } =
		useReaderLoading()

	const {
		readingProgress,
		scrollPosition,
		updateReadingProgress,
		clearProgress
	} = useReadingProgress({
		slug,
		readerLoading,
		initialScrollPosition: initialScrollPosition,
		readingSessionKey
	})

	const { finishReadingLoading, onFinish } = useFinishBook({
		slug,
		onFinishComplete: clearProgress
	})

	const { chaptersListModalReference, readingSettingsModalReference } =
		useModalReference(setReaderHeaderVisible)

	useStatusBarStyle({ colorScheme, readerUiVisible: readerHeaderVisible })
	const { onMessage } = useReaderMessage({
		finishReadingLoading,
		onFinishBookPress: onFinish,
		onContentLoadEnd: () => setReaderLoading(false),
		onScroll: updateReadingProgress
	})

	const { defaultProperties, styleTag } = useStyleTag(
		{ colorScheme, ...restUiProperties },
		scrollPosition
	)

	return {
		ebook,
		readerLoading,
		loaderAnimation,
		readerHeaderVisible,
		colorScheme,
		viewerReference,
		setReaderHeaderVisible,
		readingProgress,
		chaptersListModalReference,
		readingSettingsModalReference,
		onMessage,
		defaultProperties,
		styleTag
	}
}
