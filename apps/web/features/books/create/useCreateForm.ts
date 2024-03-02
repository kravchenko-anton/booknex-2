import { useTemplate } from '@/features/books/create/useTemplate'
import {
	createBookValidationSchema,
	type CreateBookValidationSchemaType
} from '@/features/books/create/validation'
import api from '@/services'
import { useUploadFile } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { CreateBookDto } from 'global/api-client/models/create-book-dto'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export const useCreateForm = () => {
	const router = useRouter()
	const { upload } = useUploadFile()
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
		mutationFn: (payload: CreateBookDto) =>
			api.book.create({
				title: payload.title,
				description: payload.description,
				picture: payload.picture,
				ebook: payload.ebook,
				genres: payload.genres,
				pages: payload.pages,
				popularity: payload.popularity,
				author: payload.author
			}),
		onError: () => errorToast('Error while uploading book')
	})

	const { mutateAsync: deleteTemplate } = useMutation({
		mutationKey: ['delete-template'],
		mutationFn: (id: number) => api.parser.remove(id),
		onError: () => errorToast('Error while uploading book')
	})

	const submit = handleSubmit(async (data: CreateBookValidationSchemaType) => {
		const { data: pictureFile } = await upload({
			name: data.title,
			folder: 'booksCovers',
			blob: data.picture
		})
		if (!pictureFile.name) return
		await create({
			title: data.title,
			description: data.description,
			picture: pictureFile.name,
			ebook: data.books,
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
