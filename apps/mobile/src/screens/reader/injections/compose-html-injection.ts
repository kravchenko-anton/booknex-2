import { injectFont } from '@/screens/reader/injections/font-injection'
import {
	calculateProgress,
	scrollCalculateProgress
} from '@/screens/reader/scripts/calculate-progress'
import { markSelectScript } from '@/screens/reader/scripts/mark-select'
import {
	onSelectTextScript,
	selectMenuActions,
	textSelectMenu
} from '@/screens/reader/scripts/text-selection-scripts'
import { utilsScripts } from '@/screens/reader/scripts/utils-scripts'
import type { ReactionByBookOutput } from 'global/api-client'

interface ComposeReaderViewHtmlProperties {
	title: string
	picture: string
	file: string
	defaultProperties: {
		scrollPosition: number
		theme: string
		reactions: ReactionByBookOutput[]
	}
	isOnline: boolean
}
export const composeReaderViewHtml = ({
	title,
	isOnline,
	file,
	defaultProperties
}: ComposeReaderViewHtmlProperties) => `
				<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
				<title>${title}</title>
				<style>${injectFont()}</style>
			</head>
			<style>${defaultProperties.theme}</style>
			
			${file}
			<script src="https://cdn.jsdelivr.net/npm/mark.js@8.11.1/dist/mark.min.js"  type="text/javascript" charset="utf-8" ></script>
			<script>
			 				
 						${markSelectScript}
						${utilsScripts}
						window.onload = function() {
						wrapReactionsInMarkTag(${JSON.stringify(defaultProperties.reactions)})
						window.scrollTo({
							top: ${defaultProperties.scrollPosition}
						 })
						${calculateProgress}
						${onSelectTextScript}
						${textSelectMenu(isOnline)}
						${selectMenuActions}
						${scrollCalculateProgress}
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
		}
</script>
`
