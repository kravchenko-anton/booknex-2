import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reader/scripts/calculate-progress'

import {
	logAllEvents,
	onSelectTextScript,
	selectMenuActions,
	textSelectMenu
} from '@/screens/reader/scripts/text-selection-scripts'
import type { ReactionType } from '@/screens/reader/store/reader-store'

export const injectStartScripts = (
	startPosition: number,
	reactions: ReactionType[]
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
	  const getXPath = (element) => {
        if (element.id !== '') return 'id("' + element.id + '")';
        if (element === document.body) return element.tagName;

        let ix = 0;
        let siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            if (sibling === element) return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
        }
    }
	

   window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
      return true;
    };
	
		//TODO: добавить проверку что этот текст действительно существует как и елемент и так далее, чтобы не было виделение в непонятных границах
 function wrapReactionsInMarkTag(reactions) {
			const slugify = (textContent) => textContent.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
	 
 		const marks = document.querySelectorAll('mark');
		marks.forEach((mark) => {
			mark.outerHTML = mark.innerHTML;
		});
			// find all elements for reactions
			const elementsForReactions = [];
			reactions.forEach(({ range, text }) => {
				const {xpath, startOffset, endOffset} = range;
				const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!element) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: 'Element not found' }));
				elementsForReactions.push({ element, startOffset, endOffset,text });
			});
				
			// wrap all text in mark tag
			elementsForReactions.forEach(({ element, text, startOffset, endOffset }) => {
			if (!element || !text) return;
			const containerText = slugify(element.textContent.slice(startOffset, endOffset));
			const textSlug = slugify(text);
			if (containerText !== textSlug) return;
			const regex = new RegExp(element.textContent.slice(startOffset, endOffset), 'g');
			element.innerHTML = element.innerHTML.replace(regex, (match) => {
				return '<mark>' + match + '</mark>';
					})
			});

}

	
						window.onload = function() {
	 // if add listener to mark tag click
	 const marks = document.querySelectorAll('mark');
	 marks.forEach((mark) => {
		 mark.addEventListener('click', () => {
	
		 });
		 
	 });	
						window.scrollTo({	top: ${startPosition} })
						${calculateProgress}
						${onSelectTextScript}
						${textSelectMenu}
						${selectMenuActions}
						${scrollCalculateProgress}
						${logAllEvents}
						wrapReactionsInMarkTag(${JSON.stringify(reactions)})
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
}
</script>
					`
