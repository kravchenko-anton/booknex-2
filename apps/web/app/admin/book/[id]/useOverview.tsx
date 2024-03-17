import api from '@/services'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { PayloadEBook } from 'global/api-client'
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

	const { mutateAsync: updateEbook, isLoading: updateEbookLoading } =
		useMutation({
			mutationKey: ['update-picture'],
			mutationFn: ({ id, payload }: { id: number; payload: PayloadEBook[] }) =>
				api.book.updateEbook(id, payload),
			onSuccess: async () => {
				successToast('Book updated')
				await queryClient.invalidateQueries({
					queryKey: ['book-overview', id]
				})
			}
		})

	return {
		book,
		updateEbook,
		updateEbookLoading,
		onUpdateSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['book-overview', id]
			})
		}
	}
}
