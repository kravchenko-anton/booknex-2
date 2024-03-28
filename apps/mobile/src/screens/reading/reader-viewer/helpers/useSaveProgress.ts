import { useAction, useTypedNavigation } from '@/hooks'
import { useEffect } from 'react'
import { AppState } from 'react-native'

export const useSaveProgress = ({
	slug,
	progress,
	scrollPosition
}: {
	slug: string
	progress: number
	scrollPosition: number
}) => {
	const { addListener } = useTypedNavigation()
	const { updateReadingProgress } = useAction()

	useEffect(() => {
		const unsubscribe = addListener('beforeRemove', () => {
			updateReadingProgress({
				slug,
				progress: progress,
				scrollPosition: scrollPosition
			})
		})
		const subscription = AppState.addEventListener('change', nextAppState => {
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
