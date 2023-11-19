import { useDebounce } from '@/utils/useDebounce'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export interface ISearchFormData {
	searchTerm: string
}

export const useSearchForm = () => {
	const { control, watch } = useForm<ISearchFormData>({
		mode: 'onChange',
		defaultValues: {
			searchTerm: ''
		}
	})

	const searchTerm = watch('searchTerm')
	const debouncedSearch = useDebounce(searchTerm, 500)

	return useMemo(
		() => ({ debouncedSearch, searchTerm, control }),
		[searchTerm, debouncedSearch]
	)
}
