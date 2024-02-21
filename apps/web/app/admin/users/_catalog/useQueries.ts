import api from '@/services/api/api'
import { userServices } from '@/services/user/user-service'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: users } = useQuery({
		queryKey: ['users', searchTerm, page],
		queryFn: () => api.user.all(searchTerm, +page)
	})

	const { mutateAsync: deleteUser } = useMutation({
		mutationKey: ['delete-user'],
		mutationFn: (id: number) => userServices.delete(id),
		onError(error: string) {
			console.log('error', error)
		},
		async onSuccess() {
			successToast('User deleted')
			await queryClient.invalidateQueries({
				queryKey: ['users']
			})
		}
	})

	return {
		users,
		deleteUser
	}
}
