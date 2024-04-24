import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/features/reader-progress/calculate-progress'
import { selectTextLimitScript } from '@/screens/reading/features/text-selection/text-selection'

export const useScriptInject = (startPosition: number) => `
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


