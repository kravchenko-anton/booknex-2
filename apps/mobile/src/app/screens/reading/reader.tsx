import { useTypedRoute } from '@/hooks'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {
	beforeLoad,
	insertStyle,
	scrollProgressDetect
} from '@/screens/reading/additional-function'
import ReadingUi from '@/screens/reading/settings/reading-ui'
import { useReader } from '@/screens/reading/useReader'
import { bookService } from '@/services/book/book-service'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/dimensions'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import {
	View as RNView,
	StatusBar,
	TouchableWithoutFeedback
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { Loader } from 'ui/components'

export function Reader() {
	const { params } = useTypedRoute<'Reader'>()
	const WebViewReference = useRef<WebView>(null)
	const { data: ebook } = useQuery(['e-book', params.id], () =>
		bookService.ebookById(params.id)
	)
	const { books } = useTypedSelector(state => state.readingSettings)
	const { styleTag, colorScheme, doubleTap, onMessage } = useReader(ebook.title)
	useEffect(() => {
		if (!WebViewReference.current) return
		WebViewReference.current.injectJavaScript(insertStyle(styleTag))
	}, [styleTag])
	if (!ebook || !styleTag) return <Loader />
	return (
		<SafeAreaView className='flex-1'>
			<GestureHandlerRootView className='m-0 h-screen w-screen p-0 pb-6'>
				<StatusBar hidden={true} />
				<RNView className='m-0 h-screen w-full items-center justify-center p-0'>
					<TouchableWithoutFeedback onPress={doubleTap}>
						<WebView
							menuItems={[]}
							showsVerticalScrollIndicator={false}
							javaScriptEnabled
							ref={WebViewReference}
							source={{
								html: `
								<head>
								<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
								<title>
								${ebook.title}
								</title>
								</head>
								${ebook.file}
								`
							}}
							originWhitelist={['*']}
							scrollEnabled={true}
							injectedJavaScript={scrollProgressDetect()}
							injectedJavaScriptBeforeContentLoaded={beforeLoad(
								styleTag,
								Math.round(
									books?.find(book => book.title === ebook.title)?.lastProgress
										.location || 0
								)
							)}
							onMessage={onMessage}
							allowUniversalAccessFromFileURLs
							allowFileAccessFromFileURLs
							allowFileAccess
							style={{
								width: WINDOW_WIDTH,
								backgroundColor: colorScheme.colorPalette.background.normal,
								height: WINDOW_HEIGHT,
								zIndex: 1,
								padding: 0,
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								margin: 0
							}}
						/>
					</TouchableWithoutFeedback>
				</RNView>
				<ReadingUi title={ebook.title} />
			</GestureHandlerRootView>
		</SafeAreaView>
	)
}
