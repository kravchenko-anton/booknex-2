import { finishBookButton } from '@/screens/reading/scripts/finish-book-html';
import { injectFont } from '@/screens/reading/scripts/font-injection';
import { injectStartScripts } from '@/screens/reading/scripts/injectStartScripts';
import { getFileUrl } from 'global/api-config';
export const composeReaderViewHtml = ({ title, picture, file, defaultProperties }) => `
				<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
				<title>${title}</title>
				<style>${injectFont()}</style>
	
			</head>
		
			<style>${defaultProperties.theme}</style>
			<div>
				<img style='width:100%; height: 300px; object-fit: contain; object-position: center; padding-top: 40px'
					 src="${getFileUrl(picture)}" alt="${title}"
					    						onerror="this.style.display='none';"
					  />
				<h1>${title}</h1>
			</div>
			<div id="scroll-container">
				${file}
			</div>

			${finishBookButton}
			${injectStartScripts(defaultProperties.scrollPosition)}
	`;
//# sourceMappingURL=compose-html.js.map