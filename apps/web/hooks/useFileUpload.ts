import api from '@/services/api'
import { errorToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { StorageFolderType } from '../../backend/src/storage/storage.types'

interface UploadFileProperties {
	folder: StorageFolderType
	blob: File
}

export const useUploadFile = () => {
	const { mutateAsync: upload, isLoading: uploadLoading } = useMutation({
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
		upload,
		uploadLoading
	}
}
