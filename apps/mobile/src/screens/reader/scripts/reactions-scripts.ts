export const reactionsScripts = `
 function wrapReactionsInMarkTag(reactions) {
		const slugify = (textContent) => textContent.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
 		const marks = document.querySelectorAll('mark');
			marks.forEach((mark) => {
				mark.outerHTML = mark.innerHTML;
			});
			const elementsForReactions = [];
			reactions.forEach(({ xpath, startOffset, id, endOffset, text }) => {
				const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!element) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: 'Element not found' }));
				elementsForReactions.push({ element, startOffset, id, endOffset, text });
			});
			elementsForReactions.forEach(({ element, text, id, startOffset, endOffset }) => {
			if (!element || !text) return;
			const containerText = slugify(element.textContent.slice(startOffset, endOffset));
			const textSlug = slugify(text);
			if (containerText !== textSlug) return;
			const regex = new RegExp(element.textContent.slice(startOffset, endOffset), 'g');
			element.innerHTML = element.innerHTML.replace(regex, (match) => {
				return '<mark id="' + id + '">' + match + '</mark>';
					})
			});
			
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'MARK') {
    const id = target.getAttribute('id');
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mark-click', payload: {
      id
    } }));
  }
});
 `
