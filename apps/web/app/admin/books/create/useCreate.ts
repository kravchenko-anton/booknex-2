import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { BookPayload } from '../../../../../../libs/global/services-types/book-types'
import { StorageFolderEnum } from '../../../../../backend/src/storage/storage.types'
import { useAction } from '../../../../hooks/useAction'
import { authorService } from '../../../../services/author/author-service'
import { bookService } from '../../../../services/book/book-service'
import { genreService } from '../../../../services/genre/genre-service'
import { parserService } from '../../../../services/parser/parser-services'
import { useUploadFile } from '../../../../utils/files'
import { errorToast, successToast } from '../../../../utils/toast'
import { useCreateForm } from './useForm'
import type { CreateBookValidationSchemaType } from './validation'

export const useCreate = () => {
	const { closePopup, showPopup } = useAction()
	const { upload } = useUploadFile()
	const { handleSubmit, setValue, errors, control } = useCreateForm()
	const router = useRouter()
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
			onSuccess: () => {
				successToast('Book created')
				router.push('/admin/books')
			},
			onError: () => errorToast('Error while uploading book')
		}
	)
	const { mutateAsync: authors, isLoading: authorsLoading } = useMutation(
		['authors'],
		(authorSearch: string) => authorService.allSelect(authorSearch)
	)
	const { data: genres } = useQuery(['genres'], () => genreService.all())
	
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
								book.content
									.map(
										content =>
											`<label id='${book.name + '/' + content.title}'></label>` +
											content.content
									)
									.join('')
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
				charapters: data.books.map(book => {
					return {
						name: book.name,
						children: book.content.map(content => {
							return {
								name: content.title,
								link: book.name + '/' + content.title
							}
						})
					}
				}),
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
		select: {
			author: {
				load: authors,
				loading: authorsLoading
			},
			genres
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
