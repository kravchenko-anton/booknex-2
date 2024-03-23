import { useAction, useTypedNavigation } from '@/hooks'
import { useEffect } from 'react'
import { AppState } from 'react-native'

export const useSaveProgress = ({
	id,
	progress,
	scrollPosition
}: {
	id: number
	progress: number
	scrollPosition: number
}) => {
	const { addListener } = useTypedNavigation()
	const { updateReadingProgress } = useAction()

	useEffect(() => {
		const unsubscribe = addListener('beforeRemove', () => {
			updateReadingProgress({
				id,
				progress: progress,
				scrollPosition: scrollPosition
			})
		})
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (/inactive|background/.test(nextAppState)) {
				updateReadingProgress({
					id,
					progress: progress,
					scrollPosition: scrollPosition
				})
			}
		})
		return () => {
			unsubscribe()
			subscription.remove()
		}
	}, [addListener, id, progress, scrollPosition, updateReadingProgress])
}
