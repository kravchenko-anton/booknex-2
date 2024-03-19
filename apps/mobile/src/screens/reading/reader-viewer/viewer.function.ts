import { ReaderFont } from '@/redux/reader/reading-settings-slice'
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
				border-radius: 12px;
				padding: 6px 12px;
				"
				>
				Finish book
				</div>
</div>

</div>

`

export const ViewerHtml = ({
	title,
	picture,
	file,
	defaultTheme
}: {
	title: string
	picture: string
	file: string[]
	defaultTheme: string
}) => {
	const fonts = ReaderFont.map(font => font.fontFamily)
	const fontFaces = fonts.map(
		font => `
		@font-face {
    font-family: '${font}-Bold';
    src:url('file:///android_asset/fonts/${font}-Bold.ttf') format('truetype')
		}

		@font-face {
			font-family: '${font}-Regular';
			src:url('file:///android_asset/fonts/${font}-Regular.ttf') format('truetype')
		}
		
		@font-face {
			font-family: '${font}-Light';
			src:url('file:///android_asset/fonts/${font}-Light.ttf') format('truetype')
		}
	`
	)
	return `
	<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
				<title>${title}</title>
				<style>
					${fontFaces.join('')}
</style>
			</head>
			<style>${defaultTheme}</style>
			<div>
				<img style='width:100%; height: 300px; object-fit: contain; object-position: center; padding-top: 40px'
					 src="${getFileUrl(picture)}" alt="${title}" />
				<h1>${title}</h1>
			</div>
			${file}
			${finishBookButton}
	`
}

export const scrollProgressDetect = `
let timerId;
let chapters = document.querySelectorAll('div');

window.addEventListener('scroll', function() {
 clearTimeout(timerId);

 timerId = setTimeout(() => {
   let currentScrollPosition = document.body.scrollTop;

   window.ReactNativeWebView.postMessage(JSON.stringify({
     type: "scroll",
     payload: {
       scrollTop: currentScrollPosition,
       progress: (currentScrollPosition / (document.body.scrollHeight - document.body.clientHeight) * 100)
     }
   }));
   
 }, 1000);
});
`
