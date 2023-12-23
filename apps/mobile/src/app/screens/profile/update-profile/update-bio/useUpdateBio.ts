import type { UserUpdateBioTypes } from '@/screens/profile/update-profile/update-bio/types'
import { userServices } from '@/services/user/user-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { errorCatch } from 'global/utils/catch-error'
import Toast from 'react-native-toast-message'

export const useUpdateBio = () => {
	const queryClient = useQueryClient()
	const { mutateAsync } = useMutation(
		['update profile bio'],
		(data: UserUpdateBioTypes) => userServices.updateBio(data),
		{
			onError(error: string) {
				Toast.show({
					text1: 'Update profile',
					text2: errorCatch(error),
					type: 'error'
				})
			},
			async onSuccess() {
				Toast.show({
					text1: 'Update profile',
					text2: 'update was successful',
					type: 'success'
				})
				await queryClient.invalidateQueries(['user-profile'])
			}
		}
	)

	const onSubmit = async (data: UserUpdateBioTypes) => {
		await mutateAsync(data)
	}

	return { onSubmit }
}
