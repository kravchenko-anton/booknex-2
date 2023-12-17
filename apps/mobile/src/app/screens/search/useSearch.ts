import { useSearchForm } from '@/screens/search/useSearchForm'
import { catalogService } from '@/services/catalog/catalog-service'
import { useQuery } from '@tanstack/react-query'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control } = useSearchForm()
	const { data: books, isLoading: booksLoading } = useQuery(
		['search-book', debouncedSearch],
		() => catalogService.search(debouncedSearch),
		{
			enabled: !!debouncedSearch
		}
	)
	const { data: searchExamples, isLoading: searchExamplesLoading } = useQuery(
		['search-examples'],
		() => catalogService.searchExamples()
	)
	return {
		books,
		booksLoading,
		searchExamples,
		searchExamplesLoading,
		control,
		searchTerm
	}
}
