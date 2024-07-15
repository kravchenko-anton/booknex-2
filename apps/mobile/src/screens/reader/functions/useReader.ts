import api from '@/api'

import { useTypedNavigation } from '@/hooks'
import { useCustomizationStore } from '@/screens/reader/components/reader-customization/customization-store'
import { useFinishBook } from '@/screens/reader/functions/useFinishBook'
import { useModalReference } from '@/screens/reader/functions/useModalReference'
import { useReactions } from '@/screens/reader/functions/useReactions'
import { useReaderMessage } from '@/screens/reader/functions/useReaderMessage'
import { useReadingProgress } from '@/screens/reader/functions/useReadingProgress/useReadingProgress'
import {
	getStyleTag,
	injectStyle
} from '@/screens/reader/injections/styles-injection'
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
		string | null
	>(null)
	const { colorScheme, ...restUiProperties } = useCustomizationStore(
		state => state
	)
	const { reactionBookList = [], createReaction } = useReactions(slug)

	const {
		data: ebook,
		isLoading: ebookRequestLoading,
		isRefetching: ebookRequestRefetching
	} = useQuery({
		queryKey: QueryKeys.ebook.bySlug(slug),
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data,
		enabled: !!slug,
		networkMode: 'offlineFirst',
		gcTime: Number.MAX_SAFE_INTEGER,
		staleTime: 0
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
				reactionBookList.find(reaction => reaction.id === id)?.id || null
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
	console.log(reactionBookList)
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
		ebookRequestRefetching,
		openModal,
		onMessage,
		reactionBookList,
		defaultProperties,
		styleTag
	}
}
