import { useTemplate } from '@/features/books/create/useTemplate'
import type { CreateBookValidationSchemaType } from '@/features/books/create/validation'
import { createBookValidationSchema } from '@/features/books/create/validation'
import { bookService } from '@/shared/services/book/book-service'
import { parserService } from '@/shared/services/parser/parser-services'
import { useUploadFile } from '@/shared/utils/files'
import { errorToast, successToast } from '@/shared/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { StorageFolderEnum } from 'backend/src/storage/storage.types'
import type { BookPayload } from 'global/services-types/book-types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

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
	const template = useTemplate({ setValue })

	const { mutateAsync: create } = useMutation({
		mutationKey: ['upload-book'],
		mutationFn: (payload: BookPayload) => bookService.create(payload),
		onError: () => errorToast('Error while uploading book')
	})

	const { mutateAsync: deleteTemplate } = useMutation({
		mutationKey: ['delete-template'],
		mutationFn: (id: number) => parserService.delete(id),
		onError: () => errorToast('Error while uploading book')
	})

	const submit = handleSubmit(async (data: CreateBookValidationSchemaType) => {
		console.log(data, 'it is data')
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

		await create({
			title: data.title,
			description: data.description,
			picture: uploadPicture,
			ebook: uploadHtml,
			author: data.author,
			genres: data.genres,
			pages: data.pages,
			popularity: data.popularity
		})
			.then(async () => {
				console.log(template.id, 'it is template id')
				await deleteTemplate(template.id)
				router.push('/admin/books')
				successToast('Book created')
			})
			.catch(() => {
				errorToast('Error while creating book')
			})
	})
	return {
		watch,
		control,
		errors,
		setValue,
		submit
	}
}
