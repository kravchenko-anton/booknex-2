import api from '@/api'

import { useTypedNavigation } from '@/hooks'
import { useFinishBook } from '@/screens/reading/hooks/useFinishBook'
import { useModalReference } from '@/screens/reading/hooks/useModalReference'
import { useReaderLoading } from '@/screens/reading/hooks/useReaderLoading'
import { useReaderMessage } from '@/screens/reading/hooks/useReaderMessage'
import { useReadingProgress } from '@/screens/reading/hooks/useReadingProgress'
import {
	getStyleTag,
	injectStyle
} from '@/screens/reading/scripts/styles-injection'
import { useCustomizationStore } from '@/screens/reading/store/customization-store'
import { useReactionsStore } from '@/screens/reading/store/reader-store'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useEffect, useRef, useState } from 'react'
import type WebView from 'react-native-webview'

//TODO: переписать на mobx
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
		gcTime: 1000 * 60 * 60 * 24 * 365
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
	const { onMessage } = useReaderMessage({
		slug,
		finishReadingLoading,
		onFinishBookPress: onFinish,
		onContentLoadEnd: () => setReaderLoading(false),
		onScroll: updateReadingProgress
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
    	wrapQuotesInMarkTag(${JSON.stringify(reactions)});
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
