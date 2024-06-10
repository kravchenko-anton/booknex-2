import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reader/feature/reading-progress/calculate-progress'
import { reactionsScripts } from '@/screens/reader/scripts/reactions-scripts'
import {
	onSelectTextScript,
	selectMenuActions,
	textSelectMenu
} from '@/screens/reader/scripts/text-selection-scripts'
import { utilsScripts } from '@/screens/reader/scripts/utils-scripts'
import type { ReactionByBookOutput } from 'global/api-client'

export const injectStartScripts = (
	startPosition: number,
	reactions: ReactionByBookOutput[],
	isOnline: boolean
) => `
<script>	
 function wrapReactionsInMarkTag(reactions) {
 		const marks = document.querySelectorAll('mark');
			marks.forEach((mark) => {
				mark.outerHTML = mark.innerHTML;
			});
			reactions.forEach(({ xpath, startOffset, id, endOffset, text }) => {
			
				const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!element) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: 'Element not found' }));
			if (!element || !text || !startOffset) return;
			const containerText = slugify(element.textContent.slice(startOffset, endOffset));
			const textSlug = slugify(text);
			if (containerText !== textSlug) return;
			window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: element.textContent.slice(startOffset, endOffset) }));
	let startElement = element.innerHTML.slice(0,startOffset)
	let middleElement = document.createElement('mark')
	middleElement.setAttribute('id', id)
	middleElement.textContent = element.innerHTML.slice(startOffset, endOffset)
	let endElement = element.innerHTML.slice(endOffset)
	element.innerHTML = startElement + middleElement.outerHTML + endElement
			})
			
}
						${utilsScripts}
						${reactionsScripts}
						window.onload = function() {
						window.scrollTo({	top: ${startPosition} })
						${calculateProgress}
						${onSelectTextScript}
						${textSelectMenu(isOnline)}
						${selectMenuActions}
						${scrollCalculateProgress}
		
						wrapReactionsInMarkTag(${JSON.stringify(reactions)})
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
}
</script>
					`
