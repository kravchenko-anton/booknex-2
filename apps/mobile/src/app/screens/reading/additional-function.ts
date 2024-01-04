let lastTap: number | null = null
let timer: NodeJS.Timeout
export const handleDoublePress = (handleAction: () => void) => {
	if (lastTap) {
		handleAction()
		clearTimeout(timer)
		lastTap = null
	} else {
		lastTap = Date.now()
		timer = setTimeout(() => {
			lastTap = null
			clearTimeout(timer)
		}, 300)
	}
}

export const beforeLoad = (lastPosition: number) => `
	window.scrollTo({ top: ${lastPosition} });
`

export const scrollProgressDetect = () => `
let lastScrollPosition = 0;

window.addEventListener('scroll', function() {
 let currentScrollPosition = document.body.scrollTop;
 let difference = currentScrollPosition - lastScrollPosition;

 if (Math.abs(difference) >= 100) {
   window.ReactNativeWebView.postMessage(JSON.stringify({
     type: "scroll",
     payload: {
       scrollTop: currentScrollPosition,
       scrollBottom: Math.round(document.body.scrollHeight - currentScrollPosition - document.body.clientHeight) -1,
       progress: Math.round((currentScrollPosition / (document.body.scrollHeight - document.body.clientHeight)) * 1000)
     }
   }));

   lastScrollPosition = currentScrollPosition;
 }
});`
