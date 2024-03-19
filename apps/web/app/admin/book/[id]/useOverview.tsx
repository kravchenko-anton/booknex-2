import api from '@/services'
import { validateNumberParameter } from '@/utils/validate-parameter'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export const useOverview = () => {
	const parameters = useParams()
	const queryClient = useQueryClient()

	const id = validateNumberParameter(parameters.id)

	const { data: book } = useQuery({
		queryKey: ['book-overview', id],
		queryFn: () => api.book.adminInfoById(id),
		select: data => data.data
	})

	return {
		book,
		onUpdateSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['book-overview', id]
			})
		}
	}
}
