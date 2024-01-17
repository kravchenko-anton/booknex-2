import { authorService } from '@/services/author/author-service'
import { parserService } from '@/services/parser/parser-services'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ParserDtoPayload } from 'global/services-types/parser-types'
import { toast } from 'sonner'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: books = [] } = useQuery(
		['good-reads books', searchTerm, page],
		() =>
			parserService.all({
				searchTerm: searchTerm,
				page: +page
			})
	)
	const { mutateAsync: checkAuthorExist } = useMutation(
		['check author exist'],
		(name: string) => authorService.exist(name)
	)
	const { mutateAsync: deleteFromParser } = useMutation(
		['delete from parser'],
		(id: number) => parserService.delete(id),
		{
			onSuccess: async () => {
				successToast('Book deleted')
				await queryClient.invalidateQueries([
					'good-reads books',
					searchTerm,
					page
				])
			}
		}
	)
	const { mutateAsync: parse, isLoading: parseLoading } = useMutation(
		['parse good-reads books'],
		(dto: ParserDtoPayload) => parserService.parse(dto),
		{
			onSuccess: () => {
				toast.loading('Books parsed')
			}
		}
	)

	return {
		books,
		checkAuthorExist,
		deleteFromParser,
		parse,
		parseLoading
	}
}
