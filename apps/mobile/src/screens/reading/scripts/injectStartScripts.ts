import type { QuoteAndNoteType } from '@/screens/reading/hooks/useReader'
import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/scripts/calculate-progress'
import {
	extendedTextSelectionScript,
	onSelectTextScript
} from '@/screens/reading/scripts/text-select/text-selection-scripts'

export const injectStartScripts = (
	startPosition: number,
	noteAndQuotes: QuoteAndNoteType[]
) => `

<script>
 function wrapTextWithBoldTag(noteAndQuotes) {
	const regex = new RegExp(noteAndQuotes.map((noteAndQuote) => {
		 return noteAndQuote.startOffset + '-' + noteAndQuote.endOffset
	}).join('|'), 'g')
	const text = document.body.innerHTML
	window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'start-loading', regex: regex.toString() }))
	document.body.innerHTML = text.replace(regex, (match) => {
		const noteAndQuote = noteAndQuotes.find((noteAndQuote) => {
			return noteAndQuote.startOffset + '-' + noteAndQuote.endOffset === match
		})
		if (noteAndQuote) return '<mark>' + noteAndQuote.text + '</mark>'
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
