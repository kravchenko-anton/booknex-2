import { textSElectionLimit } from '@/screens/reading/scripts/text-select/on-text-selection'

export const onSelectTextScript = `
let position = { x: 0, y: 0 };
let timeoutId = null;

document.addEventListener('selectionchange', () => {
	const selection = window.getSelection();
	
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	
	timeoutId = setTimeout(() => {
		position.x = window.scrollX;
		position.y = window.scrollY;
	}, 100);
	
	if (selection.toString().length > ${textSElectionLimit}) {
		const behavior = selection.toString().length > 2000 ? 'auto' : 'smooth';
		selection.removeAllRanges();
			if (behavior === 'auto') {
				return window.scrollTo(position.x, position.y);
			}
			if (behavior === 'smooth') {
				return window.scrollTo({
					top: position.y,
					left: position.x,
					behavior: 'smooth'
				});
			}
	}
});
`

//TODO: доделать полностью функционал селекта текста чтобы при выборе и вдруг изменении epub, ничего не ломалось
export const extendedTextSelectionScript = `
	document.addEventListener('selectionchange', function(e) {
   const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectionText = selection.toString();
    const isOverlappingMark = !!(selection.anchorNode.parentElement.closest('mark') || selection.focusNode.parentElement.closest('mark'))
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const rect = range.getBoundingClientRect();

					window.ReactNativeWebView.postMessage(
					JSON.stringify({
						type: 'selectText',
						payload: {
							text: selectionText,
						  range: {
                    startOffset,
                    endOffset
                },
						isOverlappingMark
						}
					})
				)
	});
`
