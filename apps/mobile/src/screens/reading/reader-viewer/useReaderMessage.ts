import type { WebViewMessageEvent } from 'react-native-webview'

export interface WebviewMessageType {
	type:
		| 'scroll'
		| 'finishBook'
		| 'textSelect'
		| 'textSelectFail'
		| 'finish-loading'
	payload: {
		scrollTop: number
		progress: number
		chapter: {
			chapterLink: string
			chapterProgress: number
		}
	}
}

export interface ReaderMessageProperties {
	onScroll: (payload: WebviewMessageType['payload']) => void
	finishReadingLoading: boolean
	onFinishBookPress: () => void
	onContentLoadEnd: () => void
}

export const useReaderMessage = ({
	onFinishBookPress,
	onContentLoadEnd,
	onScroll,
	finishReadingLoading
}: ReaderMessageProperties) => {
	const onMessage = async (event: WebViewMessageEvent) => {
		const parsedEvent = JSON.parse(event.nativeEvent.data) as WebviewMessageType
		const { type, payload } = parsedEvent
		console.log(type, payload)
		if (type === 'finish-loading') onContentLoadEnd()
		if (type === 'scroll')
			onScroll({
				scrollTop: payload.scrollTop,
				progress: payload.progress,
				chapter: {
					chapterLink: payload.chapter.chapterLink,
					chapterProgress: payload.chapter.chapterProgress
				}
			})
		if (type === 'finishBook') {
			if (finishReadingLoading) return
			onFinishBookPress()
		}
	}

	return {
		onMessage
	}
}
