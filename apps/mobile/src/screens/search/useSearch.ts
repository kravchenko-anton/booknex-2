import api from '@/api'
import { useSearchForm } from '@/screens/search/useSearchForm'
import { useQuery } from '@tanstack/react-query'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control, clearSearch } = useSearchForm()
	const { data: books, isLoading: booksLoading } = useQuery({
		queryKey: ['search', debouncedSearch],
		queryFn: () => api.catalog.search(debouncedSearch),
		enabled: !!debouncedSearch && debouncedSearch.length >= 3,
		select: data => data.data
	})
	return { books, clearSearch, booksLoading, control, searchTerm }
}
