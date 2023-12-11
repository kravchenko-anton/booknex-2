import { useMutation } from '@tanstack/react-query'
import { StorageFolderEnum } from '../../../../../backend/src/storage/storage.types'
import { authorService } from '../../../../services/author/author-service'
import { useUploadFile } from '../../../../utils/files'
import { errorToast, successToast } from '../../../../utils/toast'

export const useCreate = () => {
	const { upload } = useUploadFile()
	const { mutateAsync: create } = useMutation(
		['create  author'],
		({
			name,
			picture,
			description
		}: {
			name: string
			picture: string
			description: string
		}) =>
			authorService.create({
				name,
				picture,
				description
			}),
		{
			onSuccess: () => successToast('Author created'),
			onError: () => errorToast('An error occurred while creating the author')
		}
	)

	const createAuthor = async ({
		name,
		picture,
		description
	}: {
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
		const autor = await create({
			name,
			picture: uploadPictureName,
			description
		})
		return {
			...autor
		}
	}

	return {
		createAuthor
	}
}
