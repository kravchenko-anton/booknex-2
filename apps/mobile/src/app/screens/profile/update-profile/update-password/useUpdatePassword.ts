import type { EditPasswordTypes } from '@/screens/profile/update-profile/update-password/types'
import { userServices } from '@/services/user/user-service'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { errorCatch } from 'global/utils/catch-error'

export const useUpdatePassword = () => {
	const { mutateAsync } = useMutation(
		['update profile password'],
		(data: EditPasswordTypes) => userServices.updatePassword(data),
		{
			onError(error: string) {
				errorToast(errorCatch(error))
			},
			onSuccess() {
				successToast('Password updated')
			}
		}
	)

	const onSubmit = async (data: EditPasswordTypes) => {
		await mutateAsync(data)
	}

	return { onSubmit }
}
