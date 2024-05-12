import api from '@/services/api'
import { errorToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import type { StorageFolderType } from 'global/helpers/storage-types'
import { MutationKeys } from 'global/utils/query-keys'

interface UploadFileProperties {
	folder: StorageFolderType
	file: File
}

export const useUploadFile = () => {
	const { mutateAsync: upload, isPending: uploadLoading } = useMutation({
		mutationKey: MutationKeys.storage.uploadFile,
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
