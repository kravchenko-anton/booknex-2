import { storageService } from '@/services/storage/storage-service'
import { userServices } from '@/services/user/user-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { launchImageLibrary } from 'react-native-image-picker'
import Toast from 'react-native-toast-message'
import { StorageFolderEnum } from '../../../../../../../backend/src/storage/storage.types'

export const selectImage = async () => {
	const result = await launchImageLibrary({
		mediaType: 'photo',
		quality: 1
	})
	if (result.didCancel) {
		Toast.show({
			type: 'error',
			text1: 'Error',
			text2: 'Image picker was cancelled'
		})
	}
	return result.assets ? result.assets[0] : undefined
}

export const useUploadUserPicture = (oldPicture?: string) => {
	const QueryClient = useQueryClient()
	const { mutateAsync: UserPictureUpdateMutateAsync } = useMutation(
		['save user picture'],
		(fileName: string) => userServices.updatePicture(fileName),
		{
			onSuccess: () => {
				Toast.show({
					text1: 'Update profile',
					text2: 'Profile picture updated',
					type: 'success'
				})
			}
		}
	)
	const { mutateAsync: UploadPictureMutateSync } = useMutation(
		['upload picture'],
		(formData: FormData) =>
			oldPicture && oldPicture.startsWith(StorageFolderEnum.userPictures)
				? storageService.replacement(formData)
				: storageService.upload(formData, StorageFolderEnum.userPictures),
		{
			onError: () => {
				Toast.show({
					text1: 'Update profile',
					text2: 'An error occurred',
					type: 'error'
				})
			},
			onSuccess: async data => {
				if (!data) return
				await UserPictureUpdateMutateAsync(data.name)
				await QueryClient.invalidateQueries(['user-profile'])
			}
		}
	)
	
	const updatePicture = async () => {
		const image = await selectImage()
		if (!image) return
		const formData = new FormData()
		formData.append('file', {
			uri: image.uri,
			name:
				image.uri.slice(image.uri.lastIndexOf('/') + 1, image.uri.length) ??
				`${
					Math.random().toString(36).slice(2, 15) +
					Math.random().toString(36).slice(2, 15)
				}.jpg`,
			type: 'application/octet-stream'
		} as unknown as Blob)
		
		if (oldPicture && oldPicture.startsWith(StorageFolderEnum.userPictures)) {
			formData.append('deleteFilename', oldPicture)
			formData.append('folder', StorageFolderEnum.userPictures)
		}
		await UploadPictureMutateSync(formData)
	}
	
	return { updatePicture }
}
