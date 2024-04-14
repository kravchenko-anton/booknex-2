import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/features/reader-progress/calculate-progress'

export const useScriptInject = (startionScroll: number) => `
<script>
window.onload = function() {
						window.scrollTo({
							top: ${startionScroll}
						})
						${calculateProgress}
						${scrollCalculateProgress}
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading'}))
}
</script>
					`
