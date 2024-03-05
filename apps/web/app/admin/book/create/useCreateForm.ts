import {
	CreateBookDto,
	type CreateBookDtoType
} from '@/app/admin/book/_shared/validation/create.book.dto'
import { bookRoute } from '@/app/admin/book/catalog/useCatalog'
import { useTemplate } from '@/app/admin/book/create/useTemplate'
import api from '@/services'
import { useUploadFile } from '@/utils/files'
import { errorToast, successToast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { CreateBookDto as CreateBookPayload } from 'global/api-client'

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
		getValues,
		formState: { errors }
	} = useForm<CreateBookDtoType>({
		resolver: zodResolver(CreateBookDto)
	})
	console.log(errors, 'it is errors', getValues(), 'it is values')
	const template = useTemplate({ setValue })

	const { mutateAsync: create } = useMutation({
		mutationKey: ['upload-book'],
		mutationFn: (payload: CreateBookPayload) =>
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

	const submit = handleSubmit(async (data: CreateBookDtoType) => {
		console.log('validation,pass')
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
			ebook: data.ebook,
			author: data.author,
			genres: data.genres,
			pages: data.pages,
			popularity: data.popularity
		})
			.then(async () => {
				if (template.id) {
					await deleteTemplate(template.id)
				}
				router.push(`${bookRoute}/catalog`)
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
		getValues,
		submit
	}
}
