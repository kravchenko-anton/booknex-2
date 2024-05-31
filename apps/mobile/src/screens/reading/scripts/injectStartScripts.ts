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
function findElementByXpath(startElement, endElement) {
    if (!startElement || !endElement) return null;

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

    const startXPath = getXPath(startElement);
    const endXPath = getXPath(endElement);

    return { startXPath, endXPath };
}
function wrapQuotesInMarkTag(noteAndQuotes) {
	    noteAndQuotes.forEach(({ startOffset, text, endOffset, startXPath, endXPath }) => {
		
				})
		}

   window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
      return true;
    };
						window.onload = function() {
						window.scrollTo({	top: ${startPosition} })
						${calculateProgress}
						${onSelectTextScript}
						${textSelectMenu}
						${selectMenuActions}
						${scrollCalculateProgress}
						${logAllEvents}
						wrapQuotesInMarkTag(${JSON.stringify(noteAndQuotes)})
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
}
</script>
					`
