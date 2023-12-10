import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import type { BookPayload } from '../../../../../../libs/global/services-types/book-types'
import { StorageFolderEnum } from '../../../../../backend/src/storage/storage.types'
import { useAction } from '../../../../hooks/useAction'
import { authorService } from '../../../../services/author/author-service'
import { bookService } from '../../../../services/book/book-service'
import { genreService } from '../../../../services/genre/genre-service'
import { parserService } from '../../../../services/parser/parser-services'
import { storageService } from '../../../../services/storage/storage-service'
import { errorToast, successToast } from '../../../../utils/toast'
import type { CreateBookValidationSchemaType } from './validation'
import { createBookValidationSchema } from './validation'

export const useCreate = () => {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<CreateBookValidationSchemaType>({
		resolver: zodResolver(createBookValidationSchema)
	})

	const { mutateAsync: UploadBookPhoto } = useMutation(
		['upload book photo'],
		(formData: FormData) =>
			storageService.upload(formData, StorageFolderEnum.booksCovers),
		{
			onError: () => {
				errorToast({
					text1: 'Upload book photo',
					text2: 'An error occurred',
					type: 'error'
				})
			}
		}
	)

	const { mutateAsync: UploadBookHtml } = useMutation(
		['upload book html'],
		(formData: FormData) =>
			storageService.upload(formData, StorageFolderEnum.ebooks),
		{
			onError: () => {
				errorToast({
					text1: 'Upload book html',
					text2: 'An error occurred',
					type: 'error'
				})
			}
		}
	)
	const { mutateAsync: unfold } = useMutation(
		['upload ebook'],
		(formData: FormData) => parserService.unfold(formData),
		{
			onSuccess: () => {
				successToast('File uploaded')
			},
			onError: () => {
				errorToast('Error while uploading book')
			}
		}
	)
	const { mutateAsync: uploadBook } = useMutation(
		['upload book'],
		(payload: BookPayload) => bookService.create(payload),
		{
			onSuccess: () => {
				successToast('File uploaded')
			},
			onError: () => {
				errorToast('Error while uploading book')
			}
		}
	)
	const { showPopup, closePopup } = useAction()
	const { mutateAsync: authors, isLoading: authorsLoading } = useMutation(
		['authors'],
		(authorSearch: string) => authorService.all(authorSearch)
	)
	const { data: genres } = useQuery(['genres'], () => genreService.all())

	return {
		unfold,
		control,
		authors,
		authorsLoading,
		genres,
		UploadBookPhoto,
		UploadBookHtml,
		uploadBook,
		handleSubmit,
		closePopup,
		showPopup,
		errors,
		setValue
	}
}
