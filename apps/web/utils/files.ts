import api from '@/services'
import { useMutation } from '@tanstack/react-query'
import type { UploadFolderEnum } from 'global/api-client'
import { errorToast } from './toast'

interface UploadFileProperties {
	name: string
	folder: UploadFolderEnum
	blob: File
}

export const useUploadFile = () => {
	const { mutateAsync: upload } = useMutation({
		mutationKey: ['upload-file'],
		mutationFn: ({ folder, blob }: UploadFileProperties) =>
			api.storage.upload(folder, blob),
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
