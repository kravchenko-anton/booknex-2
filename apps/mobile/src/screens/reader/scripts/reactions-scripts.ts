export const reactionsScripts = `


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
