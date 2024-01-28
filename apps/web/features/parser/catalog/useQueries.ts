import { parserService } from '@/shared/services/parser/parser-services'
import { successToast } from '@/shared/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: books } = useQuery(['book-templates', searchTerm, page], () =>
		parserService.all({
			searchTerm: searchTerm,
			page: +page
		})
	)

	const { mutateAsync: deleteFromParser } = useMutation(
		['delete from parser'],
		(id: number) => parserService.delete(id),
		{
			onSuccess: async () => {
				successToast('Book deleted')
				await queryClient.invalidateQueries(['book-templates'])
			}
		}
	)

	return {
		books,
		deleteFromParser
	}
}
