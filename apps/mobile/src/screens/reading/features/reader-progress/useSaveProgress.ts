import { useAction, useTypedNavigation } from '@/hooks'
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
	const { addHistory, setStartFromReadingScreen } = useAction()

	useLayoutEffect(() => {
		setStartFromReadingScreen(true)
	}, [])

	useEffect(() => {
		const appLeaveListener = AppState.addEventListener(
			'change',
			nextAppState => {
				if (readerLoading) return
				if (/inactive|background/.test(nextAppState)) {
					addHistory({
						bookSlug: slug,
						progress: progress,
						scrollPosition: scrollPosition,
						endDate: new Date(),
						startDate: startReadingDate,
						readingTimeMs: new Date().getTime() - startReadingDate.getTime()
					})
				}
			}
		)
		const unsubscribe = addListener('beforeRemove', () => {
			if (readerLoading) return
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

		return () => {
			unsubscribe()
			appLeaveListener.remove()
		}
	}, [
		addListener,
		slug,
		progress,
		scrollPosition,
		addHistory,
		setStartFromReadingScreen,
		readerLoading,
		startReadingDate,
		AppState
	])
}
