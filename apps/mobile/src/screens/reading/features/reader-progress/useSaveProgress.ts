import { useAction, useTypedNavigation } from '@/hooks'
import { useEffect } from 'react'
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
	const { addListener } = useTypedNavigation()
	const { updateReadingProgress } = useAction()

	useEffect(() => {
		const unsubscribe = addListener('beforeRemove', () => {
			if (readerLoading) return
			updateReadingProgress({
				slug,
				progress: progress,
				scrollPosition: scrollPosition
			})
		})
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (readerLoading) return
			if (/inactive|background/.test(nextAppState)) {
				updateReadingProgress({
					slug,
					progress: progress,
					scrollPosition: scrollPosition
				})
			}
		})
		return () => {
			unsubscribe()
			subscription.remove()
		}
	}, [addListener, slug, progress, scrollPosition, updateReadingProgress])
}
