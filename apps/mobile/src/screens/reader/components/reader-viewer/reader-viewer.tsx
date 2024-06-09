import type { ThemePackType } from '@/screens/reader/feature/modals/reader-customization/theme-pack'
import { composeReaderViewHtml } from '@/screens/reader/scripts/compose-html'
import { windowWidth } from '@/utils/dimensions'
import { doublePress } from '@/utils/handleDoublePress'
import { useNetInfo } from '@react-native-community/netinfo'
import type { ReactionByBookOutput } from 'global/api-client'
import type { FunctionType } from 'global/types'
import { forwardRef } from 'react'
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
		reactions: ReactionByBookOutput[]
	}
	colorScheme: ThemePackType
	onMessage: (event: WebViewMessageEvent) => Promise<void>
}

const ReaderViewer = forwardRef(
	(properties: ReaderViewerProperties, reference: any) => {
		const {
			defaultProperties,
			handleDoublePress,
			colorScheme,
			title,
			onMessage,
			picture,
			file
		} = properties
		const { isConnected } = useNetInfo()
		if (!defaultProperties) return <View className='flex-1' />
		return (
			<View className='m-0 h-screen w-screen flex-1 items-center justify-center p-0'>
				<TouchableWithoutFeedback onPress={doublePress(handleDoublePress)}>
					<WebView
						scrollEnabled
						javaScriptEnabled
						mixedContentMode='compatibility'
						ref={reference}
						originWhitelist={['*']}
						showsVerticalScrollIndicator={false}
						className='bottom-0 left-0 right-0 top-0 z-10 m-0 p-0'
						menuItems={[]}
						decelerationRate='normal'
						// prevent fast scroll in webview
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
								title,
								isOnline: !!isConnected
							})
						}}
						style={{
							width: windowWidth,
							backgroundColor: colorScheme.colorPalette.background.normal
						}}
						onMessage={onMessage}
					/>
				</TouchableWithoutFeedback>
			</View>
		)
	}
)
export default ReaderViewer
