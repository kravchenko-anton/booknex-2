import { share } from '@/utils/share-function'
import { errorToast } from '@/utils/toast'
import Clipboard from '@react-native-clipboard/clipboard'
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

export const onTextSelection = async (event: any, removeAllSelection: void) => {
	if (event.nativeEvent.key === 'copy') {
		if (!event.nativeEvent.selectedText) return
		if (!textSelectionValidation(event.nativeEvent.selectedText)) return
		console.log('Copy', event.nativeEvent.selectedText)
		Clipboard.setString(event.nativeEvent.selectedText)
	}

	if (event.nativeEvent.key === 'share') {
		if (!textSelectionValidation(event.nativeEvent.selectedText)) return
		await share(event.nativeEvent.selectedText)
	}

	if (event.nativeEvent.key === 'Translate') {
		if (!textSelectionValidation(event.nativeEvent.selectedText)) return
		const link = `
		"https://translate.google.com/?sl=auto&tl=${deviceLanguage}&text=${event.nativeEvent.selectedText}"
	`
		Linking.openURL(link)
	}
	return removeAllSelection
}
