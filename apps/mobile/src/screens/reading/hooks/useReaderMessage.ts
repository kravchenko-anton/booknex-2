import { share } from '@/utils/share-function'
import { errorToast } from '@/utils/toast'
import { Linking, NativeModules, Platform } from 'react-native'
import type { WebViewMessageEvent } from 'react-native-webview'

const deviceLanguage =
	Platform.OS === 'ios'
		? NativeModules.SettingsManager.settings.AppleLocale // iOS
		: NativeModules.I18nManager.localeIdentifier // Android

export enum ReaderMessageType {
	Scroll = 'scroll',
	SelectionLimitFail = 'selection-limit-fail',
	FinishLoading = 'finish-loading',
	FinishBook = 'finishBook',
	Share = 'share',
	Translate = 'translate'
}
export interface WebviewMessageType {
	type: ReaderMessageType
	payload: {
		text: string
		scrollTop: number
		progress: number
		chapter: {
			chapterTitle: string
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
		if (type === ReaderMessageType.Share) {
			await share(payload.text)
		}
		if (type === ReaderMessageType.Translate) {
			const link = `https://translate.google.com/?sl=auto&tl=${deviceLanguage}&text=${payload.text}`
			console.log(link)
			await Linking.openURL(link)
		}
		if (type === ReaderMessageType.SelectionLimitFail)
			errorToast('Selected text is too long')
		if (type === ReaderMessageType.Scroll)
			onScroll({
				scrollTop: payload.scrollTop,
				progress: payload.progress,
				chapter: {
					chapterTitle: payload.chapter.chapterTitle,
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
