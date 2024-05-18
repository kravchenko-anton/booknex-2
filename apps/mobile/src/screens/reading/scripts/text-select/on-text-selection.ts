import { selectionKeys } from '@/screens/reading/scripts/text-select/text-select-menu'
import { share } from '@/utils/share-function'
import { errorToast } from '@/utils/toast'
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

export const onTextSelection = async (
	event: any,
	reference: any,
	removeAllSelection: void
) => {
	if (event.nativeEvent.key === selectionKeys.note) {
		reference.current?.injectJavaScript(`
try {
	const selectedText = "${event.nativeEvent.selectedText}"
	const text = document.body.innerText 
	const startIndex = text.indexOf(selectedText)
	const endIndex = startIndex + selectedText.length
	const before = text.slice(0, startIndex)
	const after = text.slice(endIndex)
	const selected = text.slice(startIndex, endIndex)
	const newElement = document.createElement('div')
	newElement.id = 'note'
	newElement.innerHTML = before + '<b id="highlight" style="background-color: greenyellow;">' + selected + '</b>' + after
	document.body.innerHTML = newElement.outerHTML
	window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'note', payload: selectedText }))
}
catch (error) {
	window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: error }))
}	
		`)
	}
	if (event.nativeEvent.key === selectionKeys.share) {
		if (!textSelectionValidation(event.nativeEvent.selectedText)) return
		await share(event.nativeEvent.selectedText)
	}

	if (event.nativeEvent.key === selectionKeys.translate) {
		if (!textSelectionValidation(event.nativeEvent.selectedText)) return
		const link = `
		"https://translate.google.com/?sl=auto&tl=${deviceLanguage}&text=${event.nativeEvent.selectedText}"
	`
		Linking.openURL(link)
	}
	return removeAllSelection
}
