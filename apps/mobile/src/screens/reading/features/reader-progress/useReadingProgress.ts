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
	const { history = [] } = useTypedSelector(state => state.readingProgress)
	const [scrollPosition, setScrollPosition] = useState(
		history.find(book => book.slug === slug)?.scrollPosition || 1
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
		progress: readingProgress.progress,
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
