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
<script src="https://cdn.jsdelivr.net/npm/mark.js@8.11.1/dist/mark.min.js"  type="text/javascript" charset="utf-8" ></script>
<script>
		
 function wrapReactionsInMarkTag(reactions) {
// unmark all marks
const instance = new Mark(document.querySelector('body'));
instance.unmark();
			reactions.forEach(({ xpath, startOffset, id, endOffset, text }) => {
			
				const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!element) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: 'Element not found' }));
			if (!element || !text || !startOffset) return;
			const containerText = slugify(element.textContent.slice(startOffset, endOffset));
			const textSlug = slugify(text);
			if (containerText !== textSlug) return;
		const instance = new Mark(element);
			instance.markRanges([
				{
					start: startOffset,
					length: endOffset - startOffset
				}
			], {
				element: 'mark',
				className: id,
			
			})
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
