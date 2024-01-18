import { authorService } from '@/services/author/author-service'
import { useUploadFile } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { StorageFolderEnum } from '../../../../../../backend/src/storage/storage.types'

export const useUpdate = (id: number) => {
	const { upload } = useUploadFile()
	const { mutateAsync: update } = useMutation(
		['update  author'],
		({
			name,
			picture,
			books,
			description
		}: {
			name: string
			picture: string
			description: string
			books: number[]
		}) =>
			authorService.update(id, {
				name,
				picture,
				description,
				books
			}),
		{
			onSuccess: () => successToast('Author update'),
			onError: () => errorToast('An error occurred while creating the author')
		}
	)

	const updateAuthor = async ({
		name,
		picture,
		books,
		description
	}: {
		books: number[]
		name: string
		picture: {
			name: string
			blob: Blob
		}
		description: string
	}) => {
		const { name: uploadPictureName } = await upload({
			name: picture.name,
			blob: picture.blob,
			folder: StorageFolderEnum.authorPictures
		})
		return update({
			name,
			picture: uploadPictureName,
			description,
			books
		})
	}

	return {
		updateAuthor
	}
}
