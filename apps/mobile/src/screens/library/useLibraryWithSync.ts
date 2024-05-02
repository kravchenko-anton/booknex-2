import api from '@/api'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useShallow } from 'zustand/react/shallow'

export const useLibraryWithSync = () => {
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
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		retry: history.length > 0,
		onSuccess: () => {
			console.log('sync success, clear history', history)
			clearHistory()
		}
	})

	return { library, isLoading, history }
}
