import { onTextSelection } from '@/screens/reading/functions/on-text-selection'
import { composeReaderViewHtml } from '@/screens/reading/scripts/compose-html'
import { injectStyle } from '@/screens/reading/scripts/styles-injection'
import { selectTextMenu } from '@/screens/reading/utils/text-select-menu'
import type { ThemePackType } from '@/screens/reading/utils/theme-pack'
import { windowWidth } from '@/utils/dimensions'
import { doublePress } from '@/utils/handleDoublePress'
import type { FunctionType } from 'global/types'
import { forwardRef, useEffect } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import WebView, { type WebViewMessageEvent } from 'react-native-webview'

export interface ReaderViewerProperties {
	readerUiVisible: boolean
	handleDoublePress: FunctionType
	file: string[]
	picture: string
	title: string
	defaultProperties: {
		scrollPosition: number
		theme: string
	}
	styleTag: string
	colorScheme: ThemePackType
	onMessage: (event: WebViewMessageEvent) => Promise<void>
}

const ReaderViewer = forwardRef(
	(properties: ReaderViewerProperties, reference: any) => {
		const {
			defaultProperties,
			styleTag,
			handleDoublePress,
			colorScheme,
			title,
			onMessage,
			picture,
			file
		} = properties

		useEffect(() => {
			reference.current?.injectJavaScript(`${injectStyle(styleTag)}`)
		}, [styleTag])

		if (!defaultProperties) return <View className='flex-1' />
		return (
			<View className='m-0 h-screen w-screen flex-1 items-center justify-center p-0'>
				<TouchableWithoutFeedback onPress={doublePress(handleDoublePress)}>
					<WebView
						scrollEnabled
						javaScriptEnabled
						startInLoadingState
						ref={reference}
						originWhitelist={['*']}
						showsVerticalScrollIndicator={false}
						className='bottom-0 left-0 right-0 top-0 z-10 m-0 p-0'
						menuItems={selectTextMenu}
						renderLoading={() => (
							<View
								className='h-screen w-screen'
								style={{
									backgroundColor: colorScheme.colorPalette.background.normal
								}}
							/>
						)}
						source={{
							baseUrl: '',
							html: composeReaderViewHtml({
								defaultProperties,
								file,
								picture,
								title
							})
						}}
						style={{
							width: windowWidth,
							backgroundColor: colorScheme.colorPalette.background.normal
						}}
						onMessage={onMessage}
						onCustomMenuSelection={async (event: any) => {
							await onTextSelection(
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
