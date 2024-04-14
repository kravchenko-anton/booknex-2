import { finishBookButton } from '@/screens/reading/features/finish-book/finish-book-html'
import { injectFont } from '@/screens/reading/features/reader-styles/font-injection'
import { useScriptInject } from '@/screens/reading/reader-viewer/useScriptInject'
import { getFileUrl } from 'global/api-config'

interface ComposeReaderViewHtmlProperties {
	title: string
	picture: string
	file: string[]
	defaultProperties: {
		scrollPosition: number
		theme: string
	}
}
export const composeReaderViewHtml = ({
	title,
	picture,
	file,
	defaultProperties
}: ComposeReaderViewHtmlProperties) => `
				<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
				<title>${title}</title>
				<style>${injectFont()}</style>

			</head>
		
			<style>${defaultProperties.theme}</style>
			<div>
				<img style='width:100%; height: 300px; object-fit: contain; object-position: center; padding-top: 40px'
					 src="${getFileUrl(picture)}" alt="${title}" />
				<h1>${title}</h1>
			</div>
			<div =="scroll-container">
				${file}
			</div>

			${finishBookButton}
			
			${useScriptInject(defaultProperties.scrollPosition)}
	`
