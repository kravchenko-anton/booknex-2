import type { EBookPayloadType } from 'global/validation/ebook/ebook.schema'
import { convertToRoman } from '../../utils/helpers/romanize-number'
import type { StoredEBook } from '../ebook/ebook.dto'

const calculateReadingTime = (text: string) => {
	const wordsPerMinute = 200
	const words = text.split(' ').length
	const minutes = words / wordsPerMinute
	return Math.ceil(minutes)
}

export const useEbookCalculation = (
	ebooks: EBookPayloadType[]
): {
	readingTime: number
	uploadedEbook: StoredEBook[]
	chaptersCount: number
} => {
	const readingTime = calculateReadingTime(
		ebooks
			.map(ebook => ebook.chapters.map(chapter => chapter.text).join(' '))
			.join(' ')
	)
	const uploadedEbook = ebooks.map((ebook, ebookIndex) => ({
		id: ebookIndex + 1,
		title: ebook.title,
		chapters: ebook.chapters.map((chapter, chapterIndex) => ({
			id: chapterIndex + 1,
			romanNumber: convertToRoman(chapterIndex + 1),
			readingTime: calculateReadingTime(chapter.text),
			name: chapter.name,
			text: chapter.text
		}))
	}))

	const chaptersCount = ebooks
		.map(ebook => ebook.chapters.length)

		.reduce((a, b) => a + b, 0)
	return {
		uploadedEbook,
		readingTime,
		chaptersCount
	}
}
