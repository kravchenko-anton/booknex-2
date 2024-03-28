import api from '@/services/api'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: books } = useQuery({
		queryKey: ['book-templates', searchTerm, page],
		queryFn: () => api.parser.catalog(searchTerm, +page),
		select: data => data.data
	})

	const { mutateAsync: deleteTemplate, isLoading: deleteTemplateLoading } =
		useMutation({
			mutationKey: ['delete-template'],
			mutationFn: (slug: string) => api.parser.remove(slug),
			async onSuccess() {
				successToast('Book deleted')
				await queryClient.invalidateQueries({
					queryKey: ['book-templates']
				})
			}
		})

	return {
		books,
		deleteTemplate,
		deleteTemplateLoading
	}
}
