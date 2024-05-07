import api from '@/api'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useShallow } from 'zustand/react/shallow'

export const useStatisticsWithSync = () => {
	const { history = [], clearHistory } = useReadingProgressStore(
		useShallow(state => ({
			history: state.history,
			clearHistory: state.clearHistory
		}))
	)
	const { data: statistics, isLoading } = useQuery({
		queryKey: QueryKeys.userStatistics,
		queryFn: () =>
			api.user.statistics(
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
		retryOnMount: history.length > 0,
		retry: history.length > 0,
		onSuccess: () => {
			console.log('sync success, clear history', history)
			clearHistory()
		},
		onError: () => console.log('Failed to sync statistics')
	})

	return { isLoading, statistics }
}
