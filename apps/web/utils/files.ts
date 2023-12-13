import { useMutation } from '@tanstack/react-query'
import type { StorageFolderEnum } from '../../backend/src/storage/storage.types'
import { storageService } from '../services/storage/storage-service'
import { errorToast } from './toast'

interface UploadFileProperties {
	name: string
	folder: StorageFolderEnum
	blob: Blob
}
export const blobFormData = (blob: Blob, fileName: string) => {
	const formData = new FormData()
	formData.append('file', blob, fileName)
	return formData
}

export const useUploadFile = () => {
	const { mutateAsync: upload } = useMutation(
		['upload file'],
		({ folder, blob, name }: UploadFileProperties) => {
			const formData = blobFormData(blob, name)
			return storageService.upload(formData, folder)
		},
		{
			onError: () =>
				errorToast({
					text1: 'Upload book photo',
					text2: 'An error occurred',
					type: 'error'
				})
		}
	)
	return {
		upload
	}
}