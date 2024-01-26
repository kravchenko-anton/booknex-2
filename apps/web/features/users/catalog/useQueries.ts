import { userServices } from '@/shared/services/user/user-service'
import { successToast } from '@/shared/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: users } = useQuery(['users', searchTerm, page], () =>
		userServices.all({
			searchTerm: searchTerm,
			page: page
		})
	)

	const { mutateAsync: deleteUser } = useMutation(
		['delete  author'],
		(id: number) => userServices.delete(id),
		{
			onSuccess: async () => {
				successToast('User deleted')
				await queryClient.invalidateQueries(['users', searchTerm, page])
			}
		}
	)

	return {
		users,
		deleteUser
	}
}
