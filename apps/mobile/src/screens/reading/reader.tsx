import {
	beforeLoad,
	finishBookButton,
	handleDoublePress,
	injectStyle,
	scrollProgressDetect
} from '@/features/reader/book-viewer-function'
import { useReadingSheets } from '@/features/reader/sheets/useReadingSheets'
import { useReading } from '@/features/reader/useReading'
import ReadingUi from '@/screens/reading/reading-ui'
import { bookService } from '@/shared/api/services'
import { useTypedRoute } from '@/shared/hooks'
import { Loader } from '@/shared/ui'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/shared/utils/dimensions'
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import React, { memo, useEffect, useRef, useState } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

//TODO: оптимизировать тут всё
function Reader() {
	const { params } = useTypedRoute<'Reader'>()
	const { data: ebook } = useQuery({
		queryKey: ['e-books', +params.id],
		queryFn: () => bookService.ebookById(+params.id)
	})
	const [readerUiVisible, setReaderUiVisible] = useState(true)
	const reference = useRef<WebView>(null)

	const { openReadingSettings, openChapterList } = useReadingSheets()
	const { colorScheme, onMessage, styleTag, progress, initialScroll } =
		useReading(+params.id)

	useEffect(() => {
		if (!reference.current) return
		reference.current.injectJavaScript(injectStyle(styleTag))
	}, [styleTag])

	const [defaultTheme] = useState(styleTag)

	if (!ebook || !styleTag) return <Loader />
	console.log(ebook.file)
	return (
		<SafeAreaView className='flex-1'>
			<View className='m-0 h-screen w-full items-center justify-center p-0'>
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
							${ebook.file}
							${finishBookButton}
							`
						}}
						originWhitelist={['*']}
						scrollEnabled
						javaScriptEnabled
						startInLoadingState
						renderLoading={() => <View className='h-screen w-screen' />}
						showsVerticalScrollIndicator={false}
						injectedJavaScriptBeforeContentLoaded={`
						${beforeLoad(initialScroll)}
						${scrollProgressDetect}
						`}
						onMessage={onMessage}
						className='bottom-0 left-0 right-0 top-0 z-10 m-0 p-0'
						style={{
							width: WINDOW_WIDTH,
							height: WINDOW_HEIGHT,
							backgroundColor: Color.background
						}}
					/>
				</TouchableWithoutFeedback>
			</View>
			<ReadingUi
				onSelectThemeIconPress={() => openReadingSettings()}
				onChapterIconPress={() =>
					openChapterList({
						chapters: ebook.chapters,
						openChapter: (chapterId: string) =>
							reference.current?.injectJavaScript(
								`window.location.hash = '${chapterId}'`
							)
					})
				}
				colorPalette={colorScheme.colorPalette}
				visible={readerUiVisible}
				progress={progress}
				title={ebook.title}
			/>
		</SafeAreaView>
	)
}

export default memo(Reader)
