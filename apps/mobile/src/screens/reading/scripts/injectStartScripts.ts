import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/scripts/calculate-progress'
import { onSelectTextScript } from '@/screens/reading/scripts/text-select/text-selection-limit'

export const injectStartScripts = (startPosition: number) => `
<script>
						window.onload = function() {
						window.scrollTo({
							top: ${startPosition}
						})
						${calculateProgress}
						${onSelectTextScript}
						${scrollCalculateProgress}
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
}
</script>
					`
