import api from '@/api'
import { compareReadingBooks } from '@/screens/library/compareReadingBooks'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { errorToast } from '@/utils/toast'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const useLibraryWithSync = () => {
	const { history, clearHistory } = useReadingProgressStore(
		useShallow(state => ({
			history: state.history,
			clearHistory: state.clearHistory
		}))
	)
	console.log('actual history in library', history)
	const {
		data: library,
		isLoading,
		isSuccess,
		isError
	} = useQuery({
		queryKey: QueryKeys.library,
		queryFn: () => api.user.library(history),
		select: data => data.data,
		staleTime: 0,
		gcTime: Number.POSITIVE_INFINITY,
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

	const libraryWithCompareReadingBooks = {
		finishedBooks: library?.finishedBooks || [],
		savedBooks: library?.savedBooks || [],
		readingBooks: compareReadingBooks(library?.readingBooks || [], history)
	}

	return { library: libraryWithCompareReadingBooks, isLoading, history }
}
