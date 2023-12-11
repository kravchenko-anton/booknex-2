import { useMutation } from '@tanstack/react-query'
import type { BookPayload } from '../../../../../../libs/global/services-types/book-types'
import { StorageFolderEnum } from '../../../../../backend/src/storage/storage.types'
import { useAction } from '../../../../hooks/useAction'
import { authorService } from '../../../../services/author/author-service'
import { bookService } from '../../../../services/book/book-service'
import { parserService } from '../../../../services/parser/parser-services'
import { useUploadFile } from '../../../../utils/files'
import { errorToast, successToast } from '../../../../utils/toast'
import { useCreateForm } from './useForm'
import type { CreateBookValidationSchemaType } from './validation'

export const useCreate = () => {
	const { closePopup, showPopup } = useAction()
	const { upload } = useUploadFile()
	const { handleSubmit, setValue, errors, control } = useCreateForm()

	const { mutateAsync: unfold } = useMutation(
		['upload ebook'],
		(formData: FormData) => parserService.unfold(formData),
		{
			onSuccess: () => successToast('File uploaded'),
			onError: () => errorToast('Error while uploading book')
		}
	)
	const { mutateAsync: createBook } = useMutation(
		['upload book'],
		(payload: BookPayload) => bookService.create(payload),
		{
			onSuccess: () => successToast('File uploaded'),
			onError: () => errorToast('Error while uploading book')
		}
	)
	const { mutateAsync: authors, isLoading: authorsLoading } = useMutation(
		['authors'],
		(authorSearch: string) => authorService.all(authorSearch)
	)

	const submitBook = handleSubmit(
		async (data: CreateBookValidationSchemaType) => {
			const { name: uploadPicture } = await upload({
				name: data.picture.name,
				blob: data.picture.blob,
				folder: StorageFolderEnum.booksCovers
			})
			const { name: uploadHtml } = await upload({
				name: data.title + '.html',
				blob: new Blob(
					[
						data.books
							.map(book =>
								book.content.map(content => content.content).join('')
							)
							.join('')
					],
					{ type: 'text/html' }
				),
				folder: StorageFolderEnum.ebooks
			})
			await createBook({
				title: data.title,
				description: data.description,
				picture: uploadPicture,
				charapters: data.books.flatMap(book =>
					book.content.map(content => {
						return {
							name: content.title,
							link: content.title
						}
					})
				),
				author: {
					id: Number(data.author.value)
				},
				genres: data.genres.map(genre => genre.value),
				file: uploadHtml,
				pages: Number(data.pages),
				popularity: Number(data.popularity)
			})
				.then(() => {
					successToast('Book created')
				})
				.catch(() => {
					errorToast('Error while creating book')
				})
		}
	)
	return {
		author: {
			load: authors,
			loading: authorsLoading
		},
		popup: {
			show: showPopup,
			close: closePopup
		},
		unfold,
		form: {
			control,
			errors,
			setValue,
			submitBook
		}
	}
}
