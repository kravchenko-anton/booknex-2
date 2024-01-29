import { userServices } from '@/shared/services/user/user-service'
import { successToast } from '@/shared/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: users } = useQuery({
		queryKey: ['users', searchTerm, page],
		queryFn: () =>
			userServices.all({
				searchTerm: searchTerm,
				page: +page
			})
	})

	const { mutateAsync: deleteUser } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: number) => userServices.delete(id),
		onError(error: string) {
			console.log('error', error)
		},
		async onSuccess() {
			successToast('User deleted')
			await queryClient.invalidateQueries(['users', searchTerm, page])
		}
	})

	return {
		users,
		deleteUser
	}
}
