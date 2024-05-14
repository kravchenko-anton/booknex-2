import api from '@/api'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { errorToast } from '@/utils/toast'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const useStatisticsWithSync = () => {
	const { history = [], clearHistory } = useReadingProgressStore(
		useShallow(state => ({
			history: state.history,
			clearHistory: state.clearHistory
		}))
	)
	const {
		data: statistics,
		isLoading,
		isSuccess,
		isError,
		refetch
	} = useQuery({
		queryKey: QueryKeys.userStatistics,
		queryFn: () => api.user.statistics(history),
		select: data => data.data,
		staleTime: 0,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: history.length > 0
	})

	useEffect(() => {
		if (isSuccess) {
			console.log('syncing library')
			clearHistory()
		}
		if (isError) {
			console.log('failed to sync library')
			errorToast('Failed to sync library')
		}
	}, [isSuccess, clearHistory])

	return { isLoading, statistics, refetch }
}
