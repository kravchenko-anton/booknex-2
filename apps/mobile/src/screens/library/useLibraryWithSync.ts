import api from '@/api'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { errorToast } from '@/utils/toast'
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useShallow } from 'zustand/react/shallow'

export const useLibraryWithSync = () => {
	const isFocus = useIsFocused()
	const { history, clearHistory } = useReadingProgressStore(
		useShallow(state => ({
			history: state.history,
			clearHistory: state.clearHistory
		}))
	)
	console.log('actual history in library', history)
	const { data: library, isLoading } = useQuery({
		queryKey: QueryKeys.library,
		queryFn: () =>
			api.user.library(
				history.map(b => ({
					...b,
					startDate: b.startDate as unknown as string,
					endDate: b.endDate as unknown as string
				}))
			),
		select: data => data.data,
		staleTime: 0,
		refetchOnMount: history.length > 0,
		refetchOnWindowFocus: history.length > 0,
		onError: () => isFocus && errorToast('Failed to sync library'),
		onSuccess: () => {
			console.log('sync profile success, clear history', history)
			clearHistory()
		}
	})

	return { library, isLoading, history }
}
