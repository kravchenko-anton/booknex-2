import api from '@/api'
import { useTypedSelector } from '@/hooks'
import { useFinishBook } from '@/screens/reading/features/finish-book/useFinishBook'
import { useReadingProgress } from '@/screens/reading/features/reader-progress/useReadingProgress'
import { useModalReference } from '@/screens/reading/hooks/useModalReference'
import { useReaderLoading } from '@/screens/reading/hooks/useReaderLoading'
import { useStatusBarStyle } from '@/screens/reading/hooks/useStatusBarStyle'
import { useStyleTag } from '@/screens/reading/hooks/useStyleTag'
import { useReaderMessage } from '@/screens/reading/reader-viewer/useReaderMessage'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useRef, useState } from 'react'
import type WebView from 'react-native-webview'

export const useReader = (slug: string) => {
	const { data: ebook } = useQuery({
		queryKey: QueryKeys.ebook.bySlug(slug),
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data,
		enabled: !!slug
	})

	const { colorScheme, ...restUiProperties } = useTypedSelector(
		state => state.readingUi
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
		readerLoading
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