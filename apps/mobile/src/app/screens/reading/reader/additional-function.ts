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

export const scrollToText = (text: string) => `
function scrollToText() {
    const elements = document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.innerText.includes('${text}')) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "ScrollToText",
                payload: {
                    text: "${text}"
                }
            }));
            break;
        }
    }
}

scrollToText();
`

export const scrollToProgress = (progress: number) => `
var scrollHeight = document.body.scrollHeight;
var scrollPosition = scrollHeight * ${progress} / 100;
window.scrollTo({
	top: scrollPosition,
	behavior: 'smooth'
});
  window.ReactNativeWebView.postMessage(JSON.stringify({
    type: "ScrollToProgress",
    payload: {
      scrollTop: scrollPosition,
      scrollHeight: scrollHeight,
      progress: ${progress}
    }
  }));`
export const beforeLoad = (style: string, lastPosition: number) => `
	var styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.innerHTML = \`${style}\`;
  document.getElementsByTagName('head')[0].appendChild(styleTag);
	window.scrollTo({
			top: ${lastPosition}		});
`

export const insertStyle = (style: string) => `
var styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.innerHTML = \`${style}\`;
  document.getElementsByTagName('head')[0].appendChild(styleTag);
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
       progress: Math.round((currentScrollPosition / (document.body.scrollHeight - document.body.clientHeight)) * 100)
     }
   }));

   lastScrollPosition = currentScrollPosition;
 }
});`
