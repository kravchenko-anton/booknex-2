import { useTypedRoute } from '@/hooks'
import {
	handleDoublePress,
	injectStyle
} from '@/screens/reading/additional-function'
import ReadingUi from '@/screens/reading/settings/reading-ui'
import { useReader } from '@/screens/reading/useReader'
import { useReadingSheets } from '@/screens/reading/useReadingSheets'
import { bookService } from '@/services/book/book-service'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/dimensions'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import {
	View as RNView,
	StatusBar,
	TouchableWithoutFeedback
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { Color } from 'ui/colors'
import { Loader } from 'ui/components'

//TODO: оптимизировать тут всё
export function Reader() {
	const { params } = useTypedRoute<'Reader'>()
	const { data: ebook } = useQuery(['e-book', params.id], () =>
		bookService.ebookById(params.id)
	)
	const [readerUiVisible, setReaderUiVisible] = useState(true)
	const reference = useRef<WebView>(null)
	const {
		colorScheme,
		injectedJavaScriptBeforeLoad,
		onMessage,
		styleTag,
		progress
	} = useReader(params.id)

	const { openChapterList, openReadingSettings } = useReadingSheets({
		activeThemeSlug: colorScheme.slug
	})
	useEffect(() => {
		if (!reference.current) return
		reference.current.injectJavaScript(injectStyle(styleTag))
	}, [styleTag])

	const [defaultTheme] = useState(styleTag)
	if (!ebook || !injectedJavaScriptBeforeLoad || !styleTag) return <Loader />
	return (
		<SafeAreaView className='flex-1'>
			<RNView className='m-0 h-screen w-full items-center justify-center p-0'>
				<TouchableWithoutFeedback
					onPress={() =>
						handleDoublePress(() => setReaderUiVisible(!readerUiVisible))
					}
				>
					<WebView
						ref={reference}
						menuItems={[]}
						source={{
							html: `<head>
								<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
								<title>${ebook.title}</title>
								</head>
								<style>${defaultTheme}</style>
								${ebook.file}`
						}}
						originWhitelist={['*']}
						scrollEnabled
						javaScriptEnabled
						renderLoading={() => <Loader />}
						startInLoadingState
						showsVerticalScrollIndicator={false}
						injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeLoad}
						onMessage={onMessage}
						className='bottom-0 left-0 right-0 top-0 z-10 m-0 p-0'
						style={{
							width: WINDOW_WIDTH,
							height: WINDOW_HEIGHT,
							backgroundColor: Color.background
						}}
					/>
				</TouchableWithoutFeedback>
			</RNView>
			<ReadingUi
				openChapterList={() =>
					openChapterList({
						chapters: ebook.chapters,
						openChapter: (chapterId: string) =>
							reference.current?.injectJavaScript(
								`window.location.hash = '#${chapterId}'`
							)
					})
				}
				openReadingSettings={openReadingSettings}
				colorPalette={colorScheme.colorPalette}
				visible={readerUiVisible}
				progress={progress}
				title={ebook.title}
			/>

			<StatusBar hidden={true} />
		</SafeAreaView>
	)
}
