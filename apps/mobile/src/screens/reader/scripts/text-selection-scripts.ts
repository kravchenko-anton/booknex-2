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

export const selectMenuActions = `
	const translateButton = document.getElementById('text-menu-translate');
	const shareButton = document.getElementById('text-menu-share');
	const emojiButtons = document.querySelectorAll('.select-menu-reaction-item');
	const getSelectionOffsetRelativeToParent = () => {
const selection = window.getSelection();
const range = selection.getRangeAt(0);
const clonedSelection = range.cloneContents();
const clonedSelectionText = clonedSelection.textContent;
const parent = range.commonAncestorContainer.parentNode;
const text = parent.textContent;
const startOffset = text.indexOf(clonedSelectionText);
const endOffset = startOffset + clonedSelectionText.length;
return { startOffset, endOffset };
}
	emojiButtons.forEach((button) => {
		button.addEventListener('click', () => {
		const activeSelection = document.getSelection().toString();
		const range = document.getSelection().getRangeAt(0);
		const { startOffset, endOffset } = getSelectionOffsetRelativeToParent();
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

export const textSelectMenu = (isOnline: boolean) => `
const selectMenu = document.getElementById('select-menu');
selectMenu.style.opacity = '0';
selectMenu.style.display = 'none';
selectMenu.style.pointerEvents = 'none';
selectMenu.style.visibility = 'hidden';
const isOnline = ${isOnline};
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

	const activeSelection = window.getSelection();
	if (activeSelection.toString().length < 2) return;
	const range = activeSelection.getRangeAt(0);
		const { startOffset, endOffset } = getSelectionOffsetRelativeToParent();
	
	window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'selection', payload: {  text: activeSelection.toString(), range:
	{ startOffset, endOffset, xpath: getXPath(activeSelection.getRangeAt(0).commonAncestorContainer.parentNode)}
	 } }));
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
	const isParentTagMark = Boolean(activeSelection.getRangeAt(0).commonAncestorContainer.parentNode.tagName === 'MARK');
	if (isOverlappingMark || startXpath !== endXpath || isParentTagMark || !isOnline) { 
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
