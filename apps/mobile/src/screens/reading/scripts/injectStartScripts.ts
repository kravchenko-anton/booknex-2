import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/scripts/calculate-progress'

import {
	logAllEvents,
	onSelectTextScript,
	selectMenuActions,
	textSelectMenu
} from '@/screens/reading/scripts/text-selection-scripts'
import type { ReactionType } from '@/screens/reading/store/reader-store'

export const injectStartScripts = (
	startPosition: number,
	noteAndQuotes: ReactionType[]
) => `
<script>
	function scrollToProgress(progress) {
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = scrollHeight * progress;
		window.scrollTo({
			top: scrollTop
		})
		${calculateProgress}
	}
	
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

	//TODO: добавить доп проверку по тексту чтобы если нету нужного контента то просто не селектилась
 function wrapTextWithBoldTag(noteAndQuotes) {
		noteAndQuotes.forEach(({ range }) => {
		const { startOffset, endOffset, xpath } = range;
		const element =  document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!element) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: 'Element not found' }));
		const text = element.textContent;
		const regex = new RegExp(text.substring(startOffset, endOffset), 'g');
		element.innerHTML = text.replace(regex, '<mark>' + text.substring(startOffset, endOffset) + '</mark>');
	});
}


						window.onload = function() {
						window.scrollTo({	top: ${startPosition} })
						${calculateProgress}
						${onSelectTextScript}
						${textSelectMenu}
						${selectMenuActions}
						${scrollCalculateProgress}
						${logAllEvents}
						wrapTextWithBoldTag(${JSON.stringify(noteAndQuotes)})
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
}
</script>
					`
