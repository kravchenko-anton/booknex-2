import api from '@/api'
import { useSearchForm } from '@/screens/search/useSearchForm'
import { useQuery } from '@tanstack/react-query'

export const useSearch = () => {
	const { searchTerm, debouncedSearchTerm, control, clearSearch } =
		useSearchForm()
	const { data: books, isLoading: booksLoading } = useQuery({
		queryKey: ['search', debouncedSearchTerm],
		queryFn: () => api.catalog.search(debouncedSearchTerm),
		enabled: !!debouncedSearchTerm && debouncedSearchTerm.length >= 3,
		select: data => data.data
	})
	return { books, clearSearch, booksLoading, control, searchTerm }
}
