import type {
	QuoteAndNoteType,
	SelectionType
} from '@/screens/reading/hooks/useReader'
import type { ThemePackType } from '@/screens/reading/reader-customization/theme-pack'
import { composeReaderViewHtml } from '@/screens/reading/scripts/compose-html'
import { injectStyle } from '@/screens/reading/scripts/styles-injection'
import { onTextSelection } from '@/screens/reading/scripts/text-select/on-text-selection'
import { selectTextMenu } from '@/screens/reading/scripts/text-select/text-select-menu'
import { windowWidth } from '@/utils/dimensions'
import { doublePress } from '@/utils/handleDoublePress'
import type { FunctionType } from 'global/types'
import {
	forwardRef,
	useEffect,
	type Dispatch,
	type SetStateAction
} from 'react'
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
		ebookQuotesAndNotes: QuoteAndNoteType[]
	}
	setEbookQuotesAndNotes: Dispatch<SetStateAction<QuoteAndNoteType[]>>
	ebookQuotesAndNotes: QuoteAndNoteType[]
	styleTag: string
	colorScheme: ThemePackType
	activeSelectedContent: SelectionType
	onMessage: (event: WebViewMessageEvent) => Promise<void>
}

const ReaderViewer = forwardRef(
	(properties: ReaderViewerProperties, reference: any) => {
		const {
			defaultProperties,
			styleTag,
			activeSelectedContent,
			handleDoublePress,
			colorScheme,
			ebookQuotesAndNotes,
			setEbookQuotesAndNotes,
			title,
			onMessage,
			picture,
			file
		} = properties
		useEffect(() => {
			reference.current?.injectJavaScript(`${injectStyle(styleTag)}`)
		}, [styleTag])

		useEffect(() => {
			console.log('ebookQuotesAndNotes changed', ebookQuotesAndNotes)
			reference.current?.injectJavaScript(`
    	wrapTextWithBoldTag(${JSON.stringify(ebookQuotesAndNotes)});
    `)
		}, [ebookQuotesAndNotes])

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
						decelerationRate='normal'
						renderLoading={() => (
							<View
								className='h-screen w-screen'
								style={{
									backgroundColor: colorScheme.colorPalette.background.normal
								}}
							/>
						)}
						// prevent fast scroll in webview
						menuItems={selectTextMenu(!activeSelectedContent.isOverlappingMark)}
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
						onCustomMenuSelection={async event => {
							// check if activeSelectedContent is not null and equal to the selected text from event
							if (
								activeSelectedContent.text !== '' &&
								activeSelectedContent.text === event.nativeEvent.selectedText
							) {
								await onTextSelection({
									activeSelectedContent,
									setEbookQuotesAndNotes,
									removeAllSelection: reference?.current?.injectJavaScript(`
							document.getSelection().removeAllRanges()
						`),
									key: event.nativeEvent.key
								})
							}
						}}
					/>
				</TouchableWithoutFeedback>
			</View>
		)
	}
)
export default ReaderViewer
