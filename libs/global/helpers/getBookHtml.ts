import { slugify } from './slugify'
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
}: BookHtmlType) => `<section id="${slugify(name + ' ' + title)}">
	<div style="
	width: 100%;
	height: 90px;
	display: flex;
	justify-content: space-between;
	align-items: center;">
	<div>
	<h4 style="margin: 0; padding: 0; font-size: 18px; margin-bottom:4px">${name}</h4>
	<em style="margin: 0; padding: 0; ">${minutesToTime(readingTime)}</em>
  </div>
	<h6 style="margin: 0; padding: 0;">${romanNumber}</h6>
	</div>
 ${text}
</section>`
