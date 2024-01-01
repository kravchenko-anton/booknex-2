import { useSearchForm } from '@/screens/search/useSearchForm'
import { catalogService } from '@/services/catalog/catalog-service'
import { useQuery } from '@tanstack/react-query'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control, clearSearch } = useSearchForm()
	const { data: books, isLoading: booksLoading } = useQuery(
		['search', debouncedSearch],
		() => catalogService.search(debouncedSearch),
		{
			enabled: !!debouncedSearch && debouncedSearch.length > 2
		}
	)
	return {
		books,
		clearSearch,
		booksLoading,
		control,
		searchTerm
	}
}
