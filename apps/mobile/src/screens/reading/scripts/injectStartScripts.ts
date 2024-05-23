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
 function wrapTextWithBoldTag(noteAndQuotes) {
	const regex = new RegExp(noteAndQuotes.map((noteAndQuote) => noteAndQuote.text).join('|'), 'g')
	const text = document.body.innerHTML
	
	document.body.innerHTML = text.replace(regex, (match) => {
		const noteAndQuote = noteAndQuotes.find((noteAndQuote) => noteAndQuote.text === match)
			// inject mark but with class equal to noteAndQuote.type
		if (noteAndQuote) return	'<mark class="' + noteAndQuote.type + '">' + match + '</mark>'	
		return match
	})}
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
