import { authorService } from '@/services/author/author-service'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: authors } = useQuery(['authors ', searchTerm, page], () =>
		authorService.all({
			searchTerm: searchTerm,
			page: +page
		})
	)
	const { mutateAsync: deleteAuthor } = useMutation(
		['delete  author'],
		(id: number) => authorService.delete(id),
		{
			onSuccess: async () => {
				successToast('Author deleted')
				await queryClient.invalidateQueries(['authors', searchTerm, page])
			}
		}
	)
	return {
		authors,
		deleteAuthor
	}
}
