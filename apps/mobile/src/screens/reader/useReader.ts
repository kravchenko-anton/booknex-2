import api from '@/api'

import { useTypedNavigation } from '@/hooks'
import { useFinishBook } from '@/screens/reader/hooks/useFinishBook'
import { useModalReference } from '@/screens/reader/hooks/useModalReference'
import { useReaderLoading } from '@/screens/reader/hooks/useReaderLoading'
import { useReaderMessage } from '@/screens/reader/hooks/useReaderMessage'
import { useReadingProgress } from '@/screens/reader/hooks/useReadingProgress'
import {
	getStyleTag,
	injectStyle
} from '@/screens/reader/scripts/styles-injection'
import { useCustomizationStore } from '@/screens/reader/store/customization-store'
import { useReactionsStore } from '@/screens/reader/store/reader-store'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useEffect, useRef, useState } from 'react'
import type WebView from 'react-native-webview'

export const useReader = (slug: string, initialScrollPosition: number) => {
	const { setOptions } = useTypedNavigation()
	const { newReaction, reactions } = useReactionsStore(state => ({
		reactions: state.reactions.filter(reaction => reaction.bookSlug === slug),
		newReaction: state.newReaction
	}))
	const { data: ebook, isLoading: ebookRequestLoading } = useQuery({
		queryKey: QueryKeys.ebook.bySlug(slug),
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data,
		enabled: !!slug,
		networkMode: 'offlineFirst',
		gcTime: Number.MAX_SAFE_INTEGER,
		staleTime: Number.MAX_SAFE_INTEGER
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
		onFinishComplete: clearProgress
	})
	const { onMessage } = useReaderMessage({
		slug,
		finishReadingLoading,
		onFinishBookPress: onFinish,
		onContentLoadEnd: () => setReaderLoading(false),
		onScroll: updateReadingProgress,
		createReaction: newReaction
	})

	const { openModal, modalRefs } = useModalReference(setReaderHeaderVisible, {
		onOpenModal: () =>
			viewerReference.current?.injectJavaScript(
				`window.getSelection().removeAllRanges();`
			)
	})

	const styleTag = getStyleTag({
		colorPalette: colorScheme.colorPalette,
		fontFamily: restUiProperties.font.fontFamily,
		fontSize: restUiProperties.fontSize,
		lineHeight: restUiProperties.lineHeight,
		padding: restUiProperties.padding
	})

	// eslint-disable-next-line
	const [defaultProperties] = useState({
		scrollPosition,
		theme: styleTag,
		reactions: reactions
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
    	wrapReactionsInMarkTag(${JSON.stringify(reactions)});
    `)
	}, [reactions, newReaction])

	return {
		ebook,
		readerLoading,
		loaderAnimation,
		readerHeaderVisible,
		colorScheme,
		viewerReference,
		setReaderHeaderVisible,
		modalRefs,
		ebookRequestLoading,
		readingProgress,
		reactions,
		newReaction,
		openModal,
		onMessage,
		defaultProperties,
		styleTag
	}
}
