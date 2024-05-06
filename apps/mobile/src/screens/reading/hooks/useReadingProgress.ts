import { useTypedNavigation } from '@/hooks'
import type { WebviewMessageType } from '@/screens/reading/hooks/useReaderMessage'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { getTimeDate } from 'global/utils/getTimeDate'
import { useEffect, useState } from 'react'

interface ReadingProgressProperties {
	slug: string
	readerLoading: boolean
	initialScrollPosition: number
	readingSessionKey: string
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
	slug,
	readingSessionKey,
	initialScrollPosition
}: ReadingProgressProperties) => {
	const [startReadingDate] = useState(getTimeDate()) // eslint-disable-line
	const { addListener } = useTypedNavigation()
	const updateStartFromReadingScreen = useReadingProgressStore(
		state => state.updateStartFromReadingScreen
	)
	const newProgress = useReadingProgressStore(state => state.newProgress)

	const [scrollPosition, setScrollPosition] = useState(
		initialScrollPosition || 0
	)
	const [readingProgress, setReadingProgress] = useState<ReadingProgressType>({
		progress: 0,
		chapter: {
			link: '',
			progress: 0
		}
	})
	useEffect(() => {
		if (readerLoading) return
		return addListener('beforeRemove', () => {
			console.log('beforeRemove')
			updateStartFromReadingScreen({
				id: readingSessionKey,
				startFromReadingScreen: false
			})
		})
	}, [
		addListener,
		readerLoading,
		readingSessionKey,
		updateStartFromReadingScreen
	])

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
		console.log((getTimeDate().getTime() - startReadingDate.getTime()) / 1000)
		newProgress({
			startFromReadingScreen: true,
			id: readingSessionKey,
			bookSlug: slug,
			progress: readingProgress.progress,
			scrollPosition: scrollPosition,
			endDate: getTimeDate(),
			startDate: startReadingDate,
			readingTimeMs: getTimeDate().getTime() - startReadingDate.getTime()
		})
	}

	return {
		scrollPosition,
		readingProgress,
		updateReadingProgress,
		clearProgress
	}
}
