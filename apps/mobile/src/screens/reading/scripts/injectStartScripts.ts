import type { QuoteAndNoteType } from '@/screens/reading/hooks/useReader'
import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/scripts/calculate-progress'
import {
	extendedTextSelectionScript,
	onSelectTextScript
} from '@/screens/reading/scripts/text-select/text-selection-scripts'
//TODO: пофиксить тут селект текста и его обработку
export const injectStartScripts = (
	startPosition: number,
	noteAndQuotes: QuoteAndNoteType[]
) => `
<script>
	
function findElementByXpath(element) {

	
	if (!element) return null;
	if (element.id !== '') return 'id("' + element.id + '")';
	if (element === document.body) return element.tagName;

	let ix = 0;
	let siblings = element.parentNode.childNodes;
	for (let i = 0; i < siblings.length; i++) {
		let sibling = siblings[i];
		if (sibling === element) return findElementByXpath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
		if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
	}
}

function getElementFromXpath(xpath) {
		return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


 function wrapTextWithBoldTag(noteAndQuotes) {
try {
		noteAndQuotes.forEach(({ range }) => {
		const { startOffset, endOffset, xpath } = range;
		window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'info', payload: range }));
		const element = getElementFromXpath(xpath);
		if (!element) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: 'Element not found' }));
		const text = element.textContent;
		const regex = new RegExp(text.substring(startOffset, endOffset), 'g');
		element.innerHTML = text.replace(regex, '<mark>' + text.substring(startOffset, endOffset) + '</b>');
	});
}

catch (error) {
	window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: error.message }))
}
	
 
 }


						window.onload = function() {
						window.scrollTo({
							top: ${startPosition}
						})
						${calculateProgress}
						${onSelectTextScript}
						${scrollCalculateProgress}
						${extendedTextSelectionScript}
						wrapTextWithBoldTag(${JSON.stringify(noteAndQuotes)})
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
}
</script>
					`
