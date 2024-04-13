export const loadCalculateProgress = `
	 let currentScrollPosition = document.body.scrollTop;
	 let chapters = document.querySelectorAll('section');
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
			 };
	
   window.ReactNativeWebView.postMessage(JSON.stringify({
     type: "scroll",
     payload: {
       scrollTop: currentScrollPosition ,
       progress: (currentScrollPosition / (document.body.scrollHeight - document.body.clientHeight) * 100),
       currentChapterProgress: currentChapterProgress
     }
   }));
`
export const scrollCalculateProgress = `
let timerId;
window.addEventListener('scroll', function() {
 clearTimeout(timerId);

 timerId = setTimeout(() => {
  ${loadCalculateProgress}
  
 }, 1000);
});
`
