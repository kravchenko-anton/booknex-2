import api from '@/services'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: books } = useQuery({
		queryKey: ['book-templates', searchTerm, page],
		queryFn: () => api.parser.all(searchTerm, +page)
	})

	const { mutateAsync: deleteFromParser } = useMutation({
		mutationKey: ['delete-template'],
		mutationFn: (id: number) => api.parser.remove(id),
		async onSuccess() {
			successToast('Book deleted')
			await queryClient.invalidateQueries({
				queryKey: ['book-templates']
			})
		}
	})

	return {
		books,
		deleteFromParser
	}
}
