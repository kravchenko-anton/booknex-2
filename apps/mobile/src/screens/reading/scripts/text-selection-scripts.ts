export const textSElectionLimit = 1200
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
<div id="select-menu" style="display: none; opacity: 0; position: absolute; left: 10px; top: 10px; z-index: 1000;  user-select: none; transition: opacity 0.5s ease-in-out;">
<div class="select-menu-reaction">
<img class="select-menu-reaction-item"  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Face%20With%20Symbols%20On%20Mouth.webp" alt="Face With Symbols On Mouth" width="30" height="30" />
<img class="select-menu-reaction-item" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Grinning%20Face%20With%20Smiling%20Eyes.webp" alt="Grinning Face With Smiling Eyes" width="30" height="30" />
<img class="select-menu-reaction-item" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Loudly%20Crying%20Face.webp" alt="Loudly Crying Face" width="30" height="30" />
<img class="select-menu-reaction-item"  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Smiling%20Face%20With%20Hearts.webp" alt="Smiling Face With Hearts" width="30" height="30" />
<img class="select-menu-reaction-item" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Anxious%20Face%20With%20Sweat.webp" alt="Anxious Face With Sweat" width="30" height="30" />
<img class="select-menu-reaction-item"  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/People/Writing%20Hand.webp" alt="Writing Hand" width="30" height="30" />
</div>
<div class="select-default-menu">
<svg id="text-menu-translate" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
<svg id="text-menu-share" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
</div>
</div>
`
export const selectMenuActions = `
	// if press post message 
	const translateButton = document.getElementById('text-menu-translate');
	const shareButton = document.getElementById('text-menu-share');
	
	translateButton.addEventListener('click', () => {
		const activeSelection = document.getSelection().toString();
		window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'translate', payload: {text:activeSelection} }));
		window.getSelection().removeAllRanges();
	});
	
	shareButton.addEventListener('click', () => {
		const activeSelection = document.getSelection().toString();
		window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', payload: {text:activeSelection} }));
		window.getSelection().removeAllRanges();
	});
	
`

export const textSelectMenu = `
const selectMenu = document.getElementById('select-menu');
selectMenu.style.opacity = '0';
let contextMenuTextSelect = "";
selectMenu.style.display = 'none';
selectMenu.style.pointerEvents = 'none';
let isFirstSelection = true;
	
	document.addEventListener('click', (e) => {
	isFirstSelection = true;
   setTimeout(() => selectMenu.style.opacity = '0', 50);
   selectMenu.style.display = 'none';
	 selectMenu.style.pointerEvents = 'none';
});

document.addEventListener('contextmenu', (e) => {
    isFirstSelection = true;	
    const activeSelection = document.getSelection();
		contextMenuTextSelect	= activeSelection.toString();
		if (contextMenuTextSelect.length === 0) return;
    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();
    selectMenu.style.top =(rect.top + window.scrollY - 60)  + 'px';
    selectMenu.style.display = 'block';
    selectMenu.style.pointerEvents = 'auto';
    setTimeout(() => selectMenu.style.opacity = '1', 50); 
});
document.addEventListener('selectionchange', () => {
	 if (!isFirstSelection) {
        setTimeout(() => selectMenu.style.opacity = '0', 50);
        selectMenu.style.display = 'none';
        selectMenu.style.pointerEvents = 'none';
    }
    isFirstSelection = false;
});
`

//TODO: доделать полностью функционал селекта текста чтобы при выборе и вдруг изменении epub, ничего не ломалось

// export const extendedTextSelectionScript = `
// 	document.addEventListener('displaySelectMenu', function(e) {
//    	const selection = window.getSelection();
//     const range = selection.getRangeAt(0);
//     const selectionText = selection.toString();
//     const isOverlappingMark = !!(selection.anchorNode.parentElement.closest('mark') || selection.focusNode.parentElement.closest('mark'))
//     const startOffset = range.startOffset;
//     const endOffset = range.endOffset;
//    	const xpath = findElementByXpath(range.startContainer.parentElement);
// 		if (selectionText.length === 0) return;
// 					window.ReactNativeWebView.postMessage(
// 					JSON.stringify({
// 						type: 'selectText',
// 						payload: {
// 							text: selectionText,
// 						  range: {
//                     startOffset,
//                     endOffset,
//                     xpath
//                 },
// 						isOverlappingMark
// 						}
// 					})
// 				)
// 	});
// `
