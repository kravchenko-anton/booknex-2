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

	<h4 style="margin: 0; padding: 0; font-size: 18px; margin-bottom:4px">${name}</h4>
	<div style=" gap: 10px; display: flex; align-items: center;">
	<h6 style="margin: 0; padding: 0;">${romanNumber}</h6>
	<em style="margin: 0; padding: 0;">${minutesToTime(readingTime)}</em>

</div>
 ${text}
</section>`
