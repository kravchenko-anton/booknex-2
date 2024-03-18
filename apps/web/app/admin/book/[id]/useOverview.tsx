import api from '@/services'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
//TODO: переделать всё к чертовой матери и повыносить обновление и создание отдельно и сделать нормальные мутации чтобы не было ничего такого в обном файле
export const useOverview = () => {
	const parameters = useParams()
	const queryClient = useQueryClient()
	const parametersId = +parameters.id || 0
	const id =
		!Number.isNaN(parametersId) && parametersId > 0 && parametersId < 10_000
			? parametersId
			: 0

	const { data: book } = useQuery({
		queryKey: ['book-overview', id],
		queryFn: () => api.book.infoByIdAdmin(id),
		select: data => data.data
	})

	return {
		book,
		onUpdateSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['book-overview', id]
			})
		}
	}
}
