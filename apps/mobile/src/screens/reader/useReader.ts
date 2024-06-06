import api from '@/api'

import { useTypedNavigation } from '@/hooks'
import { useFinishBook } from '@/screens/reader/hooks/useFinishBook'
import { useModalReference } from '@/screens/reader/hooks/useModalReference'
import { useReactions } from '@/screens/reader/hooks/useReactions'
import { useReaderLoading } from '@/screens/reader/hooks/useReaderLoading'
import { useReaderMessage } from '@/screens/reader/hooks/useReaderMessage'
import { useReadingProgress } from '@/screens/reader/hooks/useReadingProgress'
import {
	getStyleTag,
	injectStyle
} from '@/screens/reader/scripts/styles-injection'
import { useCustomizationStore } from '@/screens/reader/store/customization-store'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useEffect, useRef, useState } from 'react'
import type WebView from 'react-native-webview'

//TODO: переписать на mobx
export const useReader = (slug: string, initialScrollPosition: number) => {
	const { setOptions, navigate } = useTypedNavigation()
	const { data: ebook, isLoading: ebookRequestLoading } = useQuery({
		queryKey: QueryKeys.ebook.bySlug(slug),
		queryFn: () => api.ebook.ebookBySlug(slug),
		select: data => data.data,
		enabled: !!slug,
		networkMode: 'offlineFirst',
		gcTime: 1000 * 60 * 60 * 24 * 365
	})
	const {
		removeReaction,
		removeReactionLoading,
		createReactionLoading,
		reactionBookListLoading,
		reactionBookList = [],
		createReaction
	} = useReactions(slug)

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
		onFinishComplete: () => {
			clearProgress()
			navigate('BookReview', {
				slug
			})
		}
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
		reactions: reactionBookList?.map(
			({ endOffset, startOffset, xpath, ...rest }) => ({
				...rest,
				range: {
					startOffset,
					endOffset,
					xpath
				}
			})
		)
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
		if (reactionBookList.length === 0) return
		viewerReference.current?.injectJavaScript(`
    	wrapReactionsInMarkTag(${JSON.stringify(
				reactionBookList?.map(({ endOffset, startOffset, xpath, ...rest }) => ({
					...rest,
					range: {
						startOffset,
						endOffset,
						xpath
					}
				}))
			)});
    `)
	}, [reactionBookList])

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

		openModal,
		onMessage,
		defaultProperties,
		styleTag
	}
}
