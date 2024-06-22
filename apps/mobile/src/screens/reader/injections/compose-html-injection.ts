import { finishBookButton } from '@/screens/reader/feature/finish-book/finish-book-html'
import { injectFont } from '@/screens/reader/injections/font-injection'
import { startScript } from '@/screens/reader/scripts/start-script'
import { selectMenuHtml } from '@/screens/reader/scripts/text-selection-scripts'
import type { ReactionByBookOutput } from 'global/api-client'
import { getFileUrl } from 'global/api-config'

interface ComposeReaderViewHtmlProperties {
	title: string
	picture: string
	file: string[]
	defaultProperties: {
		scrollPosition: number
		theme: string
		reactions: ReactionByBookOutput[]
	}
	isOnline: boolean
}
export const composeReaderViewHtml = ({
	title,
	picture,
	file,
	defaultProperties,
	isOnline
}: ComposeReaderViewHtmlProperties) => `
				<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
				<title>${title}</title>
				<style>${injectFont()}</style>
			</head>
			<style>${defaultProperties.theme}</style>
			
			<div style="margin-bottom: 40px; user-select: none;">
				<img style='width:100%; height: 300px; object-fit: contain; object-position: center; padding-top: 40px'
					 src="${getFileUrl(picture)}" alt="${title}"
					onerror="this.style.display='none';"
					  />
				<h1>${title}</h1>
			</div>
			<div id="scroll-container">
				${file}
			</div>
			${selectMenuHtml}
			${finishBookButton}
			${startScript(defaultProperties.scrollPosition, defaultProperties.reactions, isOnline)}
`
