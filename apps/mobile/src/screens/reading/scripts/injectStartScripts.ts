import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/scripts/calculate-progress'
import { selectTextLimitScript } from '@/screens/reading/scripts/text-selection-limit'

export const injectStartScripts = (startPosition: number) => `
<script>
						window.onload = function() {
						window.scrollTo({
							top: ${startPosition}
						})
						${calculateProgress}
						${selectTextLimitScript}
						${scrollCalculateProgress}
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading'}))
}
</script>
					`
