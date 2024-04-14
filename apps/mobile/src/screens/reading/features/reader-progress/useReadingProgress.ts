import { useTypedSelector } from '@/hooks'
import { useSaveProgress } from '@/screens/reading/features/reader-progress/useSaveProgress'
import { useState } from 'react'

interface ReadingProgressProperties {
	slug: string
	readerLoading: boolean
}

export const useReadingProgress = ({
	readerLoading,
	slug
}: ReadingProgressProperties) => {
	const { books } = useTypedSelector(state => state.readingProgress)
	const [scrollPosition, setScrollPosition] = useState(
		books.find(book => book.slug === slug)?.latestProgress.scrollPosition || 1
	)
	const [readingProgress, setReadingProgress] = useState({
		bookProgress: 0,
		chapterProgress: 0
	})

	useSaveProgress({
		slug,
		scrollPosition,
		readerLoading
	})

	const clearProgress = () => {
		setScrollPosition(0)
		setReadingProgress({
			bookProgress: 0,
			chapterProgress: 0
		})
	}

	return {
		scrollPosition,
		setScrollPosition,
		readingProgress,
		setReadingProgress,
		clearProgress
	}
}
