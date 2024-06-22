import api from '@/services/api'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: users } = useQuery({
		queryKey: QueryKeys.users.catalog.action(searchTerm, page),
		queryFn: () => api.user.catalog(searchTerm, +page),
		select: data => data.data
	})

	const { mutateAsync: deleteUser, isPending: deleteUserLoading } = useMutation(
		{
			mutationKey: MutationKeys.user.remove,
			mutationFn: (id: string) => api.user.remove(id),
			onError(error: string) {
				console.log('error', error)
			},
			async onSuccess() {
				successToast('User deleted')
				await queryClient.invalidateQueries({
					queryKey: QueryKeys.users.catalog.key
				})
			}
		}
	)

	return {
		users,
		deleteUser,
		deleteUserLoading
	}
}
