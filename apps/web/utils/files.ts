import api from '@/services'
import { useMutation } from '@tanstack/react-query'
import type { UploadFolderEnum } from 'global/api-client'
import { errorToast } from './toast'

interface UploadFileProperties {
	name: string
	folder: UploadFolderEnum
	blob: Blob
}

export const blobFormData = (blob: Blob, fileName: string) => {
	const formData = new FormData()
	formData.append('file', blob, fileName)
	return formData
}
// TODO: переписать абсолютно везде на этот хук
export const useUploadFile = () => {
	const { mutateAsync: upload } = useMutation({
		mutationKey: ['upload-file'],
		mutationFn: ({ folder, blob, name }: UploadFileProperties) => {
			//TODO: чекнуть не сломалось ли
			const formData = blobFormData(blob, name) as unknown as File
			return api.storage.upload(folder, formData)
		},
		onError: () =>
			errorToast({
				text1: 'Upload file',
				text2: 'An error occurred',
				type: 'error'
			})
	})

	return {
		upload
	}
}
