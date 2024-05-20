import { errorToast } from '@/utils/toast'
import type { WebViewMessageEvent } from 'react-native-webview'

export enum ReaderMessageType {
	Scroll = 'scroll',
	SelectionLimitFail = 'selection-limit-fail',
	FinishLoading = 'finish-loading',
	FinishBook = 'finishBook',
	SelectionWithExistingNote = 'selection-with-existing-note'
}
export interface WebviewMessageType {
	type: ReaderMessageType
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
		if (type === ReaderMessageType.FinishLoading) {
			console.log('Finish loading')
			onContentLoadEnd()
		}
		if (type === ReaderMessageType.SelectionLimitFail)
			errorToast('Selected text is too long')
		if (type === ReaderMessageType.Scroll)
			onScroll({
				scrollTop: payload.scrollTop,
				progress: payload.progress,
				chapter: {
					chapterLink: payload.chapter.chapterLink,
					chapterProgress: payload.chapter.chapterProgress
				}
			})
		if (type === ReaderMessageType.FinishBook) {
			if (finishReadingLoading) return
			onFinishBookPress()
		}
	}

	return {
		onMessage
	}
}
