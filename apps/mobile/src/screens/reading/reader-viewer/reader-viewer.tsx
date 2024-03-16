import { useReader } from '@/screens/reading/reader-context'
import {
	handleDoublePress,
	onTextSelectDisplayContextMenu,
	scrollProgressDetect,
	ViewerHtml
} from '@/screens/reading/reader-viewer/reader-viewer.function'
import { windowHeight, windowWidth } from '@/utils/dimensions'
import { Color } from 'global/colors'
import type { FunctionType } from 'global/types'
import type { FC } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import WebView from 'react-native-webview'

export interface ReaderViewerProperties {
	readerUiVisible: boolean
	handleDoublePress: FunctionType
	file: string[]
	picture: string
	title: string
}

const ReaderViewer: FC<ReaderViewerProperties> = properties => {
	const { defaultTheme, initialScroll, onMessage, reference } = useReader()
	if (!defaultTheme) return <View />

	return (
		<View className='m-0 h-screen w-full items-center justify-center p-0'>
			<TouchableWithoutFeedback
				onPress={() => handleDoublePress(properties.handleDoublePress)}
			>
				<WebView
					scrollEnabled
					javaScriptEnabled
					startInLoadingState
					injectedJavaScriptForMainFrameOnly
					ref={reference}
					originWhitelist={['*']}
					renderLoading={() => <View className='h-screen w-screen' />}
					showsVerticalScrollIndicator={false}
					className='bottom-0 left-0 right-0 top-0  z-10 m-0 p-0'
					menuItems={[]}
					source={{
						html: ViewerHtml({
							defaultTheme,
							file: properties.file,
							picture: properties.picture,
							title: properties.title
						})
					}}
					injectedJavaScriptBeforeContentLoaded={`
						${scrollProgressDetect}
						${onTextSelectDisplayContextMenu}
						`}
					style={{
						width: windowWidth,
						height: windowHeight,
						backgroundColor: Color.background
					}}
					onMessage={onMessage}
					onLayout={() => {
						// Need to always scroll to the last position
						reference.current?.injectJavaScript(
							`window.scrollTo({ top: ${initialScroll} })`
						)
					}}
				/>
			</TouchableWithoutFeedback>
		</View>
	)
}
export default ReaderViewer
