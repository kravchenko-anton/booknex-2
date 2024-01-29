import { parserService } from '@/shared/services/parser/parser-services'
import { successToast } from '@/shared/utils/toast'
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
		mutationKey: ['delete book from parser'],
		mutationFn: (id: number) => parserService.delete(id),
		async onSuccess() {
			successToast('Book deleted')
			await queryClient.invalidateQueries(['book-templates'])
		}
	})

	return {
		books,
		deleteFromParser
	}
}
