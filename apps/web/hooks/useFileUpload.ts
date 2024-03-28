import api from '@/services/api'
import { errorToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { StorageFolderType } from 'global/helpers/storage-types'

interface UploadFileProperties {
	folder: StorageFolderType
	file: File
}

export const useUploadFile = () => {
	const { mutateAsync: upload, isLoading: uploadLoading } = useMutation({
		mutationKey: ['upload-file'],
		mutationFn: ({ folder, file }: UploadFileProperties) =>
			api.storage.upload(folder, file),
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
