import { reactions } from '@/screens/reader/reactions'

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
// 	const events = [
//     'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave',
//     'contextmenu', 'wheel', 'select', 'input', 'keydown', 'keyup', 'keypress', 'touchstart', 'touchend', 'touchmove',
//     'resize', 'scroll', 'zoom', 'focus', 'blur', 'select', 'change', 'submit', 'reset', 'play', 'pause', 'loadedmetadata',
//     'loadstart', 'progress', 'error', 'abort', 'load', 'beforeunload', 'unload', 'offline', 'online', 'toggle'
// ];
//
// events.forEach(eventType => {
//     document.addEventListener(eventType, (event) => {
//     window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'selectionEnd', payload: { eventType } }));
//     });
// });
`

export const selectMenuHtml = `
<div id="select-menu" style="display: none; pointer-events: none; visibility: hidden; opacity: 0; position: absolute; left: 10px; top: 10px;  transition: all 0.3s ease-in-out;">
<div class="select-menu-reaction" id="select-menu-reaction">
	${reactions.map(reaction => `<img src="${reaction.gif}" alt="${reaction.alt}" title="${reaction.title}" width="27" height="27" class="select-menu-reaction-item">`).join('')}
</div>
<div class="select-default-menu">
<img
	id="text-menu-translate"
 	width="26" height="26"
 	alt="translate"
 	src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1sYW5ndWFnZXMiPjxwYXRoIGQ9Im01IDggNiA2Ii8+PHBhdGggZD0ibTQgMTQgNi02IDItMyIvPjxwYXRoIGQ9Ik0yIDVoMTIiLz48cGF0aCBkPSJNNyAyaDEiLz48cGF0aCBkPSJtMjIgMjItNS0xMC01IDEwIi8+PHBhdGggZD0iTTE0IDE4aDYiLz48L3N2Zz4="/>
<img
	id="text-menu-share"
 	width="26" height="26"
 	alt="translate"
 	src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zaGFyZSI+PHBhdGggZD0iTTQgMTJ2OGEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJ2LTgiLz48cG9seWxpbmUgcG9pbnRzPSIxNiA2IDEyIDIgOCA2Ii8+PGxpbmUgeDE9IjEyIiB4Mj0iMTIiIHkxPSIyIiB5Mj0iMTUiLz48L3N2Zz4="/>
</div>
</div>
`
export const selectMenuActions = `
	const translateButton = document.getElementById('text-menu-translate');
	const shareButton = document.getElementById('text-menu-share');
	const emojiButtons = document.querySelectorAll('.select-menu-reaction-item');
	
	emojiButtons.forEach((button) => {
		button.addEventListener('click', () => {
		const activeSelection = document.getSelection().toString();
		const range = document.getSelection().getRangeAt(0);
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
			window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'reaction', 
			payload: {
			text:activeSelection,
			reaction: button.title,
			range: { startOffset, endOffset,	
			xpath: getXPath(range.commonAncestorContainer.parentNode)
			},
			 }}));
			window.getSelection().removeAllRanges();
		});
	});	
	
		translateButton.addEventListener('click', (e) => {
	const activeSelection = document.getSelection().toString();
	window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'translate', payload: {
	text: activeSelection
	} }));
		window.getSelection().removeAllRanges();
	});
	
	shareButton.addEventListener('click', () => {
			const activeSelection = document.getSelection().toString();
			window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', payload: {
			text: activeSelection
			} }));
		window.getSelection().removeAllRanges();
	});
`

export const textSelectMenu = `
const selectMenu = document.getElementById('select-menu');
selectMenu.style.opacity = '0';
selectMenu.style.display = 'none';
selectMenu.style.pointerEvents = 'none';
selectMenu.style.visibility = 'hidden';
let isFirstSelection = true;

document.addEventListener('click', (e) => {
		isFirstSelection = true;
	setTimeout(() => {
		selectMenu.style.opacity = '0';
	}, 50);
		selectMenu.style.display = 'none';
		selectMenu.style.pointerEvents = 'none';
		selectMenu.style.visibility = 'hidden';
});


document.addEventListener('contextmenu', (e) => {
	isFirstSelection = true;	
	const activeSelection = document.getSelection();
	if (activeSelection.toString().length < 2) return;

	const rect = activeSelection.getRangeAt(0).getBoundingClientRect();
	selectMenu.style.top = (rect.top + window.scrollY - 60)  + 'px';
	setTimeout(() => {
		selectMenu.style.opacity = '1';
	}, 50);
	selectMenu.style.pointerEvents = 'auto';
	selectMenu.style.display = 'flex';
	selectMenu.style.visibility = 'visible';
	
	const startXpath = getXPath(activeSelection.getRangeAt(0).startContainer.parentNode);
	const endXpath = getXPath(activeSelection.getRangeAt(0).endContainer.parentNode);
		const reactionItems = document.querySelectorAll('.select-menu-reaction-item');
		

		
	const isOverlappingMark = Boolean(activeSelection.getRangeAt(0).cloneContents().querySelector('mark'));
	if (isOverlappingMark || startXpath !== endXpath) { 
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
				
				//TODO: убрать когда сделаю синхронизацию и всю экосистему	
			reactionItems.forEach((item) => {
			item.style.opacity = '0.5';
			item.style.pointerEvents = 'none';
		});
});

document.addEventListener('selectionchange', () => {
	if (!isFirstSelection) { 
	setTimeout(() => {
		selectMenu.style.opacity = '0';
	}, 50);
		selectMenu.style.pointerEvents = 'none';
		selectMenu.style.display = 'none';
		selectMenu.style.visibility = 'hidden';
	}
	isFirstSelection = false;
});
`
//TODO: доделать полностью функционал селекта текста чтобы при выборе и вдруг изменении epub, ничего не ломалось
