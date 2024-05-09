import type { ChapterType } from '../../../apps/backend/src/book/ebook/ebook.model'
import { minutesToTime } from './time-converter'

export interface GetServerBookHtmlType
	extends Pick<ChapterType, 'romanNumber' | 'readingTime' | 'name' | 'text'> {
	sectionId: string
}
export const getServerBookHtml = ({
	name,
	text,
	sectionId,
	readingTime,
	romanNumber
}: GetServerBookHtmlType) => `<section style="margin-top: 20px; margin-bottom: 20px;" id="${sectionId}">
	<h4 style="margin: 0; padding: 0; font-size: 18px; margin-bottom:4px">${name}</h4>
	<div style=" gap: 10px; display: flex; align-items: center;">
	<h6 style="margin: 0; padding: 0;">${romanNumber}</h6>
	<em style="margin: 0; padding: 0;">${minutesToTime(readingTime)}</em>
</div>
 ${text}
</section>`
