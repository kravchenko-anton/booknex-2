import type { EditPasswordTypes } from '@/screens/profile/update-profile/update-password/update-password-types'
import { userServices } from '@/services/user-service'
import { errorCatch } from '@/utils/catch-error'
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

export const useUpdatePassword = () => {
	const { mutateAsync } = useMutation(
		['update profile password'],
		(data: EditPasswordTypes) => userServices.updatePassword(data),
		{
			onError(error: string) {
				Toast.show({
					text1: 'Update profile',
					text2: errorCatch(error),
					type: 'error'
				})
			},
			onSuccess() {
				Toast.show({
					text1: 'Password update',
					text2: 'successful',
					type: 'success'
				})
			}
		}
	)

	const onSubmit = async (data: EditPasswordTypes) => {
		await mutateAsync(data)
	}

	return { onSubmit }
}
