import { useTypedNavigation } from '@/hooks'
import type { WebviewMessageType } from '@/screens/reading/hooks/useReaderMessage'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { getTimeDate } from 'global/utils'
import { useEffect, useState } from 'react'
import { AppState } from 'react-native'

interface ReadingProgressProperties {
	slug: string
	readerLoading: boolean
	initialScrollPosition: number
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
	initialScrollPosition
}: ReadingProgressProperties) => {
	const [readingSessionKey, setReadingSessionKey] = useState(
		slug + Math.random() * 1000
	)
	const [startReadingDate, setStartReadingDate] = useState(getTimeDate())
	const [startReadingProgress, setStartReadingProgress] = useState(0)
	console.log('startReadingDate', startReadingDate)
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

		const listener = AppState.addEventListener(
			'change',
			(nextAppState: string) => {
				if (nextAppState === 'active') {
					setStartReadingDate(getTimeDate())
					setReadingSessionKey(slug + Math.random() * 1000)
				}
			}
		)

		const beforeLeave = addListener('beforeRemove', () => {
			console.log('beforeRemove')
			updateStartFromReadingScreen({
				id: readingSessionKey,
				startFromReadingScreen: false
			})
		})

		return () => {
			beforeLeave()
			listener.remove()
		}
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
		if (!startReadingProgress) {
			setStartReadingProgress(payload.progress)
		}
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
			startProgress: startReadingProgress,
			endProgress: payload.progress,
			progressDelta: payload.progress - startReadingProgress,
			scrollPosition: scrollPosition,
			endDate: getTimeDate() as unknown as string,
			startDate: startReadingDate as unknown as string,
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
