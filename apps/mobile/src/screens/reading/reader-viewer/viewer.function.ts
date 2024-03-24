import { injectFont } from '@/screens/reading/reader-viewer/font-injection';
import { getFileUrl } from 'global/api-config';
import { Color } from 'global/colors';

export const calculateProgress = `
	 let currentScrollPosition = document.body.scrollTop;
	 let chapters = document.querySelectorAll('div');
	 chapters = Array.from(chapters).filter(chapter => chapter.id);
			 let currentChapterProgress = 0;
			 let currentChapter = 0;
			 
			 for (let i = 0; i < chapters.length; i++) {
				 const chapter = chapters[i];
				 const chapterHeight = chapter.scrollHeight;
				 const chapterTop = chapter.offsetTop;
				 const chapterBottom = chapterTop + chapterHeight;
				 if (currentScrollPosition >= chapterTop && currentScrollPosition <= chapterBottom) {
					 currentChapterProgress = (currentScrollPosition - chapterTop) / chapterHeight * 100;
					 currentChapter = i;
					 break;
				 }
			 }
	
		
				
	
   window.ReactNativeWebView.postMessage(JSON.stringify({
     type: "scroll",
     payload: {
       scrollTop: currentScrollPosition ,
       progress: (currentScrollPosition / (document.body.scrollHeight - document.body.clientHeight) * 100),
       currentChapterProgress: currentChapterProgress
     }
   }));
`;

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

`;

export const ViewerHtml = ({
  title,
  picture,
  file,
  defaultProperties
}: {
  title: string;
  picture: string;
  file: string[];
  defaultProperties: {
    scrollPosition: number;
    theme: string;
  };
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
			${file}
			${finishBookButton}
				
				<script>
					window.onload = function() {
						window.scrollTo({
							top: ${defaultProperties.scrollPosition}
						}).then(() => {
								${calculateProgress}
						});
					}
</script>
	`;

export const readerActions = `
let timerId;
window.addEventListener('scroll', function() {
 clearTimeout(timerId);

 timerId = setTimeout(() => {
  ${calculateProgress}
  
 }, 1000);
});
`;
