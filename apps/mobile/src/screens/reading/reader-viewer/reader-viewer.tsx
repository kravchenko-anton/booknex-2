import { useReader } from '@/screens/reading/reader-context'
import { composeReaderViewHtml } from '@/screens/reading/reader-viewer/helpers/compose-html'
import { handleDoublePress } from '@/screens/reading/reader-viewer/helpers/handleDoublePress'
import { injectStyle } from '@/screens/reading/reader-viewer/helpers/styles-injection'
import { textSelection } from '@/screens/reading/reader-viewer/helpers/text-selection'
import { windowHeight, windowWidth } from '@/utils/dimensions'
import type { FunctionType } from 'global/types'
import { forwardRef, useEffect } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import WebView from 'react-native-webview'

export interface ReaderViewerProperties {
	readerUiVisible: boolean
	handleDoublePress: FunctionType
	file: string[]
	picture: string
	title: string
}

const ReaderViewer = forwardRef(
	(properties: ReaderViewerProperties, reference: any) => {
		const { defaultProperties, onMessage, styleTag, colorScheme } = useReader()

		useEffect(() => {
			reference.current?.injectJavaScript(`${injectStyle(styleTag)}`)
		}, [styleTag])

		if (!defaultProperties) return <View className='flex-1' />

		return (
			<View className='m-0 h-screen w-full flex-1 items-center justify-center p-0'>
				<TouchableWithoutFeedback
					onPress={() => handleDoublePress(properties.handleDoublePress)}>
					<WebView
						scrollEnabled
						javaScriptEnabled
						startInLoadingState
						ref={reference}
						originWhitelist={['*']}
						showsVerticalScrollIndicator={false}
						className='bottom-0 left-0 right-0 top-0 z-10 m-0 p-0'
						renderLoading={() => (
							<View
								className='h-screen w-screen'
								style={{
									backgroundColor: colorScheme.colorPalette.background.normal
								}}
							/>
						)}
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
							html: composeReaderViewHtml({
								defaultProperties: {
									scrollPosition: defaultProperties.scrollPosition,
									theme: defaultProperties.defaultTheme
								},
								file: properties.file,
								picture: properties.picture,
								title: properties.title
							})
						}}
						style={{
							width: windowWidth,
							height: windowHeight,
							backgroundColor: colorScheme.colorPalette.background.normal
						}}
						onMessage={onMessage}
						onCustomMenuSelection={async (event: never) => {
							await textSelection(
								event,
								reference?.current?.injectJavaScript(`
							document.getSelection().removeAllRanges()
						`)
							)
						}}
					/>
				</TouchableWithoutFeedback>
			</View>
		)
	}
)
export default ReaderViewer
