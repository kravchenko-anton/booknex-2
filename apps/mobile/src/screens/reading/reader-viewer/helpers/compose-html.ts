import { injectFont } from '@/screens/reading/reader-viewer/helpers/font-injection'
import {
	loadCalculateProgress,
	scrollCalculateProgress
} from '@/screens/reading/reader-viewer/helpers/load-calculate-progress'
import { getFileUrl } from 'global/api-config'
import { Color } from 'global/colors'

export const finishBookButton = `
		<div
		  class="finish-book-button-container"
		 style="
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 0;
				right: 0;
				height: 70px;
				font-weight: bold;
				">
				<div style="
				  display: flex;
				  align-items: center;
				  justify-content: space-between;
					color: ${Color.white};
				font-size: 15px;
				width: 95%;
				">Read it till the end?<div
				class="finish-book-button"
				onclick="window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finishBook' }))"
				style="
				border: 0;
				color: ${Color.white};
				font-size: 16px;
				border-radius: 6px;
				padding: 6px 19px;
				"
				>
				Finish book
				</div>
</div>

</div>

`

export const composeReaderViewHtml = ({
	title,
	picture,
	file,
	defaultProperties
}: {
	title: string
	picture: string
	file: string[]
	defaultProperties: {
		scrollPosition: number
		theme: string
	}
}) => `
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
				
				<script>
					window.onload = function() {
						window.scrollTo({
							top: ${defaultProperties.scrollPosition}
						})
						${loadCalculateProgress}
						${scrollCalculateProgress}
					}
</script>
	`
