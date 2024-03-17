import api from '@/services'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: books } = useQuery({
		queryKey: ['book-templates', searchTerm, page],
		queryFn: () => api.parser.adminCatalog(searchTerm, +page),
		select: data => data.data
	})

	const { mutateAsync: deleteFromParser, isLoading: deleteFromParserLoading } =
		useMutation({
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
		deleteFromParser,
		deleteFromParserLoading
	}
}
