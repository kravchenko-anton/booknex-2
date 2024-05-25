import type { SelectionType } from '@/screens/reading/hooks/useReader'
import { errorToast } from '@/utils/toast'
import type { WebViewMessageEvent } from 'react-native-webview'

export enum ReaderMessageType {
	Scroll = 'scroll',
	SelectionLimitFail = 'selection-limit-fail',
	FinishLoading = 'finish-loading',
	FinishBook = 'finishBook',
	selectText = 'selectText'
}
export interface WebviewMessageType {
	type: ReaderMessageType
	payload: SelectionType & {
		scrollTop: number
		progress: number
		chapter: {
			chapterId: number
			chapterLink: string
			chapterProgress: number
		}
	}
}

export interface ReaderMessageProperties {
	onScroll: (
		payload: Omit<
			WebviewMessageType['payload'],
			'text' | 'isOverlappingMark' | 'range'
		>
	) => void
	finishReadingLoading: boolean
	onFinishBookPress: () => void
	onContentLoadEnd: () => void
	setActiveSelectedContent: (content: SelectionType) => void
}

export const useReaderMessage = ({
	onFinishBookPress,
	onContentLoadEnd,
	setActiveSelectedContent,
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
					chapterId: payload.chapter.chapterId,
					chapterLink: payload.chapter.chapterLink,
					chapterProgress: payload.chapter.chapterProgress
				}
			})
		if (type === ReaderMessageType.FinishBook) {
			if (finishReadingLoading) return
			onFinishBookPress()
		}
		if (type === ReaderMessageType.selectText) {
			setActiveSelectedContent({
				range: payload.range,
				text: payload.text,
				isOverlappingMark: payload.isOverlappingMark
			})
		}
	}

	return {
		onMessage
	}
}
