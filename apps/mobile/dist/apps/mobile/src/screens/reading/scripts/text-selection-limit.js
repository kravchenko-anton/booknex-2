import { textSElectionLimit } from '@/screens/reading/functions/on-text-selection';
export const selectTextLimitScript = `
document.addEventListener('selectionchange', function() {
	const selectedText = window.getSelection().toString()
	if (selectedText.length > ${textSElectionLimit}) {
		window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'selection-limit-fail'}))
		window.getSelection().removeAllRanges()
	}
});
`;
//# sourceMappingURL=text-selection-limit.js.map