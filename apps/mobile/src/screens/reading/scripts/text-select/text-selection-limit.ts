import { textSElectionLimit } from '@/screens/reading/scripts/text-select/on-text-selection'

export const onSelectTextScript = `
document.addEventListener('selectionchange', () => {
	const selection = window.getSelection()
	if (selection.toString().length > ${textSElectionLimit}) {
		selection.removeAllRanges()
	}
})
`
