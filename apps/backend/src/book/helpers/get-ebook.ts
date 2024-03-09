import { convertToRoman } from '../../utils/common/romanize-number'
import type { EBookPayload } from '../ebook.model'

const calculateReadingTime = (text: string) => {
	const wordsPerMinute = 200
	const words = text.split(' ').length
	const minutes = words / wordsPerMinute
	return Math.ceil(minutes)
}

export const useGetEbook = (ebooks: EBookPayload[]) => {
	const uploadedEbook = ebooks.map((ebook, ebookIndex) => ({
		id: ebookIndex + 1,
		title: ebook.title,
		chapters: ebook.chapters.map((chapter, chapterIndex) => ({
			id: chapterIndex + 1,
			name: chapter.name,
			text: chapter.text,
			romanNumber: convertToRoman(chapterIndex + 1)
		}))
	}))
	const readingTime = calculateReadingTime(
		ebooks
			.map(ebook => ebook.chapters.map(chapter => chapter.text).join(' '))
			.join(' ')
	)
	const chaptersCount = ebooks
		.map(ebook => ebook.chapters.length)
		.reduce((a, b) => a + b, 0)
	return {
		uploadedEbook,
		readingTime,
		chaptersCount
	}
}
