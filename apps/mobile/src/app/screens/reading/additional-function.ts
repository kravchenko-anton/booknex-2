let lastTap: number | undefined
let timer: NodeJS.Timeout
export const handleDoublePress = (handleAction: () => void) => {
	if (lastTap) {
		handleAction()
		clearTimeout(timer)
		lastTap = undefined
	} else {
		lastTap = Date.now()
		timer = setTimeout(() => {
			lastTap = undefined
			clearTimeout(timer)
		}, 300)
	}
}

export const beforeLoad = (lastPosition: number) => `
	window.scrollTo({ top: ${lastPosition} });
`

export const scrollProgressDetect = `
let timerId;

window.addEventListener('scroll', function() {
 clearTimeout(timerId);

 timerId = setTimeout(() => {
   let currentScrollPosition = document.body.scrollTop;
   window.ReactNativeWebView.postMessage(JSON.stringify({
     type: "scroll",
     payload: {
       scrollTop: currentScrollPosition,
       progress: (currentScrollPosition / (document.body.scrollHeight - document.body.clientHeight))
     }
   }));
 }, 500);
});
`

export const injectStyle = (style: string) => `
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = \`${style}\`;
 document.head.appendChild(style);
		`
