import { useSearchForm } from '@/screens/explore/useSearchForm'
import { catalogService } from '@/services/catalog/catalog-service'
import { useQuery } from '@tanstack/react-query'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control } = useSearchForm()
	const { data: books, isLoading: booksLoading } = useQuery(
		['explore-book', debouncedSearch],
		() => catalogService.search(debouncedSearch),
		{
			enabled: !!debouncedSearch
		}
	)
	const { data: searchExamples, isLoading: searchExamplesLoading } = useQuery(
		['explore-examples'],
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
