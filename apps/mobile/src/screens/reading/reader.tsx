import {
	beforeLoad,
	finishBookButton,
	handleDoublePress,
	scrollProgressDetect
} from '@/screens/reading/helpers/book-viewer-function'
import ReaderUi from '@/screens/reading/ui/reader-ui'
import { useReading } from '@/screens/reading/useReading'

import { Loader } from '@/ui'
import { windowHeight, windowWidth } from '@/utils/dimensions'
import { getFileUrl } from 'global/api-config'
import { Color } from 'global/colors'
import { memo } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

//TODO: переделать реадер на контекст и сделать его в 100 раз красивее
const Reader = () => {
	const {
		colorScheme,
		onMessage,
		styleTag,
		progress,
		initialScroll,
		readerUiVisible,
		reference,
		defaultTheme,
		ebook,
		setReaderUiVisible
	} = useReading()

	if (!ebook || !styleTag) return <Loader />
	return (
		<SafeAreaView className='flex-1'>
			<View className='m-0 h-screen w-full items-center justify-center p-0'>
				<TouchableWithoutFeedback
					onPress={() =>
						handleDoublePress(() => setReaderUiVisible(!readerUiVisible))
					}
				>
					<WebView
						scrollEnabled
						javaScriptEnabled
						startInLoadingState
						ref={reference}
						menuItems={[]}
						originWhitelist={['*']}
						renderLoading={() => <View className='h-screen w-screen' />}
						showsVerticalScrollIndicator={false}
						className='bottom-0 left-0 right-0 top-0  z-10 m-0 p-0'
						source={{
							html: `
									<head>
										<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
										<title>${ebook.title}</title>
									</head>
									<style>${defaultTheme}</style>
									<div>
										<img style='width:100%; height: 300px; object-fit: contain; object-position: center; padding-top: 40px'
											 src="${getFileUrl(ebook.picture)}" alt="${ebook.title}" />
										<h1>${ebook.title}</h1>
									</div>
									${ebook.file}
									${finishBookButton}
								`
						}}
						injectedJavaScriptBeforeContentLoaded={`
						${beforeLoad(Number(initialScroll))}
						${scrollProgressDetect}
						`}
						style={{
							width: windowWidth,
							height: windowHeight,
							backgroundColor: Color.background
						}}
						onMessage={onMessage}
					/>
				</TouchableWithoutFeedback>
			</View>
			<ReaderUi
				visible={readerUiVisible}
				chapters={ebook.chapters}
				progress={progress}
				title={ebook.title}
				colorPalette={colorScheme.colorPalette}
				onChapterPress={chapterId =>
					reference.current?.injectJavaScript(
						`window.location.hash = '${chapterId}'`
					)
				}
			/>
		</SafeAreaView>
	)
}

export default memo(Reader)
