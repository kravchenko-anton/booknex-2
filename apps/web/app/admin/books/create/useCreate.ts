import type { BookPayload } from '@/global/services-types/book-types'
import { useAction } from '@/hooks'
import { authorService } from '@/services/author/author-service'
import { bookService } from '@/services/book/book-service'
import { genreService } from '@/services/genre/genre-service'
import { parserService } from '@/services/parser/parser-services'
import { useUploadFile } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { StorageFolderEnum } from '../../../../../backend/src/storage/storage.types'
import { useCreateForm } from './useForm'
import type { CreateBookValidationSchemaType } from './validation'

export const useCreate = () => {
	const { closePopup, showPopup } = useAction()
	const { upload } = useUploadFile()
	const { handleSubmit, setValue, watch, errors, control } = useCreateForm()
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
			console.log(data.picture, 'data.picture')
			const { name: uploadPicture } = await upload({
				name: data.picture.name,
				blob: data.picture.blob,
				folder: StorageFolderEnum.booksCovers
			})
			console.log(uploadPicture, 'uploadPicture')
			const { name: uploadHtml } = await upload({
				name: data.title + '.html',
				blob: new Blob(
					[
						data.books
							.map(book =>
								book.content
									.map(
										content =>
											`<label id='${
												book.name + '/' + content.title
											}'></label>` + content.content
									)
									.join('')
							)
							.join('')
					],
					{ type: 'text/html' }
				),
				folder: StorageFolderEnum.ebooks
			})

			console.log(uploadHtml, 'uploadHtml', data.title + '.html')
			console.log({
				title: data.title,
				description: data.description,
				picture: uploadPicture,
				chapters: data.chapters,
				author: {
					id: Number(data.author.value)
				},
				genres: data.genres.map(genre => genre.value),
				file: uploadHtml,
				pages: Number(data.pages),
				popularity: Number(data.popularity)
			})
			await createBook({
				title: data.title,
				description: data.description,
				picture: uploadPicture,
				chapters: data.chapters,
				author: {
					id: data.author.value
				},
				genres: data.genres.map(genre => genre.value),
				file: uploadHtml,
				pages: data.pages,
				popularity: data.popularity
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
			watch,
			control,
			errors,
			setValue,
			submitBook
		}
	}
}
