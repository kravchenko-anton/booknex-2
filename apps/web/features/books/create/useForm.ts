import { useTemplate } from '@/features/books/create/useTemplate'
import { bookService } from '@/shared/services/book/book-service'
import { useUploadFile } from '@/shared/utils/files'
import { errorToast, successToast } from '@/shared/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { StorageFolderEnum } from 'backend/src/storage/storage.types'
import type { BookPayload } from 'global/services-types/book-types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { CreateBookValidationSchemaType } from './validation'
import { createBookValidationSchema } from './validation'

export const useCreateForm = () => {
	const { upload } = useUploadFile()
	const router = useRouter()
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<CreateBookValidationSchemaType>({
		resolver: zodResolver(createBookValidationSchema)
	})
	useTemplate({ setValue })

	const { mutateAsync: createBook } = useMutation({
		mutationKey: ['upload book'],
		mutationFn: (payload: BookPayload) => bookService.create(payload),
		onSuccess: () => {
			successToast('Book created')
			router.push('/admin/books')
		},
		onError: () => errorToast('Error while uploading book')
	})

	const submitBook = handleSubmit(
		async (data: CreateBookValidationSchemaType) => {
			const { name: uploadPicture } = await upload({
				name: data.picture.name,
				blob: data.picture.blob,
				folder: StorageFolderEnum.booksCovers
			})
			const { name: uploadHtml } = await upload({
				name: data.title + '.json',
				blob: new Blob([JSON.stringify(data.books)]),
				folder: StorageFolderEnum.ebooks
			})

			await createBook({
				title: data.title,
				description: data.description,
				picture: uploadPicture,
				ebook: uploadHtml,
				author: data.author,
				genres: data.genres,
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
		watch,
		control,
		errors,
		setValue,
		submitBook
	}
}
