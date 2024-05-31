import { reactions } from '@/screens/reading/reactions'

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

export const logAllEvents = `
	const events = [
    'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave',
    'contextmenu', 'wheel', 'select', 'input', 'keydown', 'keyup', 'keypress', 'touchstart', 'touchend', 'touchmove',
    'resize', 'scroll', 'zoom', 'focus', 'blur', 'select', 'change', 'submit', 'reset', 'play', 'pause', 'loadedmetadata',
    'loadstart', 'progress', 'error', 'abort', 'load', 'beforeunload', 'unload', 'offline', 'online', 'toggle'
];

events.forEach(eventType => {
    document.addEventListener(eventType, (event) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'selectionEnd', payload: { eventType } }));
    });
});
`

export const selectMenuHtml = `
<div id="select-menu" style="display: none; opacity: 0; position: absolute; left: 10px; top: 10px; z-index: 1000;  user-select: none; transition: all 0.3s ease-in-out;">
<div class="select-menu-reaction" id="select-menu-reaction">
	${reactions.map(reaction => `<img src="${reaction.gif}" alt="${reaction.alt}" title="${reaction.title}" width="28" height="28" class="select-menu-reaction-item">`).join('')}
</div>
<div class="select-default-menu">
<svg id="text-menu-translate" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
<svg id="text-menu-share" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
</div>
</div>
`
export const selectMenuActions = `
	const translateButton = document.getElementById('text-menu-translate');
	const shareButton = document.getElementById('text-menu-share');
	const emojiButtons = document.querySelectorAll('.select-menu-reaction-item');
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
	
	emojiButtons.forEach((button) => {
		button.addEventListener('click', () => {
		const activeSelection = document.getSelection().toString();
		const range = document.getSelection().getRangeAt(0);
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
		const { startXPath, endXPath } = findElementByXpath(range.startContainer.parentElement, range.endContainer.parentElement);
			window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'reaction', payload: {
			text:activeSelection,
			reaction: button.title,
			range: {start: startOffset, end: endOffset, 	endXPath, startXPath },
			 }}));
			window.getSelection().removeAllRanges();
		});
	});	
	
`
export const textSelectMenu = `
const selectMenu = document.getElementById('select-menu');
let contextMenuTextSelect = "";
selectMenu.style.opacity = '0';
selectMenu.style.display = 'none';
selectMenu.style.visibility = 'hidden';
selectMenu.style.pointerEvents = 'none';
let isFirstSelection = true;
	
document.addEventListener('click', (e) => {
		selectMenu.style.pointerEvents = 'none';
	isFirstSelection = false;
	setTimeout(() => {
		selectMenu.style.opacity = '0';
		selectMenu.style.display = 'none';
selectMenu.style.visibility = 'hidden';
			
	}, 50);
});
document.addEventListener('contextmenu', (e) => {
	isFirstSelection = true;	
	const activeSelection = document.getSelection();
	contextMenuTextSelect	= activeSelection.toString();
	if (contextMenuTextSelect.length < 2) return;
		const reactionItems = document.querySelectorAll('.select-menu-reaction-item');
	const isOverlappingMark = Boolean(activeSelection.getRangeAt(0).cloneContents().querySelector('mark'));
	if (isOverlappingMark) {
		reactionItems.forEach((item) => {
			item.style.opacity = '0.5';
			item.style.pointerEvents = 'none';
		});
	}
	else {
		reactionItems.forEach((item) => {
			item.style.opacity = '1';
			item.style.pointerEvents = 'auto';
		});
	}
	const rect = activeSelection.getRangeAt(0).getBoundingClientRect();
	selectMenu.style.top =(rect.top + window.scrollY - 60)  + 'px';
	setTimeout(() => selectMenu.style.opacity = '1', 50); 
	selectMenu.style.display = 'block';
	selectMenu.style.pointerEvents = 'auto';
	selectMenu.style.visibility = 'visible';
});

document.addEventListener('selectionchange', () => {
	if (!isFirstSelection) {
		selectMenu.style.pointerEvents = 'none';
		setTimeout(() => {
			selectMenu.style.opacity = '0';
			selectMenu.style.display = 'none';
			selectMenu.style.visibility = 'hidden';
		}, 50);
	}
	isFirstSelection = false;
});
`
//TODO: доделать полностью функционал селекта текста чтобы при выборе и вдруг изменении epub, ничего не ломалось
