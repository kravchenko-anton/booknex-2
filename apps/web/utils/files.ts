import api from '@/services'
import { useMutation } from '@tanstack/react-query'
import type { StorageFolderType } from '../../backend/src/storage/storage.types'
import { errorToast } from './toast'

interface UploadFileProperties {
	folder: StorageFolderType
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
