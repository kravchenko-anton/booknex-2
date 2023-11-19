import { useSearchForm } from '@/screens/search/useSearchForm'
import { catalogService } from '@/services/catalog-service'
import { useQuery } from '@tanstack/react-query'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control } = useSearchForm()
	const { data: books, isLoading: bookLoading } = useQuery(
		['search book', debouncedSearch],
		() => catalogService.search(debouncedSearch),
		{
			enabled: !!debouncedSearch
		}
	)
	const { data: topSearches, isLoading: topSearchesLoading } = useQuery(
		['top searchers'],
		() => catalogService.getSearchExamples()
	)
	return {
		books,
		bookLoading,
		topSearches,
		topSearchesLoading,
		control,
		searchTerm
	}
}
