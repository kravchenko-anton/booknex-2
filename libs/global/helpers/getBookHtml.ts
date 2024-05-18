import type { ChapterType } from '../validation/ebook/chapter.schema'
import { minutesToTime } from './time-converter'

export interface GetServerBookHtmlType
	extends Pick<ChapterType, 'romanNumber' | 'readingTime' | 'name' | 'text'> {
	sectionId: string
	index: number
}
export const getServerBookHtml = ({
	name,
	text,
	sectionId,
	index,
	readingTime,
	romanNumber
}: GetServerBookHtmlType) => `<section id="${sectionId}" style="z-index: ${index + 1}">
<div style="width: 100%; user-select: none !important; margin-bottom: 30px; margin-top: 30px;">
	<h4 style="padding: 0; font-size: 18px; margin: 0 0 4px;">${name}</h4>
	<div style=" gap: 10px; display: flex; align-items: center;">
	<h6 style="margin: 0; padding: 0;">${romanNumber}</h6>
	<em style="margin: 0; padding: 0;">${minutesToTime(readingTime)}</em>
</div>
</div>
 ${text}
</section>`
