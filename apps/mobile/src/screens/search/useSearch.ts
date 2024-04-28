import api from '@/api'
import { useSearchForm } from '@/screens/search/useSearchForm'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useEffect } from 'react'
import { Keyboard } from 'react-native'

export const useSearch = () => {
	const { searchTerm, debouncedSearchTerm, control, clearSearch } =
		useSearchForm()
	const {
		data: books,
		isLoading: booksLoading,
		isSuccess
	} = useQuery({
		queryKey: QueryKeys.searchByTerm(debouncedSearchTerm),
		queryFn: () => api.catalog.search(debouncedSearchTerm),
		enabled: !!debouncedSearchTerm && debouncedSearchTerm.length >= 3,
		select: data => data.data
	})
	useEffect(() => {
		Keyboard.dismiss()
	}, [isSuccess])

	return { books, clearSearch, booksLoading, control, searchTerm }
}
