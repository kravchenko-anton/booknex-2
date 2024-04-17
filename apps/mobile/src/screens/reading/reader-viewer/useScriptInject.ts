import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/features/reader-progress/calculate-progress'

export const useScriptInject = (startPosition: number) => `
<script>
						window.onload = function() {
						window.scrollTo({
							top: ${startPosition}
						})
						${calculateProgress}
						${scrollCalculateProgress}
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading'}))
}
</script>
					`
