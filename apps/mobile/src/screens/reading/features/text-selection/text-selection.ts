import { share } from '@/utils/share-function'
import { errorToast } from '@/utils/toast'
import Clipboard from '@react-native-clipboard/clipboard'
import { Linking } from 'react-native'

const textSelectionValidation = (selectedText: string) => {
	if (selectedText.length < 3) return errorToast('Selected text is too short')
	if (selectedText.length > 800) return errorToast('Selected text is too long')
}

export const textSelection = async (event: any, removeAllSelection: void) => {
	if (event.nativeEvent.key === 'copy') {
		textSelectionValidation(event.nativeEvent.selectedText)

		console.log('Copy', event.nativeEvent.selectedText)
		Clipboard.setString(event.nativeEvent.selectedText)
	}
	if (event.nativeEvent.key === 'share') {
		textSelectionValidation(event.nativeEvent.selectedText)
		await share(event.nativeEvent.selectedText)
	}
	if (event.nativeEvent.key === 'Translate') {
		textSelectionValidation(event.nativeEvent.selectedText)

		await Linking.openURL(
			`https://translate.google.com/?sl=auto&tl=ru&text=${event.nativeEvent.selectedText}`
		)
	}
	return removeAllSelection
}
