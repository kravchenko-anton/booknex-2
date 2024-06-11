import api from '@/api'

import { useTypedNavigation } from '@/hooks'
import { useFinishBook } from '@/screens/reader/feature/finish-book/useFinishBook'
import { useCustomizationStore } from '@/screens/reader/feature/modals/reader-customization/customization-store'
import { useModalReference } from '@/screens/reader/feature/modals/useModalReference'
import { useReactions } from '@/screens/reader/feature/reactions/useReactions'
import { useReadingProgress } from '@/screens/reader/feature/reading-progress/useReadingProgress'
import { useReaderMessage } from '@/screens/reader/hooks/useReaderMessage'
import {
	getStyleTag,
	injectStyle
} from '@/screens/reader/scripts/styles-injection'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useEffect, useRef, useState } from 'react'
import type WebView from 'react-native-webview'

export const useReader = (slug: string, initialScrollPosition: number) => {
	const { setOptions } = useTypedNavigation()
	const [readerLoading, setReaderLoading] = useState(true)
	const [readerHeaderVisible, setReaderHeaderVisible] = useState(false)
	const viewerReference = useRef<WebView>(null)
	const [activeReactionPressedId, setActiveReactionPressedId] = useState<
		number | null
	>(null)
	const { colorScheme, ...restUiProperties } = useCustomizationStore(
		state => state
	)
	const { reactionBookList = [], createReaction } = useReactions(slug)

	const { data: ebook, isLoading: ebookRequestLoading } = useQuery({
		queryKey: QueryKeys.ebook.bySlug(slug),
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data,
		enabled: !!slug,
		networkMode: 'offlineFirst',
		gcTime: Number.MAX_SAFE_INTEGER,
		staleTime: Number.MAX_SAFE_INTEGER
	})

	const {
		readingProgress,
		scrollPosition,
		updateReadingProgress,
		clearProgress
	} = useReadingProgress({ slug, readerLoading, initialScrollPosition })

	const { onFinish } = useFinishBook(clearProgress)
	const { openModal, modalRefs, reactionModal } = useModalReference(
		setReaderHeaderVisible,
		{
			onOpenModal: () =>
				viewerReference.current?.injectJavaScript(`removeAllTextSelection()`)
		}
	)

	const { onMessage } = useReaderMessage({
		slug,
		onFinishBookPress: onFinish,
		onContentLoadEnd: () => setReaderLoading(false),
		onScroll: updateReadingProgress,
		createReaction: createReaction,
		setActiveReactionPressed: id => {
			setActiveReactionPressedId(
				reactionBookList.find(reaction => Number(reaction.id) === Number(id))
					?.id || null
			)
			reactionModal.open()
		}
	})

	const styleTag = getStyleTag({ colorScheme, ...restUiProperties })
	// eslint-disable-next-line
	const [defaultProperties] = useState({
		scrollPosition,
		theme: styleTag,
		reactions: reactionBookList
	})
	useEffect(() => {
		setOptions({
			statusBarStyle: colorScheme.statusBar,
			navigationBarColor: colorScheme.colorPalette.background.darker,
			navigationBarHidden: true,
			statusBarTranslucent: true,
			statusBarHidden: !readerHeaderVisible,
			statusBarColor: colorScheme.colorPalette.background.darker
		})
	}, [colorScheme, setOptions, readerHeaderVisible])

	useEffect(() => {
		viewerReference.current?.injectJavaScript(`${injectStyle(styleTag)}`)
	}, [styleTag])

	useEffect(() => {
		viewerReference.current?.injectJavaScript(`
    	wrapReactionsInMarkTag(${JSON.stringify(reactionBookList)});
    `)
	}, [reactionBookList, createReaction])

	return {
		ebook,
		readerLoading,
		readerHeaderVisible,
		colorScheme,
		viewerReference,
		setReaderHeaderVisible,
		modalRefs,
		activeReactionPressedId,
		ebookRequestLoading,
		readingProgress,
		openModal,
		onMessage,
		reactionBookList,
		defaultProperties,
		styleTag
	}
}
