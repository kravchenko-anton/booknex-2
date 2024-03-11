import { useSearchParams } from 'next/navigation'

export const useTableParameters = () => {
	const parameters = useSearchParams()
	const searchTerm = parameters.get('searchTerm') ?? ''
	const page = +(parameters.get('page') ?? 0)
	const dialog = parameters.get('dialog') ?? ''

	return {
		searchTerm: searchTerm,
		page: !Number.isNaN(page) && page > 0 && page < 10_000 ? page : 0,
		dialog
	}
}
