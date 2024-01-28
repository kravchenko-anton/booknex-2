import { bookService } from '@/shared/services/book/book-service'
import { genreService } from '@/shared/services/genre/genre-service'
import { parserService } from '@/shared/services/parser/parser-services'
import { useUploadFile } from '@/shared/utils/files'
import { errorToast, successToast } from '@/shared/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { StorageFolderEnum } from 'backend/src/storage/storage.types'
import type { BookPayload } from 'global/services-types/book-types'
import { useRouter } from 'next/navigation'
import { useCreateForm } from './useForm'
import type { CreateBookValidationSchemaType } from './validation'

export const useCreate = () => {
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

	const { data: genres } = useQuery(['genres'], () => genreService.all())

	const submitBook = handleSubmit(
		async (data: CreateBookValidationSchemaType) => {
			console.log(data.picture, 'data.picture')
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

			await createBook({
				title: data.title,
				description: data.description,
				picture: uploadPicture,
				chapters: data.chapters.map(chapter => ({
					name: chapter.name,
					children: chapter.children.map((child, index) => ({
						id: index,
						name: child.name,
						link: child.link
					}))
				})),
				author: data.author,
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
		genres,
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
