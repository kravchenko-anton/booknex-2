import {
	beforeLoad,
	finishBookButton,
	handleDoublePress,
	scrollProgressDetect
} from '@/screens/reading/reader-viewer/reader-viewer-function'
import { useReading } from '@/screens/reading/reading-context'
import { windowHeight, windowWidth } from '@/utils/dimensions'
import { getFileUrl } from 'global/api-config'
import { Color } from 'global/colors'
import type { FunctionType } from 'global/types'
import { forwardRef } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import WebView from 'react-native-webview'

export interface ReaderViewerProperties {
	readerUiVisible: boolean
	handleDoublePress: FunctionType
	initialScroll: number
	onMessage: (event: any) => void
}

const ReaderViewer = forwardRef<WebView, ReaderViewerProperties>(
	(properties, reference) => {
		const { ebook, defaultTheme } = useReading()
		if (!ebook || !defaultTheme) return <View />
		return (
			<View className='m-0 h-screen w-full items-center justify-center p-0'>
				<TouchableWithoutFeedback
					onPress={() => handleDoublePress(properties.handleDoublePress)}
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
						${beforeLoad(Number(properties.initialScroll))}
						${scrollProgressDetect}
						`}
						style={{
							width: windowWidth,
							height: windowHeight,
							backgroundColor: Color.background
						}}
						onMessage={properties.onMessage}
					/>
				</TouchableWithoutFeedback>
			</View>
		)
	}
)

export default ReaderViewer
