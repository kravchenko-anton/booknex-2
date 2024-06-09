import api from '@/api'
import { compareReadingBooks } from '@/screens/library/compareReadingBooks'
import { useReadingProgressStore } from '@/screens/reader/feature/reading-progress/progress-store'
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useEffect } from 'react'
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
	const {
		data: library,
		isLoading,
		refetch,
		isSuccess
	} = useQuery({
		queryKey: QueryKeys.library,
		queryFn: () => api.user.library(history),
		select: data => data.data,
		staleTime: 0,
		refetchOnMount: history.length > 0,
		refetchOnWindowFocus: history.length > 0
	})

	useEffect(() => {
		isFocus && clearHistory()
	}, [isSuccess])
	return {
		library,
		isLoading,
		history,
		refetch,
		readingList: compareReadingBooks(library?.readingBooks || [], history)
	}
}
