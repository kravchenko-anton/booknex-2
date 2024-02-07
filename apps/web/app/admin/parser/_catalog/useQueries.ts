import { parserService } from '@/services/parser/parser-services'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: books } = useQuery({
		queryKey: ['book-templates', searchTerm, page],
		queryFn: () =>
			parserService.all({
				searchTerm: searchTerm,
				page: +page
			})
	})

	const { mutateAsync: deleteFromParser } = useMutation({
		mutationKey: ['delete-template'],
		mutationFn: (id: number) => parserService.delete(id),
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
