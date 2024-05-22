import { textSElectionLimit } from '@/screens/reading/scripts/text-select/on-text-selection'

export const onSelectTextScript = `
document.addEventListener('selectionchange', () => {
	const selection = window.getSelection()
	if (selection.toString().length > ${textSElectionLimit}) {
		selection.removeAllRanges()
	}
});
`
export const extendedTextSelectionScript = `
	document.addEventListener('selectionchange', function(e) {
			// post message to native 
			const selection = window.getSelection()
			const selectionText = selection.toString()
			// get inner selection html and check if exist mark tag
			const isOverlappingMark = 		selection.anchorNode.parentElement.closest('mark') || selection.focusNode.parentElement.closest('mark')
			const range = selection.getRangeAt(0)
		const startOffset = range.startOffset
		const endOffset = range.endOffset
				
				
				window.ReactNativeWebView.postMessage(
					JSON.stringify({
						type: 'selectText',
						payload: {
							text: selectionText,
							range: {
								startOffset,
								endOffset
							},
						isOverlappingMark
						}
					})
				)
	});
`
