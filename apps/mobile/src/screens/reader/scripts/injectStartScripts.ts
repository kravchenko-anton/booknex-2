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
			const elementsForReactions = [];
			window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'reactions in wrap', payload: reactions }));
			reactions.forEach(({ xpath, startOffset, id, endOffset, text }) => {
				const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!element) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: 'Element not found' }));
				elementsForReactions.push({ element, startOffset, id, endOffset, text });
			});
			elementsForReactions.forEach(({ element, text, id, startOffset, endOffset }) => {
			if (!element || !text || !startOffset) return;
			const containerText = slugify(element.textContent.slice(startOffset, endOffset));
			const textSlug = slugify(text);
			if (containerText !== textSlug) return;
			
			const regex = new RegExp(element.textContent.slice(startOffset, endOffset), 'g');
			element.innerHTML = element.innerHTML.replace(regex, (match) => {
				return match ? \`<mark id="\${id}">\${match}</mark>\` : match;
				});
	
	
			});
			
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
