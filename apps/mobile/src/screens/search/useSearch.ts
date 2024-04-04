import api from '@/api'
import { useSearchForm } from '@/screens/search/useSearchForm'
import { useQuery } from '@tanstack/react-query'

export const useSearch = () => {
	const { searchTerm, control, clearSearch } = useSearchForm()
	const { data: books, isLoading: booksLoading } = useQuery({
		queryKey: ['search', searchTerm],
		queryFn: () => api.catalog.search(searchTerm),
		enabled: !!searchTerm && searchTerm.length >= 3,
		select: data => data.data
	})
	return { books, clearSearch, booksLoading, control, searchTerm }
}
