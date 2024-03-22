import { useTemplate } from '@/app/admin/book/create/useTemplate'
import api from '@/services'
import { secureRoutes } from '@/utils/route'
import { errorToast, successToast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { PayloadEBook } from 'global/api-client'
import {
	CreateBookValidation,
	type CreateBookValidationType
} from 'global/dto/book/create.book.dto'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type CreateBookType = {
	title: string
	author: string
	description: string
	rating: number
	ebook: PayloadEBook[]
	genres: number[]
	picture: File
}

export const useCreateForm = () => {
	const router = useRouter()
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors }
	} = useForm<CreateBookValidationType>({
		resolver: zodResolver(CreateBookValidation)
	})
	console.log('errors', errors)
	const { mutateAsync: deleteTemplate } = useMutation({
		mutationKey: ['delete-template'],
		mutationFn: (id: number) => api.parser.remove(id),
		onError: () => errorToast('Error while uploading book')
	})
	const template = useTemplate({ setValue })

	const { mutateAsync: create, isLoading: createLoading } = useMutation({
		mutationKey: ['create-book'],
		mutationFn: (payload: CreateBookType) =>
			api.book.create({
				title: payload.title,
				description: payload.description,
				picture: payload.picture,
				ebook: payload.ebook,
				author: payload.author,
				genres: payload.genres,
				rating: payload.rating
			}),
		onError: () => errorToast('Error while uploading book'),
		onSuccess: async () => {
			console.log('template.id success', template.id)
			if (template.id) {
				await deleteTemplate(template.id)
			}
			successToast('Book created')
			router.push(secureRoutes.bookCatalogRoute)
		}
	})

	const submit = handleSubmit(async (data: CreateBookValidationType) => {
		console.log('ebook', data)
		await create({
			title: data.title,
			description: data.description,
			picture: data.picture,
			ebook: data.ebook,
			author: data.author,
			genres: data.genres,
			rating: data.rating
		})
	})
	return {
		watch,
		control,
		errors,
		setValue,
		getValues,
		submit,
		createLoading
	}
}
