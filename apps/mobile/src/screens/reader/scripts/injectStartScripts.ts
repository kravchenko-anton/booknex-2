import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reader/feature/reading-progress/calculate-progress'
import { reactionsScripts } from '@/screens/reader/scripts/reactions-scripts'
import {
	onSelectTextScript,
	selectMenuActions,
	textSelectMenu
} from '@/screens/reader/scripts/text-selection-scripts'
import { utilsScripts } from '@/screens/reader/scripts/utils-scripts'
import type { ReactionByBookOutput } from 'global/api-client'

export const injectStartScripts = (
	startPosition: number,
	reactions: ReactionByBookOutput[],
	isOnline: boolean
) => `
<script>	
						${utilsScripts}
						${reactionsScripts}
						window.onload = function() {
						window.scrollTo({	top: ${startPosition} })
						${calculateProgress}
						${onSelectTextScript}
						${textSelectMenu(isOnline)}
						${selectMenuActions}
						${scrollCalculateProgress}
		
						wrapReactionsInMarkTag(${JSON.stringify(reactions)})
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
}
</script>
					`
