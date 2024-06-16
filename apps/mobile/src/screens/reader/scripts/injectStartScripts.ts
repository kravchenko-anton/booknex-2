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
    reactions.forEach(({ xpath, marks }) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: 'Element not found' }));
        element.style.position = "relative";
        marks.forEach (({ id, startOffset, endOffset, text }) => {
            if (!text || !startOffset) return;
            const containerText = slugify(element.textContent.slice(startOffset, endOffset));
            const textSlug = slugify(text);
            if (containerText !== textSlug) return;
											const mark = document.createElement('mark');
											mark.setAttribute('id', id);
											mark.style.position	= 'absolute';
												const rect = element.getBoundingClientRect();
												const textRect = element
												 const top = rect.top + window.scrollY;
												 const left = rect.left;
												 const width = rect.width;
												 const height = rect.height;
												 mark.style.top = top + 'px';
												 mark.style.left = left + 'px';
												 mark.style.opacity	= '0.5';
											window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mark try create', payload: { elementTextContent: element.textContent,
											 	// start offset in element
											 	elementStartOffset: element.textContent.indexOf(text),
											 	elementEndOffset: element.textContent.indexOf(text) + text.length,
											 	elementTextLength: element.textContent.length,
											 	elementChildNodes: Array.from(element.childNodes).map((node) => node.textContent)
											 } }));
											
											element.appendChild(mark);

				  
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
		
						wrapReactionsInMarkTag(${JSON.stringify(
							reactions.reduce<
								{
									xpath: string
									marks: {
										id: number
										startOffset: number
										endOffset: number
										text: string
									}[]
								}[]
							>((accumulator, { xpath, id, startOffset, endOffset, text }) => {
								const element = accumulator.find(
									({ xpath: currentXpath }) => currentXpath === xpath
								)
								if (element) {
									element.marks.push({ id, startOffset, endOffset, text })
								} else {
									accumulator.push({
										xpath,
										marks: [{ id, startOffset, endOffset, text }]
									})
								}
								return accumulator
							}, [])
						)})
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
}
</script>
					`
