import { useSearchForm } from '@/screens/search/useSearchForm'
import { catalogService } from '@/shared/api/services'
import { useQuery } from '@tanstack/react-query'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control, clearSearch } = useSearchForm()
	const { data: books, isLoading: booksLoading } = useQuery({
		queryKey: ['search', debouncedSearch],
		queryFn: () => catalogService.search(debouncedSearch),
		enabled: !!debouncedSearch && debouncedSearch.length >= 3
	})
	return { books, clearSearch, booksLoading, control, searchTerm }
}
