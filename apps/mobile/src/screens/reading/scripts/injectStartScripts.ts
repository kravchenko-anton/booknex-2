import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/scripts/calculate-progress'
import { onSelectTextScript } from '@/screens/reading/scripts/text-select/text-selection-limit'

const injectScript = `
    var selection = null;
    var position = null;
    var menu = document.getElementById('text-selection-menu');

    function onSelectStart() {
      selection = null;
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'text-unselected' }));
    }	
    
    function onSelectTextReallyEnd() {
		menu.style.display = 'block';
    }

    function onSelectEnd(event) {
      const activeSelection = document.getSelection();
    const text = activeSelection?.toString();
	window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'text-selected', payload: { text, activeSelection } }));
	    if ( !activeSelection || !text ) {
      selection = null;
      return;
    };

    selection = text;

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect()

    selection = ({
      x: rect.left + (rect.width / 2) - (80 / 2),
      y: rect.top + window.scrollY - 30,
      width: rect.width,
      height: rect.height,
    });
    menu.style.top = selection.y + 'px';
    menu.style.left = selection.x + 'px';
		menu.style.display = 'none';    
  	window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'text-selected', payload: selection }));
    }

    document.addEventListener('selectstart', onSelectStart);
    document.addEventListener('mouseup', onSelectTextReallyEnd);
    document.addEventListener('selectionchange', onSelectEnd);
  `

export const injectStartScripts = (startPosition: number) => `
<script>
						window.onload = function() {
						window.scrollTo({
							top: ${startPosition}
						})
						${calculateProgress}
						${onSelectTextScript}
						${scrollCalculateProgress}
						${injectScript}
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading'}))
}
</script>
					`
