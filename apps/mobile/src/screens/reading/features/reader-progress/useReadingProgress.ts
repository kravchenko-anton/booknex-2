import { useTypedSelector } from '@/hooks'
import { useSaveProgress } from '@/screens/reading/features/reader-progress/useSaveProgress'
import type { WebviewMessageType } from '@/screens/reading/reader-viewer/useReaderMessage'
import { useState } from 'react'

interface ReadingProgressProperties {
	slug: string
	readerLoading: boolean
}

export interface ReadingProgressType {
	progress: number
	chapter: {
		link: string
		progress: number
	}
}

export const useReadingProgress = ({
	readerLoading,
	slug
}: ReadingProgressProperties) => {
	const { books } = useTypedSelector(state => state.readingProgress)
	const [scrollPosition, setScrollPosition] = useState(
		books.find(book => book.slug === slug)?.latestProgress.scrollPosition || 1
	)
	const [readingProgress, setReadingProgress] = useState<ReadingProgressType>({
		progress: 0,
		chapter: {
			link: '',
			progress: 0
		}
	})

	useSaveProgress({
		slug,
		scrollPosition,
		readerLoading
	})

	const clearProgress = () => {
		setScrollPosition(0)
		setReadingProgress({
			progress: 0,
			chapter: {
				link: '',
				progress: 0
			}
		})
	}

	const updateReadingProgress = (payload: WebviewMessageType['payload']) => {
		setReadingProgress({
			progress: payload.progress,
			chapter: {
				link: payload.chapter.chapterLink,
				progress: payload.chapter.chapterProgress
			}
		})
		setScrollPosition(payload.scrollTop)
	}

	return {
		scrollPosition,
		readingProgress,
		updateReadingProgress,
		clearProgress
	}
}
