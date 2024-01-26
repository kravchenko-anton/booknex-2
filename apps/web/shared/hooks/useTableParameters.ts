import { useSearchParams } from 'next/navigation'

export const useTableParameters = () => {
	const parameters = useSearchParams()
	const searchTerm = parameters.get('searchTerm') ?? ''
	const page = +(parameters.get('page') ?? 0)

	return { searchTerm, page }
}
