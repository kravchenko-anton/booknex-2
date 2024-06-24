import { reactions } from '@/src/book/ebook/helpers/reactions'
import { getFileUrl } from 'global/api-config'
import { Color } from 'global/colors'

export const selectMenuHtml = `
<div id="select-menu" style="display: none; pointer-events: none; visibility: hidden; opacity: 0; position: absolute; left: 10px; top: 10px;  transition: all 0.3s ease-in-out;">
<div class="select-menu-reaction" id="select-menu-reaction">
	${reactions.map(reaction => `<img src="${reaction.gif}" alt="${reaction.alt}" title="${reaction.title}" width="27" height="27" class="select-menu-reaction-item">`).join('')}
</div>
<div class="select-default-menu">
<img
	id="text-menu-translate"
 	width="26" height="26"
 	alt="translate"
 	src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1sYW5ndWFnZXMiPjxwYXRoIGQ9Im01IDggNiA2Ii8+PHBhdGggZD0ibTQgMTQgNi02IDItMyIvPjxwYXRoIGQ9Ik0yIDVoMTIiLz48cGF0aCBkPSJNNyAyaDEiLz48cGF0aCBkPSJtMjIgMjItNS0xMC01IDEwIi8+PHBhdGggZD0iTTE0IDE4aDYiLz48L3N2Zz4="/>
<img
	id="text-menu-share"
 	width="26" height="26"
 	alt="translate"
 	src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zaGFyZSI+PHBhdGggZD0iTTQgMTJ2OGEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJ2LTgiLz48cG9seWxpbmUgcG9pbnRzPSIxNiA2IDEyIDIgOCA2Ii8+PGxpbmUgeDE9IjEyIiB4Mj0iMTIiIHkxPSIyIiB5Mj0iMTUiLz48L3N2Zz4="/>
</div>
</div>
`
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
				margin-top: 40px;
				padding-bottom: 10px;
		
				">
				<div
					class="finish-book-text">Read it till the end?<div
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

export const wrapEbookInLogic = (
	file: string,
	picture: string,
	title: string
) => `
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

`
