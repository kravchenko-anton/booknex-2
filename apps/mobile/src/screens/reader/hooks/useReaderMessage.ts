import type { reactionsTitles } from '@/screens/reader/feature/reactions/reactions'
import { share } from '@/utils/share-function'
import { errorToast } from '@/utils/toast'
import type { CreateReaction } from 'global/api-client'
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
	MarkClick = 'mark-click',
	Share = 'share',
	Translate = 'translate',
	Reaction = 'reaction'
}
export interface WebviewMessageType {
	type: ReaderMessageType
	payload: {
		id: string
		text: string
		range: {
			startOffset: number
			endOffset: number
			xpath: string
		}
		reaction: reactionsTitles
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
		payload: Pick<
			WebviewMessageType['payload'],
			'chapter' | 'progress' | 'scrollTop'
		>
	) => void
	slug: string
	onFinishBookPress: (slug: string) => void
	onContentLoadEnd: () => void
	createReaction: (data: CreateReaction) => void
	setActiveReactionPressed: (id: string) => void
}

export const useReaderMessage = ({
	onFinishBookPress,
	onContentLoadEnd,
	slug,
	onScroll,
	setActiveReactionPressed,
	createReaction
}: ReaderMessageProperties) => {
	const onMessage = async (event: WebViewMessageEvent) => {
		const parsedEvent = JSON.parse(event.nativeEvent.data) as WebviewMessageType
		const { type, payload } = parsedEvent
		// console.log('🔴', type, payload)
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
		if (type === ReaderMessageType.Reaction) {
			console.log('🚂', {
				bookSlug: slug,
				id: Math.random().toString(),
				createAt: new Date(),
				text: payload.text,
				range: {
					startOffset: payload.range.startOffset,
					endOffset: payload.range.endOffset,
					xpath: payload.range.xpath
				},
				reaction: payload.reaction
			})
			createReaction({
				startOffset: payload.range.startOffset,
				endOffset: payload.range.endOffset,
				xpath: payload.range.xpath,
				text: payload.text,
				type: payload.reaction,
				bookSlug: slug
			})
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
		if (type === ReaderMessageType.FinishBook) onFinishBookPress(slug)
		if (
			type === ReaderMessageType.MarkClick &&
			payload.id !== null &&
			payload.id !== undefined
		)
			setActiveReactionPressed(payload.id)
	}

	return {
		onMessage
	}
}
