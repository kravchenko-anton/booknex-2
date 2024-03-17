import { useReader } from '@/screens/reading/reader-context'
import {
	handleDoublePress,
	scrollProgressDetect,
	ViewerHtml
} from '@/screens/reading/reader-viewer/reader-viewer.function'
import { windowHeight, windowWidth } from '@/utils/dimensions'
import { share } from '@/utils/share-function'
import { errorToast } from '@/utils/toast'
import Clipboard from '@react-native-clipboard/clipboard'
import { Color } from 'global/colors'
import type { FunctionType } from 'global/types'
import type { FC } from 'react'
import { Linking, TouchableWithoutFeedback, View } from 'react-native'
import WebView from 'react-native-webview'

export interface ReaderViewerProperties {
	readerUiVisible: boolean
	handleDoublePress: FunctionType
	file: string[]
	picture: string
	title: string
}

const textSelectionValidation = (selectedText: string) => {
	if (selectedText.length < 3) return errorToast('Select more text')
	if (selectedText.length > 800) return errorToast('Select less text')
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
					className='bottom-0 left-0 right-0 top-0 z-10 m-0 p-0'
					menuItems={[
						{ label: 'Copy', key: 'copy' },
						{
							label: 'Share',
							key: 'share'
						},
						{ label: 'Translate', key: 'Translate' }
					]}
					source={{
						baseUrl: '',
						html: ViewerHtml({
							defaultTheme,
							file: properties.file,
							picture: properties.picture,
							title: properties.title
						})
					}}
					injectedJavaScriptBeforeContentLoaded={`
						${scrollProgressDetect}
						`}
					style={{
						width: windowWidth,
						height: windowHeight,
						backgroundColor: Color.background
					}}
					onMessage={onMessage}
					onCustomMenuSelection={event => {
						if (event.nativeEvent.key === 'copy') {
							textSelectionValidation(event.nativeEvent.selectedText)
							console.log('Copy', event.nativeEvent.selectedText)
							Clipboard.setString(event.nativeEvent.selectedText)
						}
						if (event.nativeEvent.key === 'share') {
							textSelectionValidation(event.nativeEvent.selectedText)
							share(event.nativeEvent.selectedText)
						}
						if (event.nativeEvent.key === 'Translate') {
							textSelectionValidation(event.nativeEvent.selectedText)
							Linking.openURL(
								`https://translate.google.com/?sl=auto&text=${event.nativeEvent.selectedText}&op=translate`
							)
						}
						return reference.current?.injectJavaScript(`
							window.getSelection().removeAllRanges()
						`)
					}}
					onLayout={() => {
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
