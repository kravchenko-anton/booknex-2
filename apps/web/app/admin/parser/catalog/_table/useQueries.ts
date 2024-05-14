import api from '@/services/api'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: books } = useQuery({
		queryKey: QueryKeys.bookTemplate.catalog.action(searchTerm, page),
		queryFn: () => api.parser.catalog(searchTerm, +page),
		select: data => data.data
	})

	const { mutateAsync: deleteTemplate, isPending: deleteTemplateLoading } =
		useMutation({
			mutationKey: MutationKeys.bookTemplate.deleteTemplate,
			mutationFn: (slug: string) => api.parser.remove(slug),
			async onSuccess() {
				successToast('Template deleted')
				await queryClient.invalidateQueries({
					queryKey: QueryKeys.bookTemplate.catalog.key
				})
			}
		})

	return {
		books,
		deleteTemplate,
		deleteTemplateLoading
	}
}
