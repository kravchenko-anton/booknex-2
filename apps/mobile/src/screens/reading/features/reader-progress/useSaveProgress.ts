import { useTypedNavigation } from '@/hooks'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { useEffect, useLayoutEffect, useState } from 'react'
import { AppState } from 'react-native'

interface SaveProgressProperties {
	slug: string
	progress: number
	scrollPosition: number
	readerLoading: boolean
}
//TODO: проверить и добавить больше обработчкиов для лива
export const useSaveProgress = ({
	slug,
	progress,
	scrollPosition,
	readerLoading
}: SaveProgressProperties) => {
	const [startReadingDate] = useState(new Date()) // eslint-disable-line
	const { addListener } = useTypedNavigation()
	const { addHistory, setStartFromReadingScreen } = useReadingProgressStore()
	useLayoutEffect(() => {
		setStartFromReadingScreen(true)
	}, [setStartFromReadingScreen])

	useEffect(() => {
		if (readerLoading) return
		const unsubscribe = addListener('beforeRemove', () => {
			addHistory({
				bookSlug: slug,
				progress: progress,
				scrollPosition: scrollPosition,
				endDate: new Date(),
				startDate: startReadingDate,
				readingTimeMs: new Date().getTime() - startReadingDate.getTime()
			})
			setStartFromReadingScreen(false)
		})

		const subscription = AppState.addEventListener('change', nextAppState => {
			if (nextAppState === 'active') return
			addHistory({
				bookSlug: slug,
				progress: progress,
				scrollPosition: scrollPosition,
				endDate: new Date(),
				startDate: startReadingDate,
				readingTimeMs: new Date().getTime() - startReadingDate.getTime()
			})
			setStartFromReadingScreen(true)
		})
		return () => {
			unsubscribe()
			subscription.remove()
		}
	}, [
		addListener,
		progress,
		scrollPosition,
		addHistory,
		slug,
		startReadingDate,
		AppState
	])
}
