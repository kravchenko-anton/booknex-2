import { useAction, useTypedNavigation } from '@/hooks'
import { useEffect, useState } from 'react'
import { AppState } from 'react-native'

interface SaveProgressProperties {
	slug: string
	progress: number
	scrollPosition: number
	readerLoading: boolean
}
export const useSaveProgress = ({
	slug,
	progress,
	scrollPosition,

	readerLoading
}: SaveProgressProperties) => {
	const [startReadingDate] = useState(new Date()) // eslint-disable-line

	const { addListener } = useTypedNavigation()
	const { addHistory } = useAction()

	useEffect(() => {
		const unsubscribe = addListener('beforeRemove', () => {
			if (readerLoading) return
			addHistory({
				slug,
				progress: progress,
				scrollPosition: scrollPosition,
				endDate: new Date(),
				startDate: startReadingDate,
				readTimeMs: new Date().getTime() - startReadingDate.getTime()
			})
		})
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (readerLoading) return
			if (/inactive|background/.test(nextAppState)) {
				addHistory({
					slug,
					progress: progress,
					scrollPosition: scrollPosition,
					endDate: new Date(),
					startDate: startReadingDate,
					readTimeMs: new Date().getTime() - startReadingDate.getTime()
				})
			}
		})
		return () => {
			unsubscribe()
			subscription.remove()
		}
	}, [addListener, slug, progress, scrollPosition, addHistory])
}
