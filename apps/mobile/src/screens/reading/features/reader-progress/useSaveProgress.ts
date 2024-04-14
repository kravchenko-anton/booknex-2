import { useAction, useTypedNavigation } from '@/hooks'
import { useEffect } from 'react'
import { AppState } from 'react-native'

interface SaveProgressProperties {
	slug: string
	scrollPosition: number
	readerLoading: boolean
}
export const useSaveProgress = ({
	slug,
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
				scrollPosition: scrollPosition
			})
		})
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (readerLoading) return
			if (/inactive|background/.test(nextAppState)) {
				updateReadingProgress({
					slug,
					scrollPosition: scrollPosition
				})
			}
		})
		return () => {
			unsubscribe()
			subscription.remove()
		}
	}, [addListener, slug, scrollPosition, updateReadingProgress])
}
