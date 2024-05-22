import type {
	QuoteAndNoteType,
	SelectionType
} from '@/screens/reading/hooks/useReader'
import { selectionKeys } from '@/screens/reading/scripts/text-select/text-select-menu'
import { share } from '@/utils/share-function'
import { errorToast } from '@/utils/toast'
import type { Dispatch, SetStateAction } from 'react'
import { Linking, NativeModules, Platform } from 'react-native'

const deviceLanguage =
	Platform.OS === 'ios'
		? NativeModules.SettingsManager.settings.AppleLocale // iOS
		: NativeModules.I18nManager.localeIdentifier // Android

export const textSElectionLimit = 1200

const textSelectionValidation = (selectedText: string) => {
	if (selectedText.length > textSElectionLimit)
		return errorToast('Selected text is too long')

	return true
}

export interface OnTextSelectionType {
	key: string
	activeSelectedContent: SelectionType
	setEbookQuotesAndNotes: Dispatch<SetStateAction<QuoteAndNoteType[]>>
	removeAllSelection: () => void
}

//TODO: добавить типизации
export const onTextSelection = async ({
	activeSelectedContent,
	setEbookQuotesAndNotes,
	key,
	removeAllSelection
}: OnTextSelectionType) => {
	if (key === selectionKeys.note) {
		if (!textSelectionValidation(activeSelectedContent.text)) return
		console.log(activeSelectedContent, 'create note')
		setEbookQuotesAndNotes(previous => [
			...previous,
			{
				type: 'note',
				text: activeSelectedContent.text,
				range: activeSelectedContent.range
			}
		])
	}

	if (key === selectionKeys.quote) {
		if (!textSelectionValidation(activeSelectedContent.text)) return
		console.log(activeSelectedContent, 'create quote')
		setEbookQuotesAndNotes(previous => [
			...previous,
			{
				type: 'quote',
				text: activeSelectedContent.text,
				range: activeSelectedContent.range
			}
		])
	}

	if (key === selectionKeys.share) {
		if (!textSelectionValidation(activeSelectedContent.text)) return
		await share(activeSelectedContent.text)
	}

	if (key === selectionKeys.translate) {
		if (!textSelectionValidation(activeSelectedContent.text)) return
		const link = `
		"https://translate.google.com/?sl=auto&tl=${deviceLanguage}&text=${activeSelectedContent.text}"
	`
		Linking.openURL(link)
	}
	return removeAllSelection
}
