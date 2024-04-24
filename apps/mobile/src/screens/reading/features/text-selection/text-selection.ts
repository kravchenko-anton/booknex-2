import { share } from '@/utils/share-function'
import { errorToast } from '@/utils/toast'
import Clipboard from '@react-native-clipboard/clipboard'
import { Linking } from 'react-native'

export const textSElectionLimit = 1200

const textSelectionValidation = (selectedText: string) => {
	if (selectedText.length > textSElectionLimit) return errorToast('Selected text is too long')

	return true
}

export const textSelection = async (event: any, removeAllSelection: void) => {
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

		await Linking.openURL(
			`https://translate.google.com/?sl=auto&tl=ru&text=${event.nativeEvent.selectedText}`
		)
	}
	return removeAllSelection
}
export const selectTextLimitScript = `
document.addEventListener('selectionchange', function() {
	const selectedText = window.getSelection().toString()
	if (selectedText.length > ${textSElectionLimit}) {
		window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'selection-limit-fail'}))
		window.getSelection().removeAllRanges()
	}
});
`
