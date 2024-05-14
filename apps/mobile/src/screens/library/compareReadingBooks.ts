import type { ReadingHistoryType } from '@/screens/reading/store/progress-store'
import { historyByLatestSorting } from '@/utils'
import type {
	UserLibraryOutput,
	UserLibraryOutputReadingBooksInner
} from 'global/api-client'

export type CompareReadingBooksType = Omit<
	UserLibraryOutputReadingBooksInner,
	'readingHistory'
> & {
	progress: number
	scrollPosition: number | undefined
}
export const compareReadingBooks = (
	readingList: UserLibraryOutput['readingBooks'],
	history: ReadingHistoryType[]
) => {
	{
		const latestHistory = historyByLatestSorting(history)

		return readingList
			.sort((a, b) => {
				if (
					history.some(h => h.bookSlug === a.slug) &&
					history.some(h => h.bookSlug === b.slug)
				) {
					return (
						(history.find(h => h.bookSlug === a.slug)?.endProgress || 0) -
						(history.find(h => h.bookSlug === b.slug)?.endProgress || 0)
					)
				}
				if (history.some(h => h.bookSlug === a.slug)) return -1
				if (history.some(h => h.bookSlug === b.slug)) return 1
				return 0
			})
			.map(book => {
				const progress = latestHistory.some(b => b.bookSlug === book.slug)
					? (latestHistory.find(b => b.bookSlug === book.slug)?.endProgress ||
							0) / 100
					: (book.readingHistory?.progress || 0) / 100
				const scrollPosition = latestHistory.some(b => b.bookSlug === book.slug)
					? latestHistory.find(b => b.bookSlug === book.slug)?.scrollPosition ||
						0
					: book.readingHistory?.scrollPosition

				return {
					slug: book.slug,
					title: book.title,
					picture: book.picture,
					author: book.author,
					progress,
					scrollPosition
				}
			})
	}
}
