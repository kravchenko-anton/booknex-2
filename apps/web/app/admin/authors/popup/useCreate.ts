import { useMutation } from '@tanstack/react-query'
import { StorageFolderEnum } from '../../../../../backend/src/storage/storage.types'
import { authorService } from '../../../../services/author/author-service'
import { storageService } from '../../../../services/storage/storage-service'
import { errorToast, successToast } from '../../../../utils/toast'

export const useCreate = () => {
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
			onSuccess: () => {
				successToast('Author created')
			},
			onError: () => {
				errorToast('An error occurred while creating the author')
			}
		}
	)

	const { mutateAsync: UploadAuthorPhoto } = useMutation(
		['upload author photo'],
		(formData: FormData) =>
			storageService.upload(formData, StorageFolderEnum.authorPictures),
		{
			onError: () => {
				errorToast({
					text1: 'Upload author photo',
					text2: 'An error occurred',
					type: 'error'
				})
			}
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
		const formData = new FormData()
		formData.append('file', picture.blob, picture.name)
		const { name: uploadPictureName } = await UploadAuthorPhoto(formData)
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
