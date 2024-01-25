import { useAction, useTypedNavigation } from '@/shared/hooks'
import { useEffect } from 'react'
import { AppState } from 'react-native'

export const useSaveProgress = async ({
	id,
	readerState
}: {
	id: number
	readerState: {
		progress: number
		scrollTop: number
	}
}) => {
	const { addListener } = useTypedNavigation()
	const { updateReadingProgress } = useAction()

	useEffect(() => {
		const unsubscribe = addListener('beforeRemove', () => {
			updateReadingProgress({
				id,
				progress: readerState.progress,
				location: readerState.scrollTop
			})
		})
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (/inactive|background/.test(nextAppState)) {
				updateReadingProgress({
					id,
					progress: readerState.progress,
					location: readerState.scrollTop
				})
			}
		})
		return () => {
			unsubscribe()
			subscription.remove()
		}
	}, [
		addListener,
		id,
		readerState.progress,
		readerState.scrollTop,
		updateReadingProgress
	])
}
