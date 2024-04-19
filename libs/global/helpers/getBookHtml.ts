import { minutesToTime } from './time-converter'

interface BookHtmlType {
	name: string
	title: string
	text: string
	readingTime: number
	romanNumber: string
}

export const getServerBookHtml = ({
	name,
	title,
	text,
	readingTime,
	romanNumber
}: BookHtmlType) => `<section id="${name + ' ' + title}">
	<div style="
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;">
	<div>
	<a style="margin: 0; padding: 0; font-size: 18px; margin-bottom:4px">${name}</a>
	<p style="margin: 0; padding: 0;">${minutesToTime(readingTime)}</p>
  </div>
	<h2 style="margin: 0; padding: 0;">${romanNumber}</h2>
	</div>
 ${text}
</section>`
