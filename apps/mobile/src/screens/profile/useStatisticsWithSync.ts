import api from '@/api'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useShallow } from 'zustand/react/shallow'

export const useStatisticsWithSync = () => {
	const isFocus = useIsFocused()
	const { history, clearHistory } = useReadingProgressStore(
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
		refetchOnWindowFocus: true,
		staleTime: 0,
		retry: true,
		retryOnMount: true,
		enabled: isFocus,
		onSuccess: () => {
			console.log('sync success, clear history', history)
			clearHistory()
		},
		onError: () => console.log('Failed to sync statistics')
	})

	return { isLoading, statistics }
}
