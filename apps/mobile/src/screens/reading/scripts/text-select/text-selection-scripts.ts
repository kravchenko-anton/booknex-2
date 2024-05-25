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
export const selectMenuHtml = `
<div id="select-menu" style="display: none; opacity: 0; position: absolute; top: -10px; z-index: 1000; background-color: white; border: 1px solid #000; padding: 5px;
border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.5); transition: opacity 0.5s ease-in-out;">
	<button id="highlight">Highlight</button>
	<button id="note">Note</button>
</div>
`
export const textSelectMenu = `
const selectMenu = document.getElementById('select-menu');
selectMenu.style.opacity = '0';
selectMenu.style.display = 'none';

document.addEventListener('selectionchange', () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'hideMenu' }));
    const selection = window.getSelection();
    if (selection.toString().length === 0) {
        selectMenu.style.opacity = '0';
        setTimeout(() => selectMenu.style.display = 'none', 500); // hide after transition ends
        return;
    }
});

document.addEventListener('contextmenu', (e) => {
    const activeSelection = document.getSelection();
    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();
    selectMenu.style.top =(rect.top + window.scrollY - 40)  + 'px';
    selectMenu.style.left = rect.left + (rect.width / 2) - (80 / 2) + 'px';
    selectMenu.style.display = 'block';
    setTimeout(() => selectMenu.style.opacity = '1', 50); // show after a slight delay to allow for display: block to take effect
});
`

//TODO: доделать полностью функционал селекта текста чтобы при выборе и вдруг изменении epub, ничего не ломалось
export const extendedTextSelectionScript = `
	document.addEventListener('displaySelectMenu', function(e) {
   	const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectionText = selection.toString();
    const isOverlappingMark = !!(selection.anchorNode.parentElement.closest('mark') || selection.focusNode.parentElement.closest('mark'))
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
   	const xpath = findElementByXpath(range.startContainer.parentElement);
		if (selectionText.length === 0) return;
					window.ReactNativeWebView.postMessage(
					JSON.stringify({
						type: 'selectText',
						payload: {
							text: selectionText,
						  range: {
                    startOffset,
                    endOffset,
                    xpath
                },
						isOverlappingMark
						}
					})
				)
	});
`
